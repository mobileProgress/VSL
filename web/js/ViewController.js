/*  Visual Shopping List for the Web
    Copyright (C) 2013-2015 Мобилен прогрес ЕООД, София, България

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

    this.mp_view = 0;
    this.changeLanguage = 0;
    this.getListLabel = 0;
    this.baseFoodLabel = 0;
    this.vegetablesLabel = 0;
    this.spicesLabel = 0;
    this.fruitsLabel = 0;
    this.drinksLabel = 0;
    this.categoriesLabel = 0;
    this.aboutLabel = 0;

    // function getListAction();
    // function baseFoodAction();
    // function vegetablesAction();
    // function spicesAction();
    // function fruitsAction();
    // function drinksAction();
    // function categoriesAction();
    // function aboutAction();
    // function chooseLanguage();

    this.resetLocale = resetLocale;
    this.viewDidLoad = viewDidLoad;
    this.viewAppeared = viewAppeared;

    function resetLocale()
    {
        if(this.changeLanguage)
        {
            var string = localized("change_language_title");
            if(string.length)
            {
                if(string == "change_language_title")
                {
                    string = "Change language for this app";
                }
                this.changeLanguage.html("<h2>"+string+"</h2>");
            }
        }
        
        if(this.getListLabel)
        {
            var string = localized("get_list_title");
            if(string.length)
            {
                if(string == "get_list_title")
                {
                    string = "Get List";
                }
                this.getListLabel.html("<h2>"+string+"</h2>");
            }
        }
        
        if(this.baseFoodLabel)
        {
            var string = localized("base_food_title");
            if(string.length)
            {
                if(string == "base_food_title")
                {
                    string = "Base Food";
                }

                this.baseFoodLabel.html("<h2>"+string+"</h2>");
            }
        }
        
        if(this.vegetablesLabel)
        {
            var string = localized("vegetables_title");
            if(string.length)
            {
                if(string == "vegetables_title")
                {
                    string = "Vegetables";
                }

                this.vegetablesLabel.html("<h2>"+string+"</h2>");
            }
        }
        
        if(this.spicesLabel)
        {
            var string = localized("spices_title");
            if(string.length)
            {
                if(string == "spices_title")
                {
                    string = "Spices";
                }

                this.spicesLabel.html("<h2>" + string + "</h2>");
            }
        }
        
        if(this.fruitsLabel)
        {
            var string = localized("fruits_title");
            if(string.length)
            {
                if(string == "fruits_title")
                {
                    string = "Fruits";
                }

                this.fruitsLabel.html("<h2>" + string + "</h2>");
            }
        }
        
        if(this.drinksLabel)
        {
            var string = localized("drinks_title");
            if(string.length)
            {
                if(string == "drinks_title")
                {
                    string = "Drinks";
                }

                this.drinksLabel.html("<h2>" + string + "</h2>");
            }
        }
        
        if(this.categoriesLabel)
        {
            var string = localized("categories_title");
            if(string.length)
            {
                if(string == "categories_title")
                {
                    string = "Categories";
                }

                this.categoriesLabel.html("<h2>" + string + "</h2>");
            }
        }
        
        if(this.aboutLabel)
        {
            var string = localized("about_title");
            if(string.length)
            {
                if(string == "about_title")
                {
                    string = "Info";
                }

                this.aboutLabel.html("<h2>" + string + "</h2>");
            }
        }
        
    }

    function viewDidLoad()
    {

        this.changeLanguage = $("#language_btn", this.mp_view);
        this.getListLabel = $("#btn_getlist", this.mp_view);
        this.baseFoodLabel = $("#btn_basefood", this.mp_view);
        this.vegetablesLabel = $("#btn_vegetables", this.mp_view);
        this.spicesLabel = $("#btn_spices", this.mp_view);
        this.fruitsLabel = $("#btn_fruits", this.mp_view);
        this.drinksLabel = $("#btn_drinks", this.mp_view);
        this.categoriesLabel = $("#btn_categories", this.mp_view);
        this.aboutLabel = $("#btn_about_us", this.mp_view);

    }

    function viewAppeared()
    {
        this.resetLocale();
    }
    
    // function dealloc()
    // {
    //  self.getListButton = nil;
    //  self.baseFoodButton = nil;
    //  self.vegetablesButton = nil;
    //  self.spicesButton = nil;
    //  self.fruitsButton = nil;
    //  self.drinksButton = nil;
    //  self.categoriesButton = nil;
    //  self.aboutButton = nil;
    //  self.changeLanguage = nil;
    //  self.getListLabel = nil;
    //  self.baseFoodLabel = nil;
    //  self.vegetablesLabel = nil;
    //  self.spicesLabel = nil;
    //  self.fruitsLabel = nil;
    //  self.drinksLabel = nil;
    //  self.categoriesLabel = nil;
    //  self.aboutLabel = nil;
        
    //  [super dealloc];
    // }

    // function shouldAutorotateToInterfaceOrientation(interfaceOrientation);
    // {
    //  return (interfaceOrientation == UIInterfaceOrientationPortrait);
    // }


//#pragma mark actions

    // function  getListAction()
    // {
    //  var ctl = ItemsController(kESGetList);
    //  [self.navigationController pushViewController:ctl animated:YES];
    // }

    // function  baseFoodAction()
    // {
    //  var ctl = ItemsController(kESBaseFood);
    //  [self.navigationController pushViewController:ctl animated:YES];
    // }

    // function  vegetablesAction()
    // {
    //  var ctl = ItemsController(kESVegetables);
    //  [self.navigationController pushViewController:ctl animated:YES];
    // }

    // function  spicesAction()
    // {
    //  var ctl = ItemsController(kESSpices);
    //  [self.navigationController pushViewController:ctl animated:YES];
    // }

    // function  fruitsAction()
    // {
    //  var ctl = ItemsController(kESFruits);
    //  [self.navigationController pushViewController:ctl animated:YES];
    // }

    // function  drinksAction()
    // {
    //  var ctl = ItemsController(kESDrinks);
    //  [self.navigationController pushViewController:ctl animated:YES];
    // }

    // function  categoriesAction()
    // {
    //  var ctl = ItemsController(kESCategories);
    //  [self.navigationController pushViewController:ctl animated:YES];
    // }

    // function  aboutAction()
    // {
    //  var ctl = AboutController();
    //  [self.navigationController pushViewController:ctl animated:YES];
    // }

    // function  chooseLanguage()
    // {
    //  var chooseLanguage = ChooseLanguageViewController();
    //  [self.navigationController pushViewController:chooseLanguage animated:YES];
    // }



   
}
