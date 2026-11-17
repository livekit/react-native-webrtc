#import <Foundation/Foundation.h>
#import <LiveKitWebRTC/RTCDataChannel.h>

NS_ASSUME_NONNULL_BEGIN

@class LKRNDataChannelWrapper;

@protocol LKRNDataChannelWrapperDelegate<NSObject>

- (void)dataChannelDidChangeState:(LKRNDataChannelWrapper *)dataChannelWrapper;
- (void)dataChannel:(LKRNDataChannelWrapper *)dataChannelWrapper didReceiveMessageWithBuffer:(LKRTCDataBuffer *)buffer;
- (void)dataChannel:(LKRNDataChannelWrapper *)dataChannelWrapper didChangeBufferedAmount:(uint64_t)amount;

@end

@interface LKRNDataChannelWrapper : NSObject

- (instancetype)initWithChannel:(LKRTCDataChannel *)channel reactTag:(NSString *)tag;

@property(nonatomic, nonnull, copy) NSNumber *pcId;
@property(nonatomic, nonnull, readonly) LKRTCDataChannel *channel;
@property(nonatomic, nonnull, readonly) NSString *reactTag;
@property(nonatomic, nullable, weak) id<LKRNDataChannelWrapperDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
