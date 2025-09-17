import * as base64 from 'base64-js';
import { NativeModules } from 'react-native';
const { WebRTCModule } = NativeModules;

export interface RTCEncryptedPacket {
  payload: Uint8Array,
  iv: Uint8Array,
  keyIndex: number,
}

export default class RTCDataPacketCryptor {
    _id: string;

    constructor(dataPacketCryptorId: string) {
        this._id = dataPacketCryptorId;
    }

    async encrypt(participantId: string, keyIndex: number, data: Uint8Array): Promise<RTCEncryptedPacket | null> {
        const params = {
            dataPacketCryptorId: this._id,
            participantId,
            keyIndex,
            data: base64.fromByteArray(data)
        };

        let result = await WebRTCModule.dataPacketCryptorEncrypt(params);

        if(!result.payload || !result.iv || !result.keyIndex) {
          return null;
        }

        return {
          payload: base64.toByteArray(result['payload']),
          iv: base64.toByteArray(result['iv']),
          keyIndex: result['keyIndex']
        };
    }

    async decrypt(participantId: string, packet: RTCEncryptedPacket): Promise<Uint8Array | null> {
        const params = {
            dataPacketCryptorId: this._id,
            participantId,
            payload: base64.fromByteArray(packet.payload),
            iv: base64.fromByteArray(packet.iv),
            keyIndex: packet.keyIndex,
        };

        let result = await WebRTCModule.dataPacketCryptorDecrypt(params);
        if (!result) {
          return null;
        }

        return base64.toByteArray(result);
    }


    async dispose() {
        const params = {
            dataPacketCryptorId: this._id,
        };

        return WebRTCModule.dataPacketCryptorDispose(params);
    }
}
