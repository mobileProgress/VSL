/*  Visual Shopping List for the Web
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

    Linking "Visual Shopping List for the Web" statically or dynamically with 
    other modules is making a combined work based on Visual Shopping List. 
    Thus, the terms and conditions of the GNU General Public License cover 
    the whole combination.

    As a special exception to the GPL, any HTML file which merely makes 
    function calls to this code, and for that purpose includes it by 
    reference shall be deemed a separate work for copyright law purposes. 

    In addition, as a special exception, the copyright holders of 
    "Visual Shopping List for the Web" give you permission to combine 
    "Visual Shopping List for the Web" with free software programs or 
    libraries that are released under the GNU LGPL and with code included in 
    the standard release of the "jquery" library under the "jquery" library's 
    license (or modified versions of such code, with unchanged license). You 
    may copy and distribute such a system following the terms of the GNU GPL 
    for "Visual Shopping List for the Web" and the licenses of the other code 
    concerned.

    Note that people who make modified versions of "Visual Shopping List for 
    the Web" are not obligated to grant these special exceptions for their 
    modified versions; it is their choice whether to do so. 
    The GNU General Public License gives permission to release a modified 
    version without the exceptions above;

    Linking "Visual Shopping List for the Web" statically or dynamically with 
    other modules is making a combined work based on Visual Shopping List. 
    Thus, the terms and conditions of the GNU General Public License cover 
    the whole combination.

    As a special exception to the GPL, any HTML file which merely makes 
    function calls to this code, and for that purpose includes it by 
    reference shall be deemed a separate work for copyright law purposes. 

    In addition, as a special exception, the copyright holders of 
    "Visual Shopping List for the Web" give you permission to combine 
    "Visual Shopping List for the Web" with free software programs or 
    libraries that are released under the GNU LGPL and with code included in 
    the standard release of the "jquery" library under the "jquery" library's 
    license (or modified versions of such code, with unchanged license). You 
    may copy and distribute such a system following the terms of the GNU GPL 
    for "Visual Shopping List for the Web" and the licenses of the other code 
    concerned.

    Note that people who make modified versions of "Visual Shopping List for 
    the Web" are not obligated to grant these special exceptions for their 
    modified versions; it is their choice whether to do so. 
    The GNU General Public License gives permission to release a modified 
    version without the exceptions above;
*/



var kESGetList = 0;
var kESVegetables = 1;
var kESBaseFood = 2;
var kESFruits = 3;
var kESSpices = 4;
var kESDrinks = 5;
var kESCategories = 6;

var listTable;

