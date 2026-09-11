package com.oney.WebRTCModule.webrtcutils;

import androidx.annotation.Nullable;

import livekit.org.webrtc.SoftwareVideoDecoderFactory;
import livekit.org.webrtc.VideoCodecInfo;
import livekit.org.webrtc.VideoDecoder;
import livekit.org.webrtc.VideoDecoderFactory;

/**
 * Helper proxy factory for the software codecs. Starting with M111 SoftwareVideoDecoderFactory
 * cannot be instantiated before the PeerConnectionFactory has been initialized because it
 * relies on JNI. This proxy factory lazy initializes it.
 */
public class SoftwareVideoDecoderFactoryProxy implements VideoDecoderFactory {
    private VideoDecoderFactory factory;

    private synchronized VideoDecoderFactory getFactory() {
        if (factory == null) {
            factory = new SoftwareVideoDecoderFactory();
        }

        return factory;
    }

    @Nullable
    @Override
    public VideoDecoder createDecoder(VideoCodecInfo videoCodecInfo) {
        return getFactory().createDecoder(videoCodecInfo);
    }

    @Override
    public VideoCodecInfo[] getSupportedCodecs() {
        return getFactory().getSupportedCodecs();
    }
}
