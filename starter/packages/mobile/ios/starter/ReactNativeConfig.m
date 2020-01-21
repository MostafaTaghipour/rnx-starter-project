//
//  ReactNativeConfig.m
//  ReactNativeMultiEnvironment
//
//  Created by Worawat Wijarn on 7/1/2560 BE.
//  Copyright © 2560 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ReactNativeConfig.h"

@implementation ReactNativeConfig

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  NSString* buildEnvironment = [[[NSBundle mainBundle] infoDictionary] valueForKey:@"BuildEnvironment"];
  return @{ @"buildEnvironment": buildEnvironment };
}

@end
