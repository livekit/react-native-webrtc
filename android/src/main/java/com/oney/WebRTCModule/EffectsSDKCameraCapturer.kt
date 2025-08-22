package com.oney.WebRTCModule

import android.content.Context
import android.graphics.Bitmap
import android.util.Log
import android.util.Size
import com.effectssdk.tsvb.Camera
import com.effectssdk.tsvb.EffectsSDK
import com.effectssdk.tsvb.EffectsSDKStatus
import com.effectssdk.tsvb.pipeline.CameraPipeline
import com.effectssdk.tsvb.pipeline.ColorCorrectionMode
import com.effectssdk.tsvb.pipeline.OnFrameAvailableListener
import com.effectssdk.tsvb.pipeline.PipelineMode
import kotlinx.coroutines.runBlocking
import org.webrtc.CameraEnumerator
import org.webrtc.CameraVideoCapturer
import org.webrtc.CameraVideoCapturer.CameraEventsHandler
import org.webrtc.CapturerObserver
import org.webrtc.NV21Buffer
import org.webrtc.SurfaceTextureHelper
import org.webrtc.VideoFrame
import java.net.URL
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine


/**
 * Custom video capturer for Effects SDK
 */
class EffectsSDKCameraCapturer(
    private val device: String,
    private val eventsHandler: CameraEventsHandler,
    enumerator: CameraEnumerator
) : CameraVideoCapturer {

    private var isPipelineCameraUsed: Boolean = false

    private var context: Context? = null
    private var capturerObserver: CapturerObserver? = null
    //Default WebRTC capturer. Used until EffectsSDK not ready to provide frames
    //You can remove this if you don't need non-processed frames
    private var webRtcCameraCapturer: CameraVideoCapturer? = null

    private var cameraPipeline: CameraPipeline? = null
    private var defaultPipelineOptions = EffectsSdkOptionsCache()
    private var currentPipelineOptions = EffectsSdkOptionsCache()

    init {
        //Custom event handler. Used until EffectsSDK not ready to provide frames
        val cameraEventHandler = object : CameraEventsHandler {
            override fun onCameraError(p0: String?) {
                if (!isPipelineCameraUsed) eventsHandler.onCameraError(p0)
            }

            override fun onCameraDisconnected() {
                if (!isPipelineCameraUsed) eventsHandler.onCameraDisconnected()
            }

            override fun onCameraFreezed(p0: String?) {
                if (!isPipelineCameraUsed) eventsHandler.onCameraFreezed(p0)
            }

            override fun onCameraOpening(p0: String?) {
                if (!isPipelineCameraUsed) eventsHandler.onCameraOpening(p0)
            }

            override fun onFirstFrameAvailable() {
                if (!isPipelineCameraUsed) eventsHandler.onFirstFrameAvailable()
            }

            override fun onCameraClosed() {
                if (!isPipelineCameraUsed) eventsHandler.onCameraClosed()
            }

        }
        webRtcCameraCapturer = enumerator.createCapturer(device, cameraEventHandler)
    }

    override fun initialize(
        surfaceTextureHelper: SurfaceTextureHelper?,
        context: Context?,
        observer: CapturerObserver?
    ) {
        if (!isPipelineCameraUsed) {
            //Custom Capturer observer. Used until EffectsSDK not ready to provide frames
            val nativeCapturerObserver = object : CapturerObserver {
                override fun onCapturerStarted(p0: Boolean) {
                    if (!isPipelineCameraUsed) capturerObserver?.onCapturerStarted(p0)
                }

                override fun onCapturerStopped() {
                    if (!isPipelineCameraUsed) capturerObserver?.onCapturerStopped()

                }

                override fun onFrameCaptured(p0: VideoFrame?) {
                    if (!isPipelineCameraUsed) capturerObserver?.onFrameCaptured(p0)
                }
            }
            webRtcCameraCapturer?.initialize(surfaceTextureHelper, context, nativeCapturerObserver)
        }
        this.context = context
        capturerObserver = observer
    }


    override fun startCapture(width: Int, height: Int, framerate: Int) {
        if (!isPipelineCameraUsed) {
            webRtcCameraCapturer?.startCapture(width, height, framerate)
        } else {
            createPipeline(height, width)
            cameraPipeline?.startPipeline()
            cameraPipeline?.setOnFrameAvailableListener(onFrameAvailableListener)
        }
    }

    override fun stopCapture() {
        if (!isPipelineCameraUsed) {
            webRtcCameraCapturer?.stopCapture()
        } else {
            cameraPipeline?.setOnFrameAvailableListener(null)
            cameraPipeline?.release()
            cameraPipeline = null
        }
        eventsHandler.onCameraClosed()
    }

    private fun createPipeline(width: Int = 1280, height: Int = 720) {
        val factory = EffectsSDK.createSDKFactory()
        cameraPipeline = factory.createCameraPipeline(
            context!!,
            camera = if (device == "1") Camera.FRONT else Camera.BACK,
            resolution = Size(width, height)
        )
        setPipelineOptionsFromCache(currentPipelineOptions)
    }

    /*
     * If you don't need frames, you should set "empty" options to avoid background segmentation
     */
    fun enableVideo(enabled: Boolean) {
        if (enabled) {
            setPipelineOptionsFromCache(currentPipelineOptions)
            cameraPipeline?.setOnFrameAvailableListener(onFrameAvailableListener)
        } else {
            setPipelineOptionsFromCache(defaultPipelineOptions)
            cameraPipeline?.setOnFrameAvailableListener(null)
        }
    }

    override fun changeCaptureFormat(width: Int, height: Int, framerate: Int) {
        if (!isPipelineCameraUsed) {
            webRtcCameraCapturer?.changeCaptureFormat(width, height, framerate)
        }
    }

    override fun dispose() {
        if (!isPipelineCameraUsed) {
            webRtcCameraCapturer?.dispose()
        }
    }

    override fun isScreencast(): Boolean {
        return false
    }

    override fun switchCamera(switchEventsHandler: CameraVideoCapturer.CameraSwitchHandler?) {
        if (!isPipelineCameraUsed) {
            webRtcCameraCapturer?.switchCamera(switchEventsHandler)
        }
        switchEventsHandler?.onCameraSwitchDone(true)
    }

    override fun switchCamera(
        switchEventsHandler: CameraVideoCapturer.CameraSwitchHandler?,
        p1: String?
    ) {
        if (!isPipelineCameraUsed) {
            webRtcCameraCapturer?.switchCamera(switchEventsHandler, p1)
        }
        switchEventsHandler?.onCameraSwitchDone(true)
    }

    private fun getNV21(scaled: Bitmap): ByteArray {
        val argb = IntArray(scaled.width * scaled.height)
        scaled.getPixels(argb, 0, scaled.width, 0, 0, scaled.width, scaled.height)
        val yuv = ByteArray(scaled.width * scaled.height * 3 / 2)
        encodeYUV420SP(yuv, argb, scaled.width, scaled.height)
        return yuv
    }

    private fun encodeYUV420SP(yuv420sp: ByteArray, argb: IntArray, width: Int, height: Int) {
        val frameSize = width * height

        var yIndex = 0
        var uvIndex = frameSize

        var R: Int
        var G: Int
        var B: Int
        var Y: Int
        var U: Int
        var V: Int
        var index = 0
        for (j in 0 until height) {
            for (i in 0 until width) {
                R = (argb[index] and 0xff0000) shr 16
                G = (argb[index] and 0xff00) shr 8
                B = (argb[index] and 0xff) shr 0

                Y = ((66 * R + 129 * G + 25 * B + 128) shr 8) + 16
                U = ((-38 * R - 74 * G + 112 * B + 128) shr 8) + 128
                V = ((112 * R - 94 * G - 18 * B + 128) shr 8) + 128

                yuv420sp[yIndex++] = Y.toByte()
                if (j % 2 == 0 && index % 2 == 0) {
                    yuv420sp[uvIndex++] = V.toByte()
                    yuv420sp[uvIndex++] = U.toByte()
                }

                index++
            }
        }
    }

    private val onFrameAvailableListener = OnFrameAvailableListener { bitmap, timestamp ->
        if (!isPipelineCameraUsed) {
            isPipelineCameraUsed = true
            webRtcCameraCapturer?.stopCapture()
            webRtcCameraCapturer?.dispose()
            webRtcCameraCapturer = null
        }
        val videoFrame = VideoFrame(
            NV21Buffer(
                getNV21(bitmap),
                bitmap.width,
                bitmap.height,
                { bitmap.recycle() }
            ),
            0,
            timestamp * 1_000_000 //millisectonds to nanoseconds
        )
        capturerObserver?.onFrameCaptured(videoFrame)
    }

    fun initializeEffectsSdk(customerId: String, url: String?): EffectsSDKStatus {
        var result: EffectsSDKStatus
        runBlocking {
            result = if (url == null) {
                initializeCallback(context!!, customerId)
            } else {
                initializeCallback(context!!, customerId, URL(url))
            }
        }
        if (result == EffectsSDKStatus.ACTIVE) {
            createPipeline()
            cameraPipeline?.startPipeline()
            cameraPipeline?.setFlipX(false)
            cameraPipeline?.setOnFrameAvailableListener(onFrameAvailableListener)
        }
        return result
    }

    private suspend fun initializeCallback(
        context: Context,
        customerId: String,
        url: URL? = null
    ): EffectsSDKStatus {
        return suspendCoroutine { continuation ->
            EffectsSDK.initialize(context, customerId, url) { sdkStatus ->
                continuation.resume(sdkStatus)
            }
        }
    }

    fun initializeEffectsSdkLocal(localKey: String): EffectsSDKStatus {
        return EffectsSDK.initialize(context!!, localKey)
    }

    fun getCurrentDevice(): String {
        return device
    }

    fun setPipelineMode(pipelineMode: String) {
        var value: String = pipelineMode.split('.')[1]
        if (value == "noEffects") value = "no_effect"
        val mode: PipelineMode = PipelineMode.valueOf(value.uppercase())
        currentPipelineOptions.pipelineMode = mode
        cameraPipeline?.setMode(mode)
    }

    fun setBlurPower(blurPower: Float) {
        currentPipelineOptions.blurPower = blurPower
        cameraPipeline?.setBlurPower(blurPower)
    }

    fun enableBeautification(enableBeautification: Boolean) {
        currentPipelineOptions.isBeautificationEnabled = enableBeautification
        cameraPipeline?.enableBeautification(enableBeautification)
    }

    fun isBeautificationEnabled(): Boolean {
        return cameraPipeline?.isBeautificationEnabled()!!
    }

    fun setBeautificationPower(power: Double) {
        val intValue = (power * 100).toInt()
        currentPipelineOptions.beautificationPower = intValue
        cameraPipeline?.setBeautificationPower(intValue)
    }

    fun getZoomLevel(): Double {
        return (cameraPipeline?.getZoomLevel()!! / 100).toDouble()
    }

    fun setZoomLevel(zoomLevel: Double) {
        val intValue = (zoomLevel * 100).toInt()
        currentPipelineOptions.zoomLevel = intValue
        cameraPipeline?.setZoomLevel(intValue)
    }

    fun enableSharpening(enableSharpening: Boolean) {
        currentPipelineOptions.isSharpeningEnabled = enableSharpening
        cameraPipeline?.enableSharpening(enableSharpening)
    }

    fun getSharpeningStrength(): Double {
        return cameraPipeline?.getSharpeningStrength()!!.toDouble()
    }

    fun setSharpeningStrength(strength: Double) {
        currentPipelineOptions.sharpeningStrength = strength.toFloat()
        cameraPipeline?.setSharpeningStrength(strength.toFloat())
    }

    fun setColorCorrectionMode(mode: String) {
        val value: String = mode.split('.')[1]
        val colorCorrectionMode = when (value) {
            "noFilterMode" -> ColorCorrectionMode.NO_FILTER_MODE
            "colorCorrectionMode" -> ColorCorrectionMode.COLOR_CORRECTION_MODE
            "colorGradingMode" -> ColorCorrectionMode.COLOR_GRADING_MODE
            "presetMode" -> ColorCorrectionMode.PRESET_MODE
            "lowLightMode" -> ColorCorrectionMode.LOW_LIGHT_MODE
            else -> {
                Log.w(
                    this.javaClass.simpleName,
                    "Incorrect color correction constant value. NO_FILTER_MODE set."
                )
                ColorCorrectionMode.NO_FILTER_MODE
            }
        }
        currentPipelineOptions.colorCorrectionMode = colorCorrectionMode
        cameraPipeline?.setColorCorrectionMode(colorCorrectionMode)
    }

    fun setColorFilterStrength(strength: Double) {
        currentPipelineOptions.colorFilterStrength = strength.toFloat()
        cameraPipeline?.setColorFilterStrength(strength.toFloat())
    }

    fun setColorGradingReference(bitmap: Bitmap) {
        currentPipelineOptions.colorGradingReference = bitmap
        cameraPipeline?.setColorGradingReferenceImage(bitmap)
    }

    fun setBackgroundBitmap(bitmap: Bitmap) {
        currentPipelineOptions.backgroundBitmap = bitmap
        cameraPipeline?.setBackground(bitmap)
    }

    private fun setPipelineOptionsFromCache(cache: EffectsSdkOptionsCache) {
        cameraPipeline?.let { pipeline ->
            pipeline.setMode(cache.pipelineMode)
            pipeline.setBlurPower(cache.blurPower)
            pipeline.setColorCorrectionMode(cache.colorCorrectionMode)
            pipeline.enableSharpening(cache.isSharpeningEnabled)
            pipeline.enableBeautification(cache.isBeautificationEnabled)
            pipeline.setBeautificationPower(cache.beautificationPower)
            pipeline.setColorFilterStrength(cache.colorFilterStrength)
            pipeline.setSharpeningStrength(cache.sharpeningStrength)
            pipeline.setZoomLevel(cache.zoomLevel)
            cache.backgroundBitmap?.let { img -> pipeline.setBackground(img) }
            cache.colorGradingReference?.let { img -> pipeline.setColorGradingReferenceImage(img) }
        }
    }

    private data class EffectsSdkOptionsCache(
        var pipelineMode: PipelineMode = PipelineMode.NO_EFFECT,
        var blurPower: Float = 0f,
        var colorCorrectionMode: ColorCorrectionMode = ColorCorrectionMode.NO_FILTER_MODE,
        var isSharpeningEnabled: Boolean = false,
        var isBeautificationEnabled: Boolean = false,
        var beautificationPower: Int = 0,
        var colorFilterStrength: Float = 0f,
        var sharpeningStrength: Float = 0f,
        var zoomLevel: Int = 0,
        var backgroundBitmap: Bitmap? = null,
        var colorGradingReference: Bitmap? = null
    )

}