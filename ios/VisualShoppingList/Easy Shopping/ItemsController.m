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


#import "ItemsController.h"
#import "JSONKit.h"
#import "Item.h"
#import "MProAlertView.h"
#import "AppDelegate.h"

#define localized(keyString) [(AppDelegate *)[[UIApplication sharedApplication] delegate] localizedFromString:keyString]

NSInteger itemsSort(id num1, id num2, void *context);

@interface ItemsController ()

- (void)loadDataFromFile:(NSString *)filePath;
- (void)loadDataFromJsonDict:(NSDictionary *)root inArray:(NSMutableArray *)array nameKey:(NSString *)nameKey iconKey:(NSString *)iconKey;
- (void)loadGetList;
- (void)loadGetListForArray:(NSArray *)array;
- (void)clearAllItems;

@end


@implementation ItemsController
@synthesize listTable, vegetables, base_food, fruits, spices, drinks, itemsType, listArray,
    categories;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewWillAppear:(BOOL)animated
{
    [[self navigationController] setNavigationBarHidden:NO animated:animated];
    [[[self navigationController] navigationBar] setBarStyle:UIBarStyleBlack];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
    
    self.title = localized(@"items_list_title");
    
    self.navigationItem.rightBarButtonItem = [[[UIBarButtonItem alloc] initWithTitle:localized(@"clear") style:UIBarButtonItemStyleBordered target:self action:@selector(clearAllItems)] autorelease];
    
    self.vegetables = [NSMutableArray arrayWithCapacity:16];
    self.base_food = [NSMutableArray arrayWithCapacity:16];
    self.fruits = [NSMutableArray arrayWithCapacity:16];
    self.spices = [NSMutableArray arrayWithCapacity:16];
    self.drinks = [NSMutableArray arrayWithCapacity:16];
    self.categories = [NSMutableArray arrayWithCapacity:16];
    
    NSString *documentsDirectory = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];

    
    [self loadDataFromFile:[documentsDirectory stringByAppendingFormat:@"/db.json"]];
    
    switch (itemsType) {
        case kESGetList:
            [self loadGetList];
            self.navigationItem.rightBarButtonItem = [[[UIBarButtonItem alloc] initWithTitle:localized(@"check_all") style:UIBarButtonItemStyleBordered target:self action:@selector(clearAllItems)] autorelease];
            self.title = localized(@"shopping_list");
            break;
        case kESVegetables:
            self.listArray  = self.vegetables;
            self.title = localized(@"vegetables_title");
            break;
        case kESBaseFood:
            self.listArray = self.base_food;
            self.title = localized(@"base_food_title");
            break;
        case kESFruits:
            self.listArray = self.fruits;
            self.title = localized(@"fruits_title");
            break;
        case kESSpices:
            self.listArray = self.spices;
            self.title = localized(@"spices_title");
            break;
        case kESDrinks:
            self.listArray = self.drinks;
            self.title = localized(@"drinks_title");
            break;
        case kESCategories:
            self.listArray = self.categories;
            self.title = localized(@"categories_title");
            break;
        default:
            break;
    }
    
    self.listTable.dataSource = self;
    self.listTable.delegate = self;
    self.listTable.rowHeight = 55.0f;
    
}