function ItemsController(itemsTypeArg) {

    this.vegetables = new Array();
    this.base_food = new Array();
    this.fruits = new Array();
    this.spices = new Array();
    this.drinks = new Array();
    this.categories = new Array();

    this.listArray = new Array();
    this.itemsType = itemsTypeArg;

    this.mp_view = 0;

    this.viewDidLoad = viewDidLoad;
    this.localized = localized;
    this.numberOfRows = numberOfRows;
    this.cellForRowCol = cellForRowCol;
    this.didSelectRow = didSelectRow;
    this.tableViewDidSelectRow = tableViewDidSelectRow;
    this.alertViewButtonAtIndex = alertViewButtonAtIndex;
    this.loadData = loadData;
    this.loadDataFromJsonDictInArray = loadDataFromJsonDictInArray;
    this.loadGetList = loadGetList;
    this.loadGetListForArray = loadGetListForArray;
    this.clearAllItems = clearAllItems;
    this.deleteItem = deleteItem;
    this.itemsSort = itemsSort;

    this.checkDoubleClickAtRow = checkDoubleClickAtRow;
    this.commitDeleteForRow = commitDeleteForRow;
    this.deleteItem = deleteItem;

    this.lastClickRow = 0;
    this.lastClickTime = 0;

    function localized(keyString) {
	return keyString;
    }

    // function itemsSort(num1, num2, context);

    // function loadData();
    // function loadDataFromJsonDict(root, array, nameKey, iconKey);
    // function loadGetList();
    // function loadGetListForArray(array);
    // function clearAllItems();


// - (void)viewWillAppear:(BOOL)animated
// {
//     [[self navigationController] setNavigationBarHidden:NO animated:animated];
//     [[[self navigationController] navigationBar] setBarStyle:UIBarStyleBlack];
// }

    function viewDidLoad()
    {
	title = this.mp_view.children(".mp_title_bar").children(".mp_bar_title");
	listTable = this.mp_view.children(".mp_list");
//	this.mp_view = $("#vsl_products");
	listTable.delegate = this;
	rightButton = this.mp_view.children(".mp_title_bar").children(".mp_bar_button");

	// Do any additional setup after loading the view.
    
	title.text(this.localized("items_list_title"));
	
	// self.navigationItem.rightBarButtonItem = [[[UIBarButtonItem alloc] initWithTitle:localized(@"clear") style:UIBarButtonItemStyleBordered target:self action:@selector(clearAllItems)] autorelease];
	rightButton.html("<a href=\"#\" onClick=\"listTable.delegate.clearAllItems();\">" + (this.localized("clear")) + "</a>");
	
	this.vegetables = new Array();
	this.base_food = new Array();
	this.fruits = new Array();
	this.spices = new Array();
	this.drinks = new Array();
	this.categories = new Array();
	
	//NSString *documentsDirectory = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];

    
	this.loadData();
    
	switch (this.itemsType) {
        case kESGetList:
            this.loadGetList();
            //self.navigationItem.rightBarButtonItem = [[[UIBarButtonItem alloc] initWithTitle:localized(@"check_all") style:UIBarButtonItemStyleBordered target:self action:@selector(clearAllItems)] autorelease];
	    rightButton.html("<a href=\"#\" onClick=\"listTable.delegate.clearAllItems();\">" + (this.localized("check_all")) + "</a>");
	    
            title.text(this.localized("shopping_list"));
            break;
        case kESVegetables:
            this.listArray  = this.vegetables;
            title.text(this.localized("vegetables_title"));
            break;
        case kESBaseFood:
            this.listArray = this.base_food;
            title.text(this.localized("base_food_title"));
            break;
        case kESFruits:
            this.listArray = this.fruits;
            title.text(this.localized("fruits_title"));
            break;
        case kESSpices:
            this.listArray = this.spices;
            title.text(this.localized("spices_title"));
            break;
        case kESDrinks:
            this.listArray = this.drinks;
            title.text(this.localized("drinks_title"));
            break;
        case kESCategories:
            this.listArray = this.categories;
            title.text(this.localized("categories_title"));
            break;
        default:
            break;
	}
	
	//listTable.dataSource = self;
	//listTable.delegate = self;
	//listTable.rowHeight = 55.0f;
	reloadData(listTable);
    }


// - (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
// {
//     return (interfaceOrientation == UIInterfaceOrientationPortrait);
// }

//pragma mark UITableView data source

// - (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
// {
//     return 1;
// }

    function numberOfRows(listTable)
    {
	return (this.itemsType == kESGetList)?this.listArray.length:this.listArray.length + 1;
    }

    function cellForRowCol(listTable, row, col)
    {
	var cell = "<li class=\"mp_list_item vls_base_product\" onClick=\"listTable.delegate.didSelectRow("+ row +");\">";
	if(row == this.listArray.length)
	{
            cell += this.localized("add_item");
            // cell.contentView.backgroundColor = [UIColor colorWithRed:1.0f green:0.95f blue:0.80f alpha:1.0f];
            // cell.textLabel.backgroundColor = [UIColor colorWithRed:1.0f green:0.95f blue:0.80f alpha:1.0f];
            // [cell setAccessoryView:nil];
	    cell = cell + "</li>";
            return cell;
	}
	// cell.contentView.backgroundColor = [UIColor whiteColor];
	// cell.textLabel.backgroundColor = [UIColor whiteColor];

	var img = this.listArray[row].itemIcon;
	if(!img)
	{
	    cell = cell + "<img src=\"images/Icon.png\" alt=\"\" />";
	}else {
	    cell = cell + "<img src=\"images/" + img + "\" alt=\"\" />";
	}

	var localName = this.listArray[row].name;
	if(this.localized(localName))
            localName = this.localized(localName);
	cell += localName;
	// cell.textLabel.textAlignment = UITextAlignmentLeft;
	// cell.textLabel.lineBreakMode = UILineBreakModeWordWrap;
	// cell.textLabel.adjustsFontSizeToFitWidth = YES;
	// cell.textLabel.minimumFontSize = 5.0f;
	// cell.textLabel.numberOfLines = 2;
	// [cell.imageView setContentMode:UIViewContentModeScaleAspectFit];
	// cell.imageView.frame = CGRectMake(0.0f, 0.0f, 55.0f, 55.0f);

	var checked = readCookie((this.listArray[row]).itemIcon);
	
	if(this.itemsType == kESGetList)
            checked = !checked;
	
	if(checked)
	{
	    cell += "<a href=\"#\" class=\"vsl_check\"><img src=\"images/check.png\" alt=\"check_box\" /></a>";
	}
	else
	{
	    cell += "<a href=\"#\" class=\"vsl_check\"><img src=\"images/check_empty.png\" alt=\"check_box\" /></a>";
	}
	
	cell = cell + "</li>";
	return cell;
    }

    function didSelectRow(row) {
	this.tableViewDidSelectRow(listTable, row);
    }

    function tableViewDidSelectRow(tableView, row)
    {
	if(this.checkDoubleClickAtRow(row))
	{
	    return;
	}
	if(row == this.listArray.length)
	{   
            // MProAlertView *view = [[MProAlertView alloc] initWithTitle:localized(@"add_item") message:[NSString stringWithFormat:@"%@ \n\n\n", localized(@"enter_item_name")] delegate:self cancelButtonTitle:localized(@"cancel") otherButtonTitles:localized(@"enter"), nil];
            
            // [view show];
	    var item_name = prompt(this.localized("add_item") + this.localized("enter_item_name"));
	    if(item_name)
	    {
		this.alertViewButtonAtIndex(item_name, 1)
	    }
            
            return;
	}
	
	cell = listTable.children().eq(row);
	cellHtml = cell.html();
	
	var checked = readCookie(this.listArray[row].itemIcon);
	createCookie(this.listArray[row].itemIcon,((!checked)?"true":""),0);

	if(this.itemsType == kESGetList)
	{
	    cellHtml = cellHtml.replace("check.png", "check_empty.png");
	    cell.replaceWith(cellHtml);
	}
	else
	{
	    cellHtml = cellHtml.replace("check_empty.png", "check.png");
	    cell.replaceWith(cellHtml);
	}
	
	reloadData(listTable);
	
    }

    function alertViewButtonAtIndex(alertViewText, buttonIndex)
    {
	
	if(buttonIndex == 0)
	{
            return;
	}
	
	var error;
	var itemName = alertViewText;
	var categoryKey = "categories";
	var categoryIconKey = "categories_icons";
	switch (this.itemsType) {
        case kESVegetables:
            categoryKey = "vegetables";
            categoryIconKey = "vegetables_icons";
            break;
        case kESBaseFood:
            categoryKey = "base_food";
            categoryIconKey = "base_food_icons";
            break;
        case kESFruits:
            categoryKey = "fruits";
            categoryIconKey = "fruits_icons";
            break;
        case kESSpices:
            categoryKey = "spices";
            categoryIconKey = "spices_icons";
            break;
        case kESDrinks:
            categoryKey = "drinks";
            categoryIconKey = "drinks_icons";
            break;
        case kESCategories:
            categoryKey = "categories";
            categoryIconKey = "categories_icons";
            break;
            
        default:
            break;
	}
	
	var array = JSON.parse(readCookie(categoryKey));
	array[array.length] = (itemName);
	createCookie(categoryKey, JSON.stringify(array),0);
	array = JSON.parse(readCookie(categoryIconKey));
	array[array.length] = (itemName + ".png");
	createCookie(categoryIconKey, JSON.stringify(array),0);

	
	createCookie(itemName+"_flag", "true",0);
	
	this.loadData();
	reloadData(listTable);

    }

    function checkDoubleClickAtRow(row)
    {
	if(this.lastClickRow == row && Math.abs(this.lastClickTime - Date.now()) < 500) 
	{

	    this.commitDeleteForRow(row);
	    return true;
	}
	this.lastClickRow = row;
	this.lastClickTime = Date.now();
	return false;
    }

    function commitDeleteForRow(row)
    {
        var item = this.listArray[row];

        this.deleteItem(item);
    }

//pragma mark private

    function loadData()
    {
	var error;
	var jsonString = 0;//[NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:&error];
	
	var root = 0;//(NSDictionary *)[jsonString objectFromJSONString];
	
	this.vegetables.length = 0;
	this.loadDataFromJsonDictInArray(root, this.vegetables, "vegetables", "vegetables_icons");
	this.base_food.length = 0;
	this.loadDataFromJsonDictInArray(root, this.base_food, "base_food", "base_food_icons");
	this.fruits.length = 0;
	this.loadDataFromJsonDictInArray(root, this.fruits, "fruits", "fruits_icons");
	this.spices.length = 0;
	this.loadDataFromJsonDictInArray(root, this.spices, "spices", "spices_icons");
	this.drinks.length = 0;
	this.loadDataFromJsonDictInArray(root, this.drinks, "drinks", "drinks_icons");
	this.categories.length = 0;
	this.loadDataFromJsonDictInArray(root, this.categories, "categories", "categories_icons");
	
    }

    function loadDataFromJsonDictInArray(root, array, nameKey, iconKey)
    {
	var objectsArray = JSON.parse(readCookie(nameKey));
	if(objectsArray == null)
	    return;
	var objectsIconsArray = JSON.parse(readCookie(iconKey));
	if(objectsIconsArray == null)
	    return;

	for(var i = 0; i < objectsArray.length; ++i)
	{
            var item = new Object();
	    item.name = objectsArray[i];
	    item.itemIcon = objectsIconsArray[i];
            array[array.length] = item;
	}

	array.sort(this.itemsSort);
    }


    function loadGetList()
    {    
	this.listArray = new Array();
	this.loadGetListForArray(this.vegetables);
	this.loadGetListForArray(this.base_food);
	this.loadGetListForArray(this.fruits);
	this.loadGetListForArray(this.spices);
	this.loadGetListForArray(this.drinks);
	this.loadGetListForArray(this.categories);
    }

    function loadGetListForArray(array)
    {
	for(var i = 0; i < array.length; ++i)
	{
	    if(readCookie(array[i].itemIcon) && JSON.parse(readCookie(array[i].itemIcon))) {
		this.listArray[this.listArray.length] = array[i];
	    }
	}
    }

    function clearAllItems()
    {
	for(i = 0; i < this.listArray.length; ++i)
	{
	    var item = this.listArray[i];
	    createCookie(item.itemIcon, "", 0);
	}
	reloadData(listTable);
    }

    function deleteItem(item)
    {
        var categoryKey = "categories";
        var categoryIconKey = "categories_icons";
        switch (this.itemsType) {
        case kESVegetables:
            categoryKey = "vegetables";
            categoryIconKey = "vegetables_icons";
            break;
        case kESBaseFood:
            categoryKey = "base_food";
            categoryIconKey = "base_food_icons";
            break;
        case kESFruits:
            categoryKey = "fruits";
            categoryIconKey = "fruits_icons";
            break;
        case kESSpices:
            categoryKey = "spices";
            categoryIconKey = "spices_icons";
            break;
        case kESDrinks:
            categoryKey = "drinks";
            categoryIconKey = "drinks_icons";
            break;
        case kESCategories:
            categoryKey = "categories";
            categoryIconKey = "categories_icons";
            break;
            
        default:
            break;
        }
        
        var array =  JSON.parse(readCookie(categoryIconKey));

        for(i = 0; i < array.length; ++i)
        {
            if(array[i] == item.itemIcon)
            {
		if(readCookie(item.name + "_flag"))
                {


		    var result = confirm(this.localized("delete_question"));
		    if(!result) {
			return;
		    }

                    array.splice(i, 1);
		    createCookie(categoryIconKey, JSON.stringify(array),0);
		    array =  JSON.parse(readCookie(categoryKey));
                    array.splice(i, 1);
		    createCookie(categoryKey, JSON.stringify(array),0);
                    
		    this.loadData();
                    reloadData(listTable);
                }
            }
        }

    }

//pragma mark sorting

    function itemsSort(num1, num2)
    {
	var v1 = num1;
	var v2 = num2;
	
	if(v1.name.length > 5 && v1.name.substring(0,5) == "other")
	{
            return -1;
	}else if(v2.name.length > 5 && v2.name.substring(0,5) == "other")
	{
            return 1;
	}
	
	return localized(v1.name) > localized(v2.name)?1:0;
    }

}