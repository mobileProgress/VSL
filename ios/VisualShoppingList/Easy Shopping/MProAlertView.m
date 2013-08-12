//
//  MProAlertView.m
//  Visual Shopping List
//
//  Created by Julian Lubenov on 8/10/13.
//
//

#import "MProAlertView.h"

@implementation MProAlertView

@synthesize textView;

- (id)initWithTitle:(NSString *)title message:(NSString *)message delegate:(id)delegate cancelButtonTitle:(NSString *)cancelButtonTitle otherButtonTitles:(NSString *)otherButtonTitles, ...
{
    self = [super initWithTitle:title message:message delegate:delegate cancelButtonTitle:cancelButtonTitle otherButtonTitles:otherButtonTitles, nil];
    if(self) {
        self.textView = [[UITextField alloc] initWithFrame:CGRectMake(20.0f, 80.0f, 245.0f, 30.0f)];
        [self.textView setBorderStyle:UITextBorderStyleRoundedRect];
        self.textView.autoresizingMask = UIViewAutoresizingNone;
//        double delayInSeconds = 5.0;
//        dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayInSeconds * NSEC_PER_SEC));
//        dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
            [self addSubview:textView];
//        });

    }
    return self;
}

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
        self.textView = [[UITextField alloc] initWithFrame:CGRectMake(5.0f, 30.0f, 200.0f, 30.0f)];
        double delayInSeconds = 5.0;
        dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayInSeconds * NSEC_PER_SEC));
        dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
            [self addSubview:textView];
        });
    }
    return self;
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect
{
    // Drawing code
}
*/

@end
