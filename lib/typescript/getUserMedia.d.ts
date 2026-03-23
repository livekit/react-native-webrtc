import { MediaTrackConstraints } from './Constraints';
import MediaStream from './MediaStream';
export interface Constraints {
    audio?: boolean | MediaTrackConstraints;
    video?: boolean | MediaTrackConstraints;
}
export default function getUserMedia(constraints?: Constraints): Promise<MediaStream>;
