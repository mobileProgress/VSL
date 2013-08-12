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

typedef enum {
    kESGetList = 0,
    kESVegetables,
    kESBaseFood,
    kESFruits,
    kESSpices,
    kESDrinks,
    kESCategories,
} ItemsType;

@interface ItemsController : UIViewController <UITableViewDataSource, UITableViewDelegate, UIAlertViewDelegate>
{
    UITableView *listTable;
    
    NSMutableArray *vegetables;
    NSMutableArray *base_food;
    NSMutableArray *fruits;
    NSMutableArray *spices;
    NSMutableArray *drinks;
    NSMutableArray *categories;

    NSMutableArray *listArray;
    
    ItemsType itemsType;
}

@property (nonatomic, retain) IBOutlet UITableView *listTable;
@property (nonatomic, retain) NSMutableArray *vegetables;
@property (nonatomic, retain) NSMutableArray *base_food;
@property (nonatomic, retain) NSMutableArray *fruits;
@property (nonatomic, retain) NSMutableArray *spices;
@property (nonatomic, retain) NSMutableArray *drinks;
@property (nonatomic, retain) NSMutableArray *categories;

@property (nonatomic, retain) NSMutableArray *listArray;

@property (nonatomic, assign) ItemsType itemsType;

@end
