package com.oney.WebRTCModule;

import android.content.Context;
import android.graphics.SurfaceTexture;
import android.util.Log;
import android.view.TextureView;

import org.webrtc.EglBase;
import org.webrtc.EglRenderer;
import org.webrtc.RendererCommon;
import org.webrtc.RendererCommon.RendererEvents;
import org.webrtc.RendererCommon.ScalingType;
import org.webrtc.VideoFrame;
import org.webrtc.VideoSink;

/**
 * A TextureView-based video renderer for WebRTC.
 * Unlike SurfaceViewRenderer, TextureView renders in the normal View hierarchy
 * and supports borderRadius, overflow:hidden, alpha, and other standard View operations.
 *
 * Uses EglRenderer internally for OpenGL rendering to the TextureView's SurfaceTexture.
 */
public class TextureViewRenderer extends TextureView
        implements TextureView.SurfaceTextureListener, VideoSink {

    private static final String TAG = "TextureViewRenderer";

    private final EglRenderer eglRenderer;
    private RendererEvents rendererEvents;
    private boolean isInitialized = false;
    private boolean isFirstFrameRendered = false;
    private int rotatedFrameWidth;
    private int rotatedFrameHeight;
    private int frameRotation;

    public TextureViewRenderer(Context context) {
        super(context);
        eglRenderer = new EglRenderer(TAG);
        setSurfaceTextureListener(this);
        setOpaque(false);
    }

    public void init(EglBase.Context sharedContext, RendererEvents rendererEvents) {
        init(sharedContext, rendererEvents, EglBase.CONFIG_PLAIN, new org.webrtc.GlRectDrawer());
    }

    public void init(EglBase.Context sharedContext, RendererEvents rendererEvents,
                     int[] configAttributes, RendererCommon.GlDrawer drawer) {
        this.rendererEvents = rendererEvents;
        eglRenderer.init(sharedContext, configAttributes, drawer);
        isInitialized = true;
        isFirstFrameRendered = false;

        // If the SurfaceTexture is already available, create the EGL surface now
        SurfaceTexture surfaceTexture = getSurfaceTexture();
        if (surfaceTexture != null) {
            eglRenderer.createEglSurface(surfaceTexture);
        }
    }

    public void release() {
        if (isInitialized) {
            eglRenderer.release();
            isInitialized = false;
        }
    }

    public void setMirror(boolean mirror) {
        eglRenderer.setMirror(mirror);
    }

    public void setScalingType(ScalingType scalingType) {
        // EglRenderer doesn't have setScalingType directly — it relies on layout.
        // For TextureView, scaling is handled by the parent WebRTCView's onLayout.
    }

    public void clearImage() {
        eglRenderer.clearImage();
    }

    // VideoSink implementation
    @Override
    public void onFrame(VideoFrame videoFrame) {
        eglRenderer.onFrame(videoFrame);

        if (!isFirstFrameRendered) {
            isFirstFrameRendered = true;
            if (rendererEvents != null) {
                rendererEvents.onFirstFrameRendered();
            }
        }

        // Check for resolution changes
        int rotation = videoFrame.getRotation();
        int width = (rotation % 180 == 0)
                ? videoFrame.getRotatedWidth()
                : videoFrame.getRotatedHeight();
        int height = (rotation % 180 == 0)
                ? videoFrame.getRotatedHeight()
                : videoFrame.getRotatedWidth();

        if (width != rotatedFrameWidth || height != rotatedFrameHeight || rotation != frameRotation) {
            rotatedFrameWidth = width;
            rotatedFrameHeight = height;
            frameRotation = rotation;
            if (rendererEvents != null) {
                rendererEvents.onFrameResolutionChanged(
                        videoFrame.getBuffer().getWidth(),
                        videoFrame.getBuffer().getHeight(),
                        rotation);
            }
        }
    }

    // TextureView.SurfaceTextureListener implementation
    @Override
    public void onSurfaceTextureAvailable(SurfaceTexture surfaceTexture, int width, int height) {
        if (isInitialized) {
            eglRenderer.createEglSurface(surfaceTexture);
        }
    }

    @Override
    public void onSurfaceTextureSizeChanged(SurfaceTexture surfaceTexture, int width, int height) {
        // EglRenderer handles size changes through the layout mechanism
    }

    @Override
    public boolean onSurfaceTextureDestroyed(SurfaceTexture surfaceTexture) {
        if (isInitialized) {
            // Return false = we take ownership of the SurfaceTexture and release it
            // asynchronously after EGL is done. This avoids blocking the UI thread.
            eglRenderer.releaseEglSurface(() -> surfaceTexture.release());
            return false;
        }
        return true;
    }

    @Override
    public void onSurfaceTextureUpdated(SurfaceTexture surfaceTexture) {
        // No-op
    }
}
