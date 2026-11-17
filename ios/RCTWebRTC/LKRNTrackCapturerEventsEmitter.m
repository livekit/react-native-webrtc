#import "LKRNTrackCapturerEventsEmitter.h"
#import "LKRNCapturerEventsDelegate.h"
#import "LKRNWebRTCModule.h"

NS_ASSUME_NONNULL_BEGIN

@interface LKRNTrackCapturerEventsEmitter ()

@property(copy, nonatomic) NSString *trackId;
@property(weak, nonatomic) LKRNWebRTCModule *module;

@end

@implementation LKRNTrackCapturerEventsEmitter

- (instancetype)initWith:(NSString *)trackId webRTCModule:(LKRNWebRTCModule *)module {
    self = [super init];
    if (self) {
        self.trackId = trackId;
        self.module = module;
    }

    return self;
}

- (void)capturerDidEnd:(LKRTCVideoCapturer *)capturer {
    [self.module sendEventWithName:kEventMediaStreamTrackEnded
                              body:@{
                                  @"trackId" : self.trackId,
                              }];

    RCTLog(@"[LKRNTrackCapturerEventsEmitter] ended event for track %@", self.trackId);
}

@end

NS_ASSUME_NONNULL_END