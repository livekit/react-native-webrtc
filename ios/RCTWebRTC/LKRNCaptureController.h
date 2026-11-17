#import <Foundation/Foundation.h>
#import "LKRNCapturerEventsDelegate.h"

NS_ASSUME_NONNULL_BEGIN

@interface LKRNCaptureController : NSObject

@property(nonatomic, strong) id<LKRNCapturerEventsDelegate> eventsDelegate;
@property(nonatomic, copy, nullable) NSString *deviceId;

- (void)startCapture;
- (void)stopCapture;
- (NSDictionary *)getSettings;
- (void)applyConstraints:(NSDictionary *)constraints error:(NSError **)outError;

@end

NS_ASSUME_NONNULL_END
