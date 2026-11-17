#import "LKRNDataChannelWrapper.h"
#import "LKRNWebRTCModule.h"

@interface LKRTCDataChannel (React)

@property(nonatomic, strong) NSNumber *peerConnectionId;

@end

@interface LKRNWebRTCModule (RTCDataChannel)<LKRNDataChannelWrapperDelegate>

- (NSString *)stringForDataChannelState:(LKRTCDataChannelState)state;

@end
