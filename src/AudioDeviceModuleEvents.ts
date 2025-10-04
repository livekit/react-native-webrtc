import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const { WebRTCModule } = NativeModules;

export type SpeechActivityEvent = 'started' | 'ended';

export interface SpeechActivityEventData {
  event: SpeechActivityEvent;
}

export interface EngineStateEventData {
  isPlayoutEnabled: boolean;
  isRecordingEnabled: boolean;
}

export type AudioDeviceModuleEventType =
  | 'speechActivity'
  | 'devicesUpdated';

export type AudioDeviceModuleEventData =
  | SpeechActivityEventData
  | EngineStateEventData
  | Record<string, never>; // Empty object for events with no data

export type AudioDeviceModuleEventListener = (data: AudioDeviceModuleEventData) => void;

/**
 * Handler function that must return a number (0 for success, non-zero for error)
 */
export type AudioEngineEventNoParamsHandler = () => Promise<void>;
export type AudioEngineEventHandler = ({ isPlayoutEnabled, isRecordingEnabled }: { isPlayoutEnabled: boolean, isRecordingEnabled: boolean }) => Promise<void>;

/**
 * Event emitter for RTCAudioDeviceModule delegate callbacks.
 * iOS/macOS only.
 */
class AudioDeviceModuleEventEmitter {
  private eventEmitter: NativeEventEmitter | null = null;
  private engineCreatedHandler: AudioEngineEventNoParamsHandler | null = null;
  private willEnableEngineHandler: AudioEngineEventHandler | null = null;
  private willStartEngineHandler: AudioEngineEventHandler | null = null;
  private didStopEngineHandler: AudioEngineEventHandler | null = null;
  private didDisableEngineHandler: AudioEngineEventHandler | null = null;
  private willReleaseEngineHandler: AudioEngineEventNoParamsHandler | null = null;

  constructor() {
    if (Platform.OS !== 'android' && WebRTCModule) {
      this.eventEmitter = new NativeEventEmitter(WebRTCModule);

      // Setup handlers for blocking delegate methods
      this.eventEmitter.addListener('audioDeviceModuleEngineCreated', async () => {
        let result = 0;
        if (this.engineCreatedHandler) {
          try {
            await this.engineCreatedHandler();
          } catch (error) {
            // If error is a number, use it as the error code, otherwise use -1
            result = typeof error === 'number' ? error : -1;
          }
        }
        WebRTCModule.audioDeviceModuleResolveEngineCreated(result);
      });

      this.eventEmitter.addListener('audioDeviceModuleEngineWillEnable', async ({ isPlayoutEnabled, isRecordingEnabled }: { isPlayoutEnabled: boolean, isRecordingEnabled: boolean }) => {
        let result = 0;
        if (this.willEnableEngineHandler) {
          try {
            await this.willEnableEngineHandler({ isPlayoutEnabled, isRecordingEnabled });
          } catch (error) {
            // If error is a number, use it as the error code, otherwise use -1
            result = typeof error === 'number' ? error : -1;
          }
        }
        WebRTCModule.audioDeviceModuleResolveWillEnableEngine(result);
      });

      this.eventEmitter.addListener('audioDeviceModuleEngineWillStart', async ({ isPlayoutEnabled, isRecordingEnabled }: { isPlayoutEnabled: boolean, isRecordingEnabled: boolean }) => {
        let result = 0;
        if (this.willStartEngineHandler) {
          try {
            await this.willStartEngineHandler({ isPlayoutEnabled, isRecordingEnabled });
          } catch (error) {
            // If error is a number, use it as the error code, otherwise use -1
            result = typeof error === 'number' ? error : -1;
          }
        }
        WebRTCModule.audioDeviceModuleResolveWillStartEngine(result);
      });

      this.eventEmitter.addListener('audioDeviceModuleEngineDidStop', async ({ isPlayoutEnabled, isRecordingEnabled }: { isPlayoutEnabled: boolean, isRecordingEnabled: boolean }) => {
        let result = 0;
        if (this.didStopEngineHandler) {
          try {
            await this.didStopEngineHandler({ isPlayoutEnabled, isRecordingEnabled });
          } catch (error) {
            // If error is a number, use it as the error code, otherwise use -1
            result = typeof error === 'number' ? error : -1;
          }
        }
        WebRTCModule.audioDeviceModuleResolveDidStopEngine(result);
      });

      this.eventEmitter.addListener('audioDeviceModuleEngineDidDisable', async ({ isPlayoutEnabled, isRecordingEnabled }: { isPlayoutEnabled: boolean, isRecordingEnabled: boolean }) => {
        let result = 0;
        if (this.didDisableEngineHandler) {
          try {
            await this.didDisableEngineHandler({ isPlayoutEnabled, isRecordingEnabled });
          } catch (error) {
            // If error is a number, use it as the error code, otherwise use -1
            result = typeof error === 'number' ? error : -1;
          }
        }
        WebRTCModule.audioDeviceModuleResolveDidDisableEngine(result);
      });

      this.eventEmitter.addListener('audioDeviceModuleEngineWillRelease', async () => {
        let result = 0;
        if (this.willReleaseEngineHandler) {
          try {
            await this.willReleaseEngineHandler();
          } catch (error) {
            // If error is a number, use it as the error code, otherwise use -1
            result = typeof error === 'number' ? error : -1;
          }
        }
        WebRTCModule.audioDeviceModuleResolveWillReleaseEngine(result);
      });
    }
  }
  /**
   * Subscribe to speech activity events (started/ended)
   */
  addSpeechActivityListener(listener: (data: SpeechActivityEventData) => void) {
    if (!this.eventEmitter) {
      throw new Error('AudioDeviceModuleEvents is only available on iOS/macOS');
    }
    return this.eventEmitter.addListener('audioDeviceModuleSpeechActivity', listener);
  }