- (void)viewDidUnload
{
    self.listTable = nil;
    self.vegetables = nil;
    self.base_food = nil;
    self.fruits = nil;
    self.spices = nil;
    self.drinks = nil;
    self.categories = nil;
    self.listArray = nil;
    
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (void)dealloc
{
    self.listTable = nil;
    self.vegetables = nil;
    self.base_food = nil;
    self.fruits = nil;
    self.spices = nil;
    self.drinks = nil;
    self.categories = nil;
    self.listArray = nil;
 
    [super dealloc];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

#pragma mark UITableView data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return (itemsType == kESGetList)?[listArray count]:[listArray count] + 1;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    
    UITableViewCell *cell = (UITableViewCell*)[self.listTable dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        cell = [[[UITableViewCell alloc] initWithStyle:UITableViewStylePlain reuseIdentifier:CellIdentifier] autorelease];
    }
    
    if(indexPath.row == [listArray count])
    {
        cell.textLabel.text = [(AppDelegate *)[[UIApplication sharedApplication] delegate] localizedFromString:@"add_item"];
        cell.textLabel.textAlignment = UITextAlignmentCenter;
        cell.textLabel.lineBreakMode = UILineBreakModeWordWrap;
        cell.imageView.image = nil;
        cell.contentView.backgroundColor = [UIColor colorWithRed:1.0f green:0.95f blue:0.80f alpha:1.0f];
        cell.textLabel.backgroundColor = [UIColor colorWithRed:1.0f green:0.95f blue:0.80f alpha:1.0f];
        [cell setAccessoryView:nil];
        return cell;
    }
    cell.contentView.backgroundColor = [UIColor whiteColor];
    cell.textLabel.backgroundColor = [UIColor whiteColor];

    NSString *localName = ((Item *)[listArray objectAtIndex:indexPath.row]).name;
    if([(AppDelegate *)[[UIApplication sharedApplication] delegate] localizedFromString:localName])
        localName = [(AppDelegate *)[[UIApplication sharedApplication] delegate] localizedFromString:localName];
    cell.textLabel.text = localName;
    cell.textLabel.textAlignment = UITextAlignmentLeft;
    cell.textLabel.lineBreakMode = UILineBreakModeWordWrap;
    cell.textLabel.adjustsFontSizeToFitWidth = YES;
    cell.textLabel.minimumFontSize = 5.0f;
    cell.textLabel.numberOfLines = 2;
    [cell.imageView setContentMode:UIViewContentModeScaleAspectFit];
    cell.imageView.frame = CGRectMake(0.0f, 0.0f, 55.0f, 55.0f);
    UIImage *img = [UIImage imageNamed:((Item *)[listArray objectAtIndex:indexPath.row]).itemIcon];
    cell.imageView.image = img;
    if(!img)
    {
        cell.imageView.image = [UIImage imageNamed:@"Icon.png"];
    }
    
    BOOL checked = [[NSUserDefaults standardUserDefaults] boolForKey:((Item *)[listArray objectAtIndex:indexPath.row]).itemIcon];
    
    if(itemsType == kESGetList)
        checked = !checked;
    
    if(checked)
    {
        [cell setAccessoryView:[[[UIImageView alloc] initWithImage:[UIImage imageNamed:@"check.png"]] autorelease]];
    }
    else
    {
        [cell setAccessoryView:[[[UIImageView alloc] initWithImage:[UIImage imageNamed:@"check_empty.png"]] autorelease]];
    }
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    if(indexPath.row == [listArray count])
    {   
        MProAlertView *view = [[MProAlertView alloc] initWithTitle:localized(@"add_item") message:[NSString stringWithFormat:@"%@ \n\n\n", localized(@"enter_item_name")] delegate:self cancelButtonTitle:localized(@"cancel") otherButtonTitles:localized(@"enter"), nil];
        
        [view show];
        
        return;
    }
    
    UITableViewCell * cell = [tableView cellForRowAtIndexPath:indexPath];
    
    NSUserDefaults *defs = [NSUserDefaults standardUserDefaults];
    BOOL checked = [defs boolForKey:((Item *)[listArray objectAtIndex:indexPath.row]).itemIcon];
    [defs setBool:!checked forKey:((Item *)[listArray objectAtIndex:indexPath.row]).itemIcon];
    [defs synchronize];
    
    if(itemsType == kESGetList)
    {
        [cell setAccessoryView:[[[UIImageView alloc] initWithImage:[UIImage imageNamed:@"check_empty.png"]] autorelease]];
    }
    else
    {
        [cell setAccessoryView:[[[UIImageView alloc] initWithImage:[UIImage imageNamed:@"check.png"]] autorelease]];
    }
    
    [tableView reloadData];
    
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    
    if(buttonIndex == 0)
    {
        return;
    }
    
    NSError *error;
    NSString *itemName = [((MProAlertView *)alertView) textView].text;
    NSString *documentsDirectory = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    NSString *jsonString = [NSString stringWithContentsOfFile:[documentsDirectory stringByAppendingFormat:@"/db.json"] encoding:NSUTF8StringEncoding error:&error];
    NSMutableDictionary *root = [[[jsonString objectFromJSONString] mutableCopy] autorelease];
    NSString *categoryKey = @"categories";
    NSString *categoryIconKey = @"categories_icons";
    switch (itemsType) {
        case kESVegetables:
            categoryKey = @"vegetables";
            categoryIconKey = @"vegetables_icons";
            break;
        case kESBaseFood:
            categoryKey = @"base_food";
            categoryIconKey = @"base_food_icons";
            break;
        case kESFruits:
            categoryKey = @"fruits";
            categoryIconKey = @"fruits_icons";
            break;
        case kESSpices:
            categoryKey = @"spices";
            categoryIconKey = @"spices_icons";
            break;
        case kESDrinks:
            categoryKey = @"drinks";
            categoryIconKey = @"drinks_icons";
            break;
        case kESCategories:
            categoryKey = @"categories";
            categoryIconKey = @"categories_icons";
            break;
            
        default:
            break;
    }
    
    NSMutableArray *array = [[[root objectForKey:categoryKey] mutableCopy] autorelease];
    [array addObject:itemName];
    [root setObject:array forKey:categoryKey];
    array = [[[root objectForKey:categoryIconKey] mutableCopy] autorelease];
    [array addObject:[itemName stringByAppendingFormat:@".png"]];
    [root setObject:array forKey:categoryIconKey];
    NSString *resultString = [root JSONString];
    [resultString writeToFile:[documentsDirectory stringByAppendingFormat:@"/db.json"] atomically:YES encoding:NSUTF8StringEncoding error:&error];
    
    NSUserDefaults *defs = [NSUserDefaults standardUserDefaults];
    [defs setBool:YES forKey:[itemName stringByAppendingFormat:@"_flag"]];
    [defs setBool:NO forKey:[itemName stringByAppendingFormat:@".png"]];
    [defs synchronize];
    
    [self loadDataFromFile:[documentsDirectory stringByAppendingFormat:@"/db.json"]];
    [self.listTable reloadData];

}



- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath
{
    return YES;
}

- (void)tableView:(UITableView *)aTableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
{
    if(editingStyle == UITableViewCellEditingStyleDelete)
    {
        Item *item = [listArray objectAtIndex:indexPath.row];
        [self deleteItem:item];
    }
    
}

#pragma mark private

- (void)loadDataFromFile:(NSString *)filePath
{
    NSError *error;
    NSString *jsonString = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:&error];
    
    NSDictionary *root = (NSDictionary *)[jsonString objectFromJSONString];
    
    [vegetables removeAllObjects];
    [self loadDataFromJsonDict:root inArray:vegetables nameKey:@"vegetables" iconKey:@"vegetables_icons"];
    [base_food removeAllObjects];
    [self loadDataFromJsonDict:root inArray:base_food nameKey:@"base_food" iconKey:@"base_food_icons"];
    [fruits removeAllObjects];
    [self loadDataFromJsonDict:root inArray:fruits nameKey:@"fruits" iconKey:@"fruits_icons"];
    [spices removeAllObjects];
    [self loadDataFromJsonDict:root inArray:spices nameKey:@"spices" iconKey:@"spices_icons"];
    [drinks removeAllObjects];
    [self loadDataFromJsonDict:root inArray:drinks nameKey:@"drinks" iconKey:@"drinks_icons"];
    [categories removeAllObjects];
    [self loadDataFromJsonDict:root inArray:categories nameKey:@"categories" iconKey:@"categories_icons"];
    
}

