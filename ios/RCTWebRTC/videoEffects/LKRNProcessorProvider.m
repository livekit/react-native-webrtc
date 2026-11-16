#import "LKRNProcessorProvider.h"

@implementation LKRNProcessorProvider

static NSMutableDictionary<NSString *, NSObject<LKRNVideoFrameProcessorDelegate> *> *processorMap;

+ (void)initialize {
    processorMap = [[NSMutableDictionary alloc] init];
}

+ (NSObject<LKRNVideoFrameProcessorDelegate> *)getProcessor:(NSString *)name {
    return [processorMap objectForKey:name];
}

+ (void)addProcessor:(NSObject<LKRNVideoFrameProcessorDelegate> *)processor forName:(NSString *)name {
    [processorMap setObject:processor forKey:name];
}

+ (void)removeProcessor:(NSString *)name {
    [processorMap removeObjectForKey:name];
}

@end