  /**
   * Subscribe to devices updated event (input/output devices changed)
   */
  addDevicesUpdatedListener(listener: () => void) {
    if (!this.eventEmitter) {
      throw new Error('AudioDeviceModuleEvents is only available on iOS/macOS');
    }
    return this.eventEmitter.addListener('audioDeviceModuleDevicesUpdated', listener);
  }

  /**
   * Set handler for engine created delegate - MUST return 0 for success or error code
   * This handler blocks the native thread until it returns
   */
  setEngineCreatedHandler(handler: AudioEngineEventNoParamsHandler | null) {
    this.engineCreatedHandler = handler;
  }

  /**
   * Set handler for will enable engine delegate - MUST return 0 for success or error code
   * This handler blocks the native thread until it returns
   */
  setWillEnableEngineHandler(handler: AudioEngineEventHandler | null) {
    this.willEnableEngineHandler = handler;
  }

  /**
   * Set handler for will start engine delegate - MUST return 0 for success or error code
   * This handler blocks the native thread until it returns
   */
  setWillStartEngineHandler(handler: AudioEngineEventHandler | null) {
    this.willStartEngineHandler = handler;
  }

  /**
   * Set handler for did stop engine delegate - MUST return 0 for success or error code
   * This handler blocks the native thread until it returns
   */
  setDidStopEngineHandler(handler: AudioEngineEventHandler | null) {
    this.didStopEngineHandler = handler;
  }

  /**
   * Set handler for did disable engine delegate - MUST return 0 for success or error code
   * This handler blocks the native thread until it returns
   */
  setDidDisableEngineHandler(handler: AudioEngineEventHandler | null) {
    this.didDisableEngineHandler = handler;
  }

  /**
   * Set handler for will release engine delegate - MUST return 0 for success or error code
   * This handler blocks the native thread until it returns
   */
  setWillReleaseEngineHandler(handler: AudioEngineEventNoParamsHandler | null) {
    this.willReleaseEngineHandler = handler;
  }
}

export const audioDeviceModuleEvents = new AudioDeviceModuleEventEmitter();
