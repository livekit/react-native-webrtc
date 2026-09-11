#import "DataChannelWrapper.h"
#import "WebRTCModule.h"

@interface LKRTCDataChannel (React)

@property(nonatomic, strong) NSNumber *peerConnectionId;

@end

@interface WebRTCModule (RTCDataChannel)<DataChannelWrapperDelegate>

- (NSString *)stringForDataChannelState:(LKRTCDataChannelState)state;

@end
