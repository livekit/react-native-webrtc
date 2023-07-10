import { defineCustomEventTarget } from 'event-target-shim';
import RTCRtpSender from './RTCRtpSender';
import RTCRtpReceiver from './RTCRtpReceiver';

/// Built-in Algorithm.
enum Algorithm {
    kAesGcm,
    kAesCbc,
  }
  
  class KeyProviderOptions {
    sharedKey: boolean;
    ratchetSalt: ArrayBuffer;
    uncryptedMagicBytes: ArrayBuffer | undefined | null;
    ratchetWindowSize: number;
    constructor(options: {
        sharedKey: boolean;
        ratchetSalt: ArrayBuffer;
        uncryptedMagicBytes?: ArrayBuffer | undefined | null;
        ratchetWindowSize: number;
        }) {
        this.sharedKey = options.sharedKey;
        this.ratchetSalt = options.ratchetSalt;
        this.uncryptedMagicBytes = options.uncryptedMagicBytes;
        this.ratchetWindowSize = options.ratchetWindowSize;
        }
  }
  
  /// Shared secret key for frame encryption.
interface KeyProvider {
    /// The unique identifier of the key provider.
    id: string;
  
    /// Set the raw key at the given index.
    setKey(
        participantId: string,
        index: number,
        key: ArrayBuffer): Promise<boolean>;
  
    /// ratchet the key at the given index.
    ratchetKey(
        participantId: string,
        index: number,
    ): Promise<ArrayBuffer>;
  
    /// Dispose the key manager.
    dispose(): Promise<void>;
  }
  
  enum FrameCryptorState {
   New,
   Ok,
   EncryptionFailed,
   DecryptionFailed,
   MissingKey,
   KeyRatcheted,
   InternalError,
  }


  const FRAME_CRYPTOR_STATE_EVENTS = [ 'new', 'ok', 'encryption_failed', 'decryption_failed', 'missing_key', 'key_ratcheted', 'internal_error' ];

export default interface FrameCryptor {

    /// The unique identifier of the frame cryptor.
    participantId: string;
  
    /// Enable/Disable frame crypto for the sender or receiver.
    setEnabled(enabled: boolean): Promise<boolean>;
  
    /// Get the enabled state for the sender or receiver.
    enabled: boolean;
  
    /// Set the key index for the sender or receiver.
    /// If the key index is not set, the key index will be set to 0.
    setKeyIndex(index: number): Promise<boolean>;
  
    /// Get the key index for the sender or receiver.
    keyIndex: number;
  
    updateCodec(codec: String): Promise<void>;
  
    /// Dispose the frame cryptor.
    dispose(): Promise<void>;
  }
  
  /// Factory for creating frame Cryptors.
  /// For End 2 End Encryption, you need to create a [KeyProvider] for each peer.
  /// And set your key in keyProvider.
interface FrameCryptorFactory {
    /// Shared key manager.
    createDefaultKeyProvider(options: KeyProviderOptions): Promise<KeyProvider>;
  
    /// Create a frame Cryptor from a [RTCRtpSender].
    createFrameCryptorForRtpSender(
      participantId: string,
      sender: RTCRtpSender,
      algorithm: Algorithm,
      keyProvider: KeyProvider,
    ): Promise<FrameCryptor>;
  
    /// Create a frame Cryptor from a [RTCRtpReceiver].
    createFrameCryptorForRtpReceiver(
        participantId: string,
        receiver: RTCRtpReceiver,
        algorithm: Algorithm,
        keyProvider: KeyProvider,
      ): Promise<FrameCryptor>;
  }
  