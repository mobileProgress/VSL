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


#import <UIKit/UIKit.h>

@interface ViewController : UIViewController
{
    UIButton *getListButton;
    UIButton *baseFoodButton;
    UIButton *vegetablesButton;
    UIButton *spicesButton;
    UIButton *fruitsButton;
    UIButton *drinksButton;
    UIButton *categoriesButton;
    UIButton *aboutButton;

    UIButton *changeLanguage;
    UILabel *getListLabel;
    UILabel *baseFoodLabel;
    UILabel *vegetablesLabel;;
    UILabel *spicesLabel;
    UILabel *fruitsLabel;
    UILabel *drinksLabel;
    UILabel *categoriesLabel;
    UILabel *aboutLabel;

    
}

@property (nonatomic, retain) IBOutlet UIButton *getListButton;
@property (nonatomic, retain) IBOutlet UIButton *baseFoodButton;
@property (nonatomic, retain) IBOutlet UIButton *vegetablesButton;
@property (nonatomic, retain) IBOutlet UIButton *spicesButton;
@property (nonatomic, retain) IBOutlet UIButton *fruitsButton;
@property (nonatomic, retain) IBOutlet UIButton *drinksButton;
@property (nonatomic, retain) IBOutlet UIButton *categoriesButton;
@property (nonatomic, retain) IBOutlet UIButton *aboutButton;
@property (nonatomic, retain) IBOutlet UIButton *changeLanguage;
@property (nonatomic, retain) IBOutlet UILabel *getListLabel;
@property (nonatomic, retain) IBOutlet UILabel *baseFoodLabel;
@property (nonatomic, retain) IBOutlet UILabel *vegetablesLabel;;
@property (nonatomic, retain) IBOutlet UILabel *spicesLabel;
@property (nonatomic, retain) IBOutlet UILabel *fruitsLabel;
@property (nonatomic, retain) IBOutlet UILabel *drinksLabel;
@property (nonatomic, retain) IBOutlet UILabel *categoriesLabel;
@property (nonatomic, retain) IBOutlet UILabel *aboutLabel;

- (IBAction) getListAction;
- (IBAction) baseFoodAction;
- (IBAction) vegetablesAction;
- (IBAction) spicesAction;
- (IBAction) fruitsAction;
- (IBAction) drinksAction;
- (IBAction) categoriesAction;
- (IBAction) aboutAction;
- (IBAction) chooseLanguage;


@end
