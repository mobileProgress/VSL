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


#import "ViewController.h"
#import "ItemsController.h"
#import "AboutController.h"
#import "AppDelegate.h"
#import "ChooseLanguageViewController.h"

@interface ViewController ()

- (void)resetLocale;

@end

@implementation ViewController

@synthesize getListButton, baseFoodButton, vegetablesButton, spicesButton, fruitsButton, drinksButton, categoriesButton, aboutButton;
@synthesize changeLanguage, getListLabel, baseFoodLabel, vegetablesLabel, spicesLabel, fruitsLabel, drinksLabel, categoriesLabel, aboutLabel;

- (void)resetLocale
{
    if(changeLanguage)
    {
        NSString *string = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"change_language_title"];
        if([string length])
            [changeLanguage setTitle:string forState:UIControlStateNormal];
    }
    
    if(getListLabel)
    {
        NSString *string = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"get_list_title"];
        if([string length])
            getListLabel.text = string;
    }
    
    if(baseFoodLabel)
    {
        NSString *string = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"base_food_title"];
        if([string length])
            baseFoodLabel.text = string;
    }
    
    if(vegetablesLabel)
    {
        NSString *string = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"vegetables_title"];
        if([string length])
            vegetablesLabel.text = string;
    }
    
    if(spicesLabel)
    {
        NSString *string = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"spices_title"];
        if([string length])
            spicesLabel.text = string;
    }
    
    if(fruitsLabel)
    {
        NSString *string = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"fruits_title"];
        if([string length])
            fruitsLabel.text = string;
    }
    
    if(drinksLabel)
    {
        NSString *string = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"drinks_title"];
        if([string length])
            drinksLabel.text = string;
    }
    
    if(categoriesLabel)
    {
        NSString *string = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"categories_title"];
        if([string length])
            categoriesLabel.text = string;
    }
    
    if(aboutLabel)
    {
        NSString *string = [((AppDelegate *)[UIApplication sharedApplication].delegate) localizedFromString:@"about_title"];
        if([string length])
            aboutLabel.text = string;
    }
    
}

- (void)viewDidLoad
{
    [super viewDidLoad];

    [self resetLocale];
}

- (void)viewDidUnload
{
    self.getListButton = nil;
    self.baseFoodButton = nil;
    self.vegetablesButton = nil;
    self.spicesButton = nil;
    self.fruitsButton = nil;
    self.drinksButton = nil;
    self.categoriesButton = nil;
    self.aboutButton = nil;
    self.changeLanguage = nil;
    self.getListLabel = nil;
    self.baseFoodLabel = nil;
    self.vegetablesLabel = nil;
    self.spicesLabel = nil;
    self.fruitsLabel = nil;
    self.drinksLabel = nil;
    self.categoriesLabel = nil;
    self.aboutLabel = nil;
    
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [[self navigationController] setNavigationBarHidden:YES animated:animated];
    [self resetLocale];
}

- (void)dealloc
{
    self.getListButton = nil;
    self.baseFoodButton = nil;
    self.vegetablesButton = nil;
    self.spicesButton = nil;
    self.fruitsButton = nil;
    self.drinksButton = nil;
    self.categoriesButton = nil;
    self.aboutButton = nil;
    self.changeLanguage = nil;
    self.getListLabel = nil;
    self.baseFoodLabel = nil;
    self.vegetablesLabel = nil;
    self.spicesLabel = nil;
    self.fruitsLabel = nil;
    self.drinksLabel = nil;
    self.categoriesLabel = nil;
    self.aboutLabel = nil;
    
    [super dealloc];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

#pragma mark actions

- (void) getListAction
{
    ItemsController *ctl = [[ItemsController alloc] initWithNibName:@"ItemsController" bundle:nil];
    ctl.itemsType = kESGetList;
    [self.navigationController pushViewController:ctl animated:YES];
    [ctl release];
}

- (void) baseFoodAction
{
    ItemsController *ctl = [[ItemsController alloc] initWithNibName:@"ItemsController" bundle:nil];
    ctl.itemsType = kESBaseFood;
    [self.navigationController pushViewController:ctl animated:YES];
    [ctl release];
}

- (void) vegetablesAction
{
    ItemsController *ctl = [[ItemsController alloc] initWithNibName:@"ItemsController" bundle:nil];
    ctl.itemsType = kESVegetables;
    [self.navigationController pushViewController:ctl animated:YES];
    [ctl release];
}

- (void) spicesAction
{
    ItemsController *ctl = [[ItemsController alloc] initWithNibName:@"ItemsController" bundle:nil];
    ctl.itemsType = kESSpices;
    [self.navigationController pushViewController:ctl animated:YES];
    [ctl release];
}

- (void) fruitsAction
{
    ItemsController *ctl = [[ItemsController alloc] initWithNibName:@"ItemsController" bundle:nil];
    ctl.itemsType = kESFruits;
    [self.navigationController pushViewController:ctl animated:YES];
    [ctl release];
}

- (void) drinksAction
{
    ItemsController *ctl = [[ItemsController alloc] initWithNibName:@"ItemsController" bundle:nil];
    ctl.itemsType = kESDrinks;
    [self.navigationController pushViewController:ctl animated:YES];
    [ctl release];
}

- (IBAction) categoriesAction
{
    ItemsController *ctl = [[ItemsController alloc] initWithNibName:@"ItemsController" bundle:nil];
    ctl.itemsType = kESCategories;
    [self.navigationController pushViewController:ctl animated:YES];
    [ctl release];
}

- (IBAction) aboutAction
{
    AboutController *ctl = [[AboutController alloc] initWithNibName:@"AboutController" bundle:nil];
    [self.navigationController pushViewController:ctl animated:YES];
    [ctl release];
}

- (IBAction) chooseLanguage
{
    ChooseLanguageViewController *chooseLanguage = [[ChooseLanguageViewController alloc] initWithNibName:@"ChooseLanguageViewController" bundle:nil];
    [self.navigationController pushViewController:chooseLanguage animated:YES];
    [chooseLanguage release];
}


@end
