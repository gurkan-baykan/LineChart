#ifdef RCT_NEW_ARCH_ENABLED
#import "CenteredTextViewComponentView.h"
#import <React/RCTConversions.h>
#import <React/RCTViewManager.h>

#import <react/renderer/components/centeredTextSpec/ComponentDescriptors.h>
#import <react/renderer/components/centeredTextSpec/EventEmitters.h>
#import <react/renderer/components/centeredTextSpec/Props.h>
#import <react/renderer/components/centeredTextSpec/RCTComponentViewHelpers.h>

#if __has_include(<LineChart/LineChart-Swift.h>)
#import <LineChart/LineChart-Swift.h>
#else
#import "LineChart-Swift.h"
#endif

using namespace facebook::react;

@interface CenteredTextViewComponentView () <RCTCenteredTextViewViewProtocol>
@end

@implementation CenteredTextViewComponentView {
  CenteredTextView *_centeredTextView; // Swift sınıfı
}

#pragma mark - Component Descriptor Provider

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  // React Native'deki `CenteredTextViewComponentDescriptor` ile bağlantı kuruyoruz
  return concreteComponentDescriptorProvider<CenteredTextViewComponentDescriptor>();
}

#pragma mark - Initializer

- (instancetype)initWithFrame:(CGRect)frame {
  NSLog(@"LineChartSpecViewComponentView11: Initializing view");
  if (self = [super initWithFrame:frame]) {
    // Swift'teki CenteredTextView sınıfını başlatıyoruz
    _centeredTextView = [[CenteredTextView alloc] initWithFrame:frame];
    [self addSubview:_centeredTextView]; // Swift bileşenini ana görünüme ekliyoruz
  }
  return self;
}

#pragma mark - Update Props

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps {
  // React Native'den gelen `props` değerini alıyoruz
  const auto &newViewProps = *std::static_pointer_cast<CenteredTextViewProps const>(props);
  const auto &oldViewProps = *std::static_pointer_cast<CenteredTextViewProps const>(oldProps);

  // Eğer `text` prop'u değişmişse, Swift bileşenine gönderiyoruz
  if (oldViewProps.text != newViewProps.text) {
    NSString *newText = [[NSString alloc] initWithCString:newViewProps.text.c_str() encoding:NSUTF8StringEncoding];
    [_centeredTextView setText:newText]; // `setText` Swift sınıfında tanımlı bir metot
  }

  [super updateProps:props oldProps:oldProps];
}

@end

// React Native'in bu bileşeni tanıyabilmesi için bir sınıf referansı sağlıyoruz
Class<RCTComponentViewProtocol> CenteredTextViewCls(void) {
  return CenteredTextViewComponentView.class;
}
#endif
