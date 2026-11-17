#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface LKRNSocketConnection : NSObject

- (instancetype)initWithFilePath:(nonnull NSString *)filePath;
- (void)openWithStreamDelegate:(id<NSStreamDelegate>)streamDelegate;
- (void)close;

@end

NS_ASSUME_NONNULL_END
