# tvOS Installation

In order to use React Native on tvOS, you will need to use [react-native-tvos](https://www.npmjs.com/package/react-native-tvos).  
tvOS support was deprecated and removed from current/future versions of React Native.  
We strongly recommend using React Native 0.69+ with React 18+  

Change the following dependency in your projects `package.json` file to get started. 
``` 
"react-native": "npm:react-native-tvos@0.69.8-2" 
```

## Adjusting the supported platform version

**IMPORTANT:** Make sure you are using CocoaPods 1.10 or higher.  
You may have to change the `platform` field in your podfile.  
`@livekit/react-native-webrtc` doesn't support tvOS < 16. Set it to '16.0' or above.
Older versions of tvOS don't support WebRTC.

```
platform :tvos, '16.0'
```

## Adding the LiveKit podspec source

The native module depends on the `LiveKitWebRTC` pod, which is published from the
[livekit/podspecs](https://github.com/livekit/podspecs) repository rather than the CocoaPods trunk.
Add both sources at the top of your `Podfile`:

```ruby
source 'https://cdn.cocoapods.org/'
source 'https://github.com/livekit/podspecs.git'
```
