#import "DataChannelWrapper.h"
#import "WebRTCModule.h"

@interface LKRTCDataChannel (React)

@property(nonatomic, strong) NSNumber *peerConnectionId;

@end

@interface WebRTCModule (LKRTCDataChannel)<DataChannelWrapperDelegate>

- (NSString *)stringForDataChannelState:(LKRTCDataChannelState)state;

@end