- (void)loadDataFromJsonDict:(NSDictionary *)root inArray:(NSMutableArray *)array nameKey:(NSString *)nameKey iconKey:(NSString *)iconKey
{
    NSArray *objectsArray = [root objectForKey:nameKey];
    NSArray *objectsIconsArray = [root objectForKey:iconKey];
    
    for(int i = 0; i < [objectsArray count]; ++i)
    {
        Item *item = [[[Item alloc] initWithName:[objectsArray objectAtIndex:i] icon:[objectsIconsArray objectAtIndex:i]] autorelease];
        [array addObject:item];
    }
    
    [array sortUsingFunction:itemsSort context:NULL];
}


- (void)loadGetList
{
    self.listArray = [NSMutableArray arrayWithCapacity:16];
    [self loadGetListForArray:vegetables];
    [self loadGetListForArray:base_food];
    [self loadGetListForArray:fruits];
    [self loadGetListForArray:spices];
    [self loadGetListForArray:drinks];
    [self loadGetListForArray:categories];
}

- (void)loadGetListForArray:(NSArray *)array
{
    NSUserDefaults *defs = [NSUserDefaults standardUserDefaults];
    for(int i = 0; i < [array count]; ++i)
    {
        if([defs boolForKey:((Item *)[array objectAtIndex:i]).itemIcon])
        {
            [listArray addObject:[array objectAtIndex:i]];
        }
    }
}

