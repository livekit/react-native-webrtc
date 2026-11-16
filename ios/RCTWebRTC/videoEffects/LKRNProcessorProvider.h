#import "LKRNVideoFrameProcessor.h"

@interface LKRNProcessorProvider : NSObject

+ (NSObject<LKRNVideoFrameProcessorDelegate> *)getProcessor:(NSString *)name;
+ (void)addProcessor:(NSObject<LKRNVideoFrameProcessorDelegate> *)processor forName:(NSString *)name;
+ (void)removeProcessor:(NSString *)name;

@end
