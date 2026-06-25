#import <Foundation/Foundation.h>
#import <LiveKitWebRTC/RTCDataChannel.h>

NS_ASSUME_NONNULL_BEGIN

@class DataChannelWrapper;

@protocol DataChannelWrapperDelegate<NSObject>

- (void)dataChannelDidChangeState:(DataChannelWrapper *)dataChannelWrapper;
- (void)dataChannel:(DataChannelWrapper *)dataChannelWrapper didReceiveMessageWithBuffer:(LKRTCDataBuffer *)buffer;
- (void)dataChannel:(DataChannelWrapper *)dataChannelWrapper didChangeBufferedAmount:(uint64_t)amount;

@end

@interface DataChannelWrapper : NSObject

- (instancetype)initWithChannel:(LKRTCDataChannel *)channel reactTag:(NSString *)tag;

@property(nonatomic, nonnull, copy) NSNumber *pcId;
@property(nonatomic, nonnull, readonly) LKRTCDataChannel *channel;
@property(nonatomic, nonnull, readonly) NSString *reactTag;
@property(nonatomic, nullable, weak) id<DataChannelWrapperDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