- (void)clearAllItems
{
    NSUserDefaults *defs = [NSUserDefaults standardUserDefaults];
    for(Item *item in listArray)
    {
        [defs setBool:NO forKey:item.itemIcon];
    }
    [defs synchronize];
    [self.listTable reloadData];
}

- (void)deleteItem:(Item *)item
{
    NSError *error;
        NSString *documentsDirectory = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
        NSString *jsonString = [NSString stringWithContentsOfFile:[documentsDirectory stringByAppendingFormat:@"/db.json"] encoding:NSUTF8StringEncoding error:&error];
        NSMutableDictionary *root = [[[jsonString objectFromJSONString] mutableCopy] autorelease];
        NSString *categoryKey = @"categories";
        NSString *categoryIconKey = @"categories_icons";
        switch (itemsType) {
            case kESVegetables:
                categoryKey = @"vegetables";
                categoryIconKey = @"vegetables_icons";
                break;
            case kESBaseFood:
                categoryKey = @"base_food";
                categoryIconKey = @"base_food_icons";
                break;
            case kESFruits:
                categoryKey = @"fruits";
                categoryIconKey = @"fruits_icons";
                break;
            case kESSpices:
                categoryKey = @"spices";
                categoryIconKey = @"spices_icons";
                break;
            case kESDrinks:
                categoryKey = @"drinks";
                categoryIconKey = @"drinks_icons";
                break;
            case kESCategories:
                categoryKey = @"categories";
                categoryIconKey = @"categories_icons";
                break;
                
            default:
                break;
        }
        
        NSMutableArray *array = [[[root objectForKey:categoryIconKey] mutableCopy] autorelease];
        
        for(int i = 0; i < [array count]; ++i)
        {
            if([[array objectAtIndex:i] isEqualToString:item.itemIcon])
            {
                NSUserDefaults *defs = [NSUserDefaults standardUserDefaults];
                if([defs boolForKey:[item.name stringByAppendingFormat:@"_flag"]])
                {
                    [array removeObjectAtIndex:i];
                    [root setObject:array forKey:categoryIconKey];
                    array = [[[root objectForKey:categoryKey] mutableCopy] autorelease];
                    [array removeObjectAtIndex:i];
                    [root setObject:array forKey:categoryKey];
                    
                    NSString *resultString = [root JSONString];
                    
                    [resultString writeToFile:[documentsDirectory stringByAppendingFormat:@"/db.json"] atomically:YES encoding:NSUTF8StringEncoding error:&error];
                    [self loadDataFromFile:[documentsDirectory stringByAppendingFormat:@"/db.json"]];
                    [self.listTable reloadData];
                    return;
                }
            }
        }
}

@end

#pragma mark sorting

NSInteger itemsSort(id num1, id num2, void *context)
{
    Item *v1 = (Item *)num1;
    Item *v2 = (Item *)num2;
    
    if([v1.name length] > 5 && [[v1.name substringToIndex:5] isEqualToString:@"other"])
    {
        return NSOrderedDescending;
    }else if([v2.name length] > 5 && [[v2.name substringToIndex:5] isEqualToString:@"other"])
    {
        return NSOrderedAscending;
    }
    
    return [localized(v1.name) caseInsensitiveCompare:localized(v2.name)];
}
