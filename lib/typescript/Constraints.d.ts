export declare type MediaTrackConstraints = {
    width?: ConstrainNumber;
    height?: ConstrainNumber;
    frameRate?: ConstrainNumber;
    facingMode?: ConstrainString;
    deviceId?: ConstrainString;
    groupId?: ConstrainString;
};
declare type ConstrainNumber = number | {
    exact?: number;
    ideal?: number;
    max?: number;
    min?: number;
};
declare type ConstrainString = string | {
    exact?: string;
    ideal?: string;
};
export {};
