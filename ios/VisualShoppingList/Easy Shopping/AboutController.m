/*  Visual Shopping List for iOS
    Copyright (C) 2013 Мобилен прогрес ЕООД, София, България

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/


#import "AboutController.h"
#import "AppDelegate.h"

@interface AboutController ()

@end

@implementation AboutController

@synthesize aboutUs, contactUs, facebook, description;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    if(description)
    {
        NSString *desc = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"description"];
        if([desc length])
            description.text = desc;
    }
    
    if(aboutUs)
    {
        NSString *string = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"about_us"];
        if(string)
            [aboutUs setTitle:string forState:UIControlStateNormal];
    }

    if(contactUs)
    {
        NSString *string = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"contact_us"];
        if(string)
            [contactUs setTitle:string forState:UIControlStateNormal];
    }

    if(facebook)
    {
        NSString *string = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"share_this_app"];
        if(string)
            [facebook setTitle:string forState:UIControlStateNormal];
    }
    
    if(!fb)
    {
        fb = [[Facebook alloc] initWithAppId:@"415069568523592" andDelegate:self];
    }
}

- (void)viewDidUnload
{
    self.aboutUs = nil;
    self.contactUs = nil;
    self.facebook = nil;
    self.description = nil;
    
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

- (void)viewWillAppear:(BOOL)animated
{
    [[self navigationController] setNavigationBarHidden:NO animated:animated];
    [[[self navigationController] navigationBar] setBarStyle:UIBarStyleBlack];
}

- (void)dealloc
{
    self.aboutUs = nil;
    self.contactUs = nil;
    self.facebook = nil;
    self.description = nil;
    [fb release];
    fb = nil;

    [super dealloc];
}

#pragma mark Actions

- (IBAction)aboutUsAction
{
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"http://www.mobileprogressive.com"]];
}

- (IBAction)contactUsAction
{
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"mailto://contactus@mobileprogressive.com"]];
}

- (IBAction)facebookAction
{
//    SBJSON *jsonWriter = [[SBJSON new] autorelease];
//    
//    NSDictionary* actionLinks = [NSArray arrayWithObjects:[NSDictionary 
//                                                           dictionaryWithObjectsAndKeys: @"Mobile Progressive",@"text",@"http://www.mobileprogressive.com",
//                                                           @"href", nil], nil];
//    
//    NSString *actionLinksStr = [jsonWriter stringWithObject:actionLinks];
//    NSDictionary* attachment = [NSDictionary dictionaryWithObjectsAndKeys:
//                                @"Easy Shopping", @"name",
//                                @"Easy Shopping iOS app", @"caption",
//                                @"The easy way in shopping lists", @"description",
//                                @"http://www.mobileprogressive.com/", @"href", nil];
//    NSString *attachmentStr = [jsonWriter stringWithObject:attachment];
//    NSMutableDictionary* params = [NSMutableDictionary
//                                   dictionaryWithObjectsAndKeys:
//                                   @"I am using Easy Shopping for iPhone.", @"message",
//                                   @"Share on Facebook",  @"user_message_prompt",
//                                   actionLinksStr, @"action_links",
//                                   attachmentStr, @"attachment",
//                                   nil];
//    
//    
//    [fb dialog:@"stream.publish"
//            andParams:params
//          andDelegate:self];
    
//    [fb authorize:[NSArray arrayWithObjects: @"user_photos",@"user_videos",@"publish_stream",@"offline_access", nil]];
    NSMutableDictionary* params = [NSMutableDictionary dictionaryWithObjectsAndKeys:
                                   @"415069568523592", @"app_id",
                                   @"http://www.mobileprogressive.com/", @"link",
                                   @"http://mobileprogressive.com/images/es.png", @"picture",
                                   @"I am using Visual Shopping List for iPhone.", @"text",
                                   @"Visual Shopping List", @"name",
                                   @"Visual Shopping List", @"caption",
                                   @"I am using Visual Shopping List for iPhone.", @"description",
                                   nil];
    
    [fb dialog:@"stream.publish" andParams:params andDelegate:self];
    
}


@end
