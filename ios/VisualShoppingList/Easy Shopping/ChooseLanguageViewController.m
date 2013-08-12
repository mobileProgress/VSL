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


#import "ChooseLanguageViewController.h"

@interface ChooseLanguageViewController ()



@end

@implementation ChooseLanguageViewController

@synthesize table, bulgarian, russian, english, systemLanguage;

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
    // Do any additional setup after loading the view from its nib.
}

- (void)viewDidUnload
{
    self.table = nil;
    self.bulgarian = nil;
    self.russian = nil;
    self.english = nil;
    self.systemLanguage = nil;
    
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void)dealloc
{
    self.table = nil;
    self.bulgarian = nil;
    self.russian = nil;
    self.english = nil;
    self.systemLanguage = nil;
    
    [super dealloc];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

#pragma mark table view data source

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return 4;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    switch (indexPath.row) {
        case 0:
            return bulgarian;
            break;
        case 1:
            return russian;
            break;
        case 2:
            return english;
            break;
        case 3:
            return systemLanguage;
            break;
            
        default:
            return systemLanguage;
            break;
    }
}

#pragma mark table view delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSUserDefaults *defs = [NSUserDefaults standardUserDefaults];
    switch (indexPath.row) {
        case 0:
            [defs setValue:@"bg" forKey:@"localKey"];
            break;
        case 1:
            [defs setValue:@"ru" forKey:@"localKey"];
            break;
        case 2:
            [defs setValue:@"en" forKey:@"localKey"];
            break;
        case 3:
            [defs setValue:@"" forKey:@"localKey"];
            break;
            
        default:
            [defs setValue:@"" forKey:@"localKey"];
            break;
    }
    [defs synchronize];
    [self.navigationController popViewControllerAnimated:YES];
}


@end
