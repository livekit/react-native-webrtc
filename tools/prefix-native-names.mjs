#!/usr/bin/env node

/**
 * Renames this fork's native names so it can be installed next to other
 * react-native-webrtc forks (Daily's, for example), which ship the same Java package,
 * ObjC classes and React Native module and view names:
 *
 * - Android: moves com.oney.WebRTCModule to io.livekit.reactnative.webrtc, and prefixes
 *   the ReactPackage class and the registered module and view names.
 * - iOS: prefixes every ObjC class and protocol, and the files named after them.
 * - JS: looks up the prefixed module and view names.
 *
 * Prefixed names never match again, so rerunning it changes nothing. Run it after every
 * upstream sync to fix whatever came back with the old names. With --check it changes
 * nothing and fails if a run would change anything.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const check = process.argv.includes('--check');

const prefix = 'LKRN';
const oldPackageDirectory = 'android/src/main/java/com/oney/WebRTCModule';
const newPackageDirectory = 'android/src/main/java/io/livekit/reactnative/webrtc';

// Every ObjC class and protocol declared in ios/, plus VideoFrameProcessor, which only
// names a header.
const objcNames = [
    'AudioDeviceModuleObserver',
    'CaptureController',
    'CapturerEventsDelegate',
    'DataChannelWrapper',
    'DataChannelWrapperDelegate',
    'I420Converter',
    'Message',
    'PIPController',
    'ProcessorProvider',
    'RTCVideoView',
    'RTCVideoViewManager',
    'SampleBufferRendering',
    'SampleBufferVideoCallView',
    'ScreenCaptureController',
    'ScreenCapturePickerViewManager',
    'ScreenCapturer',
    'SerializeUtils',
    'SocketConnection',
    'TrackCapturerEventsEmitter',
    'TrackMuteDetector',
    'VideoCaptureController',
    'VideoEffectProcessor',
    'VideoFrameProcessor',
    'VideoFrameProcessorDelegate',
    'WebRTCModule',
    'WebRTCModuleOptions'
];

// The names apps use directly. Docs and example apps only get these, since words like
// Message or SocketConnection mean something else there.
const publicObjcNames = [ 'WebRTCModule', 'WebRTCModuleOptions' ];

const changes = [];

/**
 * Lists the tracked files below the given paths.
 */
function tracked(...pathspecs) {
    return execFileSync('git', [ 'ls-files', '-z', '--', ...pathspecs ], { cwd: root, encoding: 'utf8' })
        .split('\0')
        .filter(Boolean);
}

/**
 * Moves a tracked file with git, so the rename is staged and history follows it.
 */
function move(from, to) {
    changes.push(`${from} -> ${to}`);

    if (!check) {
        fs.mkdirSync(path.join(root, path.dirname(to)), { recursive: true });
        execFileSync('git', [ 'mv', from, to ], { cwd: root });
    }
}

/**
 * Applies the replacements to each file, writing the ones that change.
 */
function rewrite(files, replacements) {
    for (const file of files) {
        const filePath = path.join(root, file);
        const before = fs.readFileSync(filePath, 'utf8');
        const after = replacements.reduce((text, [ pattern, replacement ]) => text.replace(pattern, replacement), before);

        if (after !== before) {
            changes.push(file);

            if (!check) {
                fs.writeFileSync(filePath, after);
            }
        }
    }
}

/**
 * Matches any of the names as a whole word, capturing it.
 */
function words(names) {
    return new RegExp(`\\b(${names.join('|')})\\b`, 'g');
}

// Android: the package directory, then the ReactPackage class. Autolinking imports
// packages by their simple name, so it can't match another fork's.
for (const file of tracked(oldPackageDirectory)) {
    move(file, newPackageDirectory + file.slice(oldPackageDirectory.length));
}

for (const file of tracked('android')) {
    if (path.basename(file) === 'WebRTCModulePackage.java') {
        move(file, path.join(path.dirname(file), `${prefix}WebRTCModulePackage.java`));
    }
}

rewrite(tracked('android', 'Documentation', 'examples').filter(file => /\.(java|kt|gradle|xml|pro|md)$/.test(file)), [
    [ /\bcom\.oney\.WebRTCModule\b/g, 'io.livekit.reactnative.webrtc' ],
    [ /\bWebRTCModulePackage\b/g, `${prefix}WebRTCModulePackage` ]
]);

rewrite(tracked('android').filter(file => file.endsWith('.java')), [
    [ /"(WebRTCModule|RTCVideoView)"/g, `"${prefix}$1"` ]
]);

// iOS: the files named after a class, then every reference to the names.
const objcFileName = new RegExp(`^(${objcNames.join('|')})[.+]`);

for (const file of tracked('ios')) {
    if (objcFileName.test(path.basename(file))) {
        move(file, path.join(path.dirname(file), prefix + path.basename(file)));
    }
}

rewrite(tracked('ios', 'macos').filter(file => /\.(h|m|pbxproj)$/.test(file)), [
    [ words(objcNames), `${prefix}$1` ]
]);

rewrite([
    ...tracked('examples').filter(file => /\.(h|m|mm|swift)$/.test(file)),
    ...tracked('Documentation/iOSInstallation.md', 'Documentation/tvOSInstallation.md')
], [
    [ words(publicObjcNames), `${prefix}$1` ]
]);

// JS: the module and view names it looks up.
rewrite(tracked('src').filter(file => /\.tsx?$/.test(file)), [
    [ /\{ WebRTCModule \} = NativeModules/g, `{ ${prefix}WebRTCModule: WebRTCModule } = NativeModules` ],
    [ /\bNativeModules\.WebRTCModule\b/g, `NativeModules.${prefix}WebRTCModule` ],
    [ /(['"])(RTCVideoView|ScreenCapturePickerView)\1/g, `$1${prefix}$2$1` ]
]);

// A class or protocol that upstream adds under a new name isn't in objcNames yet.
const declaration = /^@(?:interface|protocol)\s+(\w+)\b(?!\s*[(;])/gm;
const unknownNames = tracked('ios')
    .filter(file => /\.[hm]$/.test(file))
    .flatMap(file => [ ...fs.readFileSync(path.join(root, file), 'utf8').matchAll(declaration) ]
        .map(([ , name ]) => name)
        .filter(name => !name.startsWith(prefix) && !objcNames.includes(name))
        .map(name => `${file}: ${name}`));

if (unknownNames.length) {
    console.error(`Unprefixed ObjC declarations. Add them to objcNames in tools/prefix-native-names.mjs and rerun:\n  ${unknownNames.join('\n  ')}`);
    process.exit(1);
}

if (check && changes.length) {
    console.error(`Native names are missing the ${prefix} prefix. Run "node tools/prefix-native-names.mjs" to fix:\n  ${changes.join('\n  ')}`);
    process.exit(1);
}

console.info(check ? 'Native names are prefixed.' : `Made ${changes.length} changes.`);
