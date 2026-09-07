package com.oney.WebRTCModule;

import java.util.concurrent.Callable;

import livekit.org.webrtc.AudioProcessingFactory;
import livekit.org.webrtc.Loggable;
import livekit.org.webrtc.Logging;
import livekit.org.webrtc.VideoDecoderFactory;
import livekit.org.webrtc.VideoEncoderFactory;
import livekit.org.webrtc.audio.AudioDeviceModule;

public class WebRTCModuleOptions {
    private static WebRTCModuleOptions instance;

    public VideoEncoderFactory videoEncoderFactory;
    public VideoDecoderFactory videoDecoderFactory;
    public AudioDeviceModule audioDeviceModule;
    public Callable<AudioProcessingFactory> audioProcessingFactoryFactory;

    public Loggable injectableLogger;
    public Logging.Severity loggingSeverity;
    public String fieldTrials;
    public boolean enableMediaProjectionService;
    public double defaultTrackVolume = 1.0;

    public static WebRTCModuleOptions getInstance() {
        if (instance == null) {
            instance = new WebRTCModuleOptions();
        }

        return instance;
    }
}
