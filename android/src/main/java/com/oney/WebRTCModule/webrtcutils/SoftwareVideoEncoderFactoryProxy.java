package com.oney.WebRTCModule.webrtcutils;

import androidx.annotation.Nullable;

import livekit.org.webrtc.SoftwareVideoEncoderFactory;
import livekit.org.webrtc.VideoCodecInfo;
import livekit.org.webrtc.VideoEncoder;
import livekit.org.webrtc.VideoEncoderFactory;

/**
 * Helper proxy factory for the software codecs. Starting with M111 SoftwareVideoEncoderFactory
 * cannot be instantiated before the PeerConnectionFactory has been initialized because it
 * relies on JNI. This proxy factory lazy initializes it.
 */
public class SoftwareVideoEncoderFactoryProxy implements VideoEncoderFactory {
    private VideoEncoderFactory factory;

    private synchronized VideoEncoderFactory getFactory() {
        if (factory == null) {
            factory = new SoftwareVideoEncoderFactory();
        }

        return factory;
    }

    @Nullable
    @Override
    public VideoEncoder createEncoder(VideoCodecInfo videoCodecInfo) {
        return getFactory().createEncoder(videoCodecInfo);
    }

    @Override
    public VideoCodecInfo[] getSupportedCodecs() {
        return getFactory().getSupportedCodecs();
    }
}
