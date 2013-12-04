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
*/


function ViewController() {

    var getListButton;
    var baseFoodButton;
    var vegetablesButton;
    var spicesButton;
    var fruitsButton;
    var drinksButton;
    var categoriesButton;
    var aboutButton;

    var changeLanguage;
    var getListLabel;
    var baseFoodLabel;
    var vegetablesLabel;;
    var spicesLabel;
    var fruitsLabel;
    var drinksLabel;
    var categoriesLabel;
    var aboutLabel;

    function getListAction();
    function baseFoodAction();
    function vegetablesAction();
    function spicesAction();
    function fruitsAction();
    function drinksAction();
    function categoriesAction();
    function aboutAction();
    function chooseLanguage();



    function resetLocale();
    {
	if(changeLanguage)
	{
            var string = localized("change_language_title");
            if(string.length)
		changeLanguage.text(string);
	}
	
	if(getListLabel)
	{
            var string = localized("get_list_title");
            if(string.length)
		getListLabel.text(string);
	}
	
	if(baseFoodLabel)
	{
            var string = localized("base_food_title");
            if(string.length)
		baseFoodLabel.text(string);
	}
	
	if(vegetablesLabel)
	{
            var string = localized("vegetables_title");
            if(string.length)
		vegetablesLabel.text(string);
	}
	
	if(spicesLabel)
	{
            var string = localized("spices_title");
            if(string.length)
		spicesLabel.text(string);
	}
	
	if(fruitsLabel)
	{
            var string = localized("fruits_title");
            if(string.length)
		fruitsLabel.text(string);
	}
	
	if(drinksLabel)
	{
            var string = localized("drinks_title");
            if(string.length)
		drinksLabel.text(string);
	}
	
	if(categoriesLabel)
	{
            var string = localized("categories_title");
            if(string.length)
		categoriesLabel.text(string);
	}
	
	if(aboutLabel)
	{
            var string = localized("about_title");
            if(string.length)
		aboutLabel.text(string);
	}
	
    }

    function viewDidLoad()
    {

	self.resetLocale();
    }

    // function viewWillAppear(animated)
    // {
    // 	[super viewWillAppear:animated];
    // 	[[self navigationController] setNavigationBarHidden:YES animated:animated];
    // 	[self resetLocale];
    // }
    
    // function dealloc()
    // {
    // 	self.getListButton = nil;
    // 	self.baseFoodButton = nil;
    // 	self.vegetablesButton = nil;
    // 	self.spicesButton = nil;
    // 	self.fruitsButton = nil;
    // 	self.drinksButton = nil;
    // 	self.categoriesButton = nil;
    // 	self.aboutButton = nil;
    // 	self.changeLanguage = nil;
    // 	self.getListLabel = nil;
    // 	self.baseFoodLabel = nil;
    // 	self.vegetablesLabel = nil;
    // 	self.spicesLabel = nil;
    // 	self.fruitsLabel = nil;
    // 	self.drinksLabel = nil;
    // 	self.categoriesLabel = nil;
    // 	self.aboutLabel = nil;
	
    // 	[super dealloc];
    // }

    // function shouldAutorotateToInterfaceOrientation(interfaceOrientation);
    // {
    // 	return (interfaceOrientation == UIInterfaceOrientationPortrait);
    // }


//#pragma mark actions

    function  getListAction()
    {
	var ctl = ItemsController(kESGetList);
	[self.navigationController pushViewController:ctl animated:YES];
    }

    function  baseFoodAction()
    {
	var ctl = ItemsController(kESBaseFood);
	[self.navigationController pushViewController:ctl animated:YES];
    }

    function  vegetablesAction()
    {
	var ctl = ItemsController(kESVegetables);
	[self.navigationController pushViewController:ctl animated:YES];
    }

    function  spicesAction()
    {
	var ctl = ItemsController(kESSpices);
	[self.navigationController pushViewController:ctl animated:YES];
    }

    function  fruitsAction()
    {
	var ctl = ItemsController(kESFruits);
	[self.navigationController pushViewController:ctl animated:YES];
    }

    function  drinksAction()
    {
	var ctl = ItemsController(kESDrinks);
	[self.navigationController pushViewController:ctl animated:YES];
    }

    function  categoriesAction()
    {
	var ctl = ItemsController(kESCategories);
	[self.navigationController pushViewController:ctl animated:YES];
    }

    function  aboutAction()
    {
	var ctl = AboutController();
	[self.navigationController pushViewController:ctl animated:YES];
    }

    function  chooseLanguage()
    {
	var chooseLanguage = ChooseLanguageViewController();
	[self.navigationController pushViewController:chooseLanguage animated:YES];
    }



   
}
