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

var mpWin = 0;

var itemsControllerView = 0;
var viewControllerView = 0;
var viewController = 0;
var aboutControllerView = 0;
var chooseLanguageControllerView = 0;

var maxURLLength = 2000;

function appLaunched() {
    //InitCookies
    var isLaunched = readCookie("isFirstLaunch");
    if(!isLaunched)
    {
        initJSONCookies();
        createCookie("isFirstLaunch", "true", 0);
    }

    //Read url data arguments
    prompt_load_url_data();

    //Get reference to the window
    mpWin = new MPWindow($(".mp_window .mp_screen"));


    //Get screens
    var tmpScreen = $("#vsl_products");
    itemsControllerView = tmpScreen.clone();
    tmpScreen = $("#vsl_aboutus");
    aboutControllerView = tmpScreen.clone();
    tmpScreen = $("#vsl_language");
    chooseLanguageControllerView = tmpScreen.clone();
    viewControllerView = $("#vsl_ViewController");
    viewController = new ViewController();
    viewController.mp_view = viewControllerView;
    viewController.viewDidLoad();
    mpWin.mp_controller = viewController;

    mpNotifications.registerForNotification(function (notif) {
            viewController.resetLocale();
    }, mp_locale_loaded);

}

function pushProduct(type) {
    //Get screen width
    var containerHeight = $(window).height();
    itemsControllerView.css("min-height", containerHeight+"px");
    var itemsController = new ItemsController(type);
    itemsController.mp_view = itemsControllerView;
    //call at the beginning
    itemsController.viewDidLoad();
    mpWin.pushControllerView(itemsController, true);
}

function pushAbout() {
    //Get screen width
    var containerHeight = $(window).height();
    aboutControllerView.css("min-height", containerHeight+"px");
    var aboutController = new AboutController();
    aboutController.mp_view = aboutControllerView;
    //call at the beginning
    aboutController.viewDidLoad();
    mpWin.pushControllerView(aboutController, true);
}

function pushLanguage() {
    //Get screen width
    var containerHeight = $(window).height();
    chooseLanguageControllerView.css("min-height", containerHeight+"px");
    var chooseLanguageController = new ChooseLanguageViewController();
    chooseLanguageController.mp_view = chooseLanguageControllerView;
    //call at the beginning
    chooseLanguageController.viewDidLoad();
    mpWin.pushControllerView(chooseLanguageController, true);
}

function resetVSLData() {
    // eraseCookie("isFirstLaunch");
    // eraseCookie("categories");
    // eraseCookie("drinks");
    // eraseCookie("spices");
    // eraseCookie("fruits");
    // eraseCookie("base_food");
    // eraseCookie("vegetables");
    // eraseCookie("userLang");
    // //clear locale
    // document.cookie = "";

    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        // document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        createCookie(name, "",0);
    }

    initLocale();
    initJSONCookies();
    createCookie("isFirstLaunch", "true", 0);
}

function prompt_load_url_data() {

    var strEls = mp_parse_message();
    if(!strEls || strEls.length == 0) {
        return;
    }

    var mpprompt = new MPPrompt();

    mpprompt.initWithContentAndButtons("<p>Your URL contains additional items from backup. <br /> Do you want to add these items to your shopping list categories?</p>", "Yes", "No");
    function PromptDelegate() {
        this.buttonTouched = function buttonTouched(number) {
            if(number == 0) {
                var strEls = mp_parse_message();
                //if no URL messages dont load
                if(!strEls || strEls.length == 0) {
                    return;
                }
                load_url_data(strEls);
            }
        }
    }
    mpprompt.delegate = new PromptDelegate();
    mpprompt.show();

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
        if(readCookie(toHex(array[i].itemIcon)) && JSON.parse(readCookie(toHex(array[i].itemIcon)))) {
            this.listArray[this.listArray.length] = array[i];
        }
    }
}

function generate_hex(array, category)
{ 
    //Generate array of hex items
    var resultArray = new Array();

    //Extract custom items and set their categories
    for(var i = 0; i < array.length; ++i)
    {
        var obj = array[i];

        //If the item is custom item
        if(readCookie(toHex(obj.name) + "_flag"))
        {
            var meta = "0" + category;
            var hexObj = new Object();
            hexObj.hexValue = meta + toHex(obj.name);
            //TODO add check for name.png
            if(obj.itemIcon.length > 4 && 
               (obj.itemIcon.substr(obj.itemIcon.length - 4, 4) != ".png" ||
                obj.itemIcon.substr(4, obj.itemIcon.length - 4) != obj.name))
            {
                hexObj.hexValue = hexObj.hexValue + "_" + toHex(obj.itemIcon);
            }
            hexObj.itemIcon = obj.itemIcon;
            resultArray[resultArray.length] = hexObj;
        }
    }
    return resultArray;
}

function save_url_data() {
    var data = prepare_save_url_data();

    if(!data || data.length == 0) {
        return;
    }

    //generate maxURLLength size URL
    var urlArray = new Array();
    urlArray[0] = window.location.href;
    var paramStart = window.location.href.indexOf("?");
    if(paramStart > 0) {
        urlArray[0] = window.location.href.substr(0, paramStart);
    }
    urlArray[0] = urlArray[0] + "?q=1v";
    urlArray[0] = urlArray[0] + data[0].hexValue;
    //TODO support for multiple urls or max url length setting
    /*if(urlArray[0].length > 2000) {
        alert("To many selected item. Note that URL size will be than 2000 characters.");
    }*/
    for(var i = 1; i < data.length; ++i) {
        /* Check link size in the next versions
        if(urlArray[0].length + data[i].hexValue.length + 1 > 2000)
        {
            break;
        }*/
        urlArray[0] = urlArray[0] + "," + data[i].hexValue;
    }


    //TODO check URL size and split
    //Display interface with URL size and links
    //These links will open your email program so you can send email with your currently selected shopping list items[ and backup of your custom items].
    //Note that if there are more than one link, each link will send separate email with different set of custom items.[ The first link will contain all selected items (from "Get List").]
    //You can open this link to synchronize your custom items and selected shopping list with other device. You can also use them as backup to load after browser reinstall.
    
    var mpprompt = new MPPrompt();

    //TODO add mailto:emailaddress?body=
    var contents = "<p>The link below will open your email program so you can send email with your currently selected shopping list items and backup of your custom items.<br /><a href=\"mailto:emailaddress?body=" + urlArray[0] + "\"><b>" + "Mail/Backup your list" + "</b></a></p>";

    mpprompt.initWithContentAndButtons(contents, "Dismiss", "");
    function PromptDelegate() {
        this.buttonTouched = function buttonTouched(number) {
        }
    }
    mpprompt.delegate = new PromptDelegate();
    mpprompt.show();
    
}

function prepare_save_url_data() {

    var itemDict = {
        "tomatoes.png" : 0, 
        "potatoes.png" : 1, 
        "carrots.png" : 2, 
        "cabbage.png" : 3, 
        "cauliflower.png" : 4, 
        "beetroot.png" : 5, 
        "onion.png" : 6, 
        "pepper.png" : 7, 
        "corn.png" : 8, 
        "broccoli.png" : 9, 
        "cucumbers.png" : 10, 
        "eggplant.png" : 11, 
        "kidney_beans.png" : 12, 
        "beans_green.png" : 13, 
        "lettuce.png" : 14, 
        "mushrooms.png" : 15, 
        "spinach.png" : 16, 
        "lentils.png" : 17, 
        "pumpkin.png" : 18, 
        "okra.png" : 19, 
        "other_vegetables.png" : 20,

        "eggs.png" : 21, 
        "milk.png" : 22, 
        "cheese.png" : 23, 
        "bread.png" : 24, 
        "meat.png" : 25, 
        "yogurt.png" : 26, 
        "cream.png" : 27, 
        "pasta.png" : 28, 
        "caviar.png" : 29, 
        "fish.png" : 30, 
        "flour.png" : 31, 
        "rice.png" : 32, 
        "other_basefood.png" : 33,

        "apple.png" : 34, 
        "blackberries.png" : 35, 
        "plums.png" : 36, 
        "melon.png" : 37, 
        "cherries.png" : 38, 
        "lemons.png" : 39, 
        "orange.png" : 40, 
        "pears.png" : 41, 
        "peaches.png" : 42, 
        "apricots.png" : 43, 
        "pineapple.png" : 44, 
        "mango.png" : 45, 
        "banana.png" : 46, 
        "watermelon.png" : 47, 
        "grapefruit.png" : 48, 
        "other_fruits.png" : 49,

        "oil.png" : 50, 
        "vinegar.png" : 51, 
        "salt.png" : 52, 
        "pepperSpice.png" : 53, 
        "cinnamon.png" : 54, 
        "dill.png" : 55, 
        "vanilla.png" : 56, 
        "basil.png" : 57, 
        "aniseed.png" : 58, 
        "spearmint.png" : 59, 
        "caraway.png" : 60, 
        "cardamom.png" : 61, 
        "rosemary.png" : 62, 
        "nutmeg.png" : 63, 
        "cumin.png" : 64, 
        "curcuma.png" : 65, 
        "sumac.png" : 66, 
        "parsley.png" : 67, 
        "celery.png" : 68, 
        "lovage.png" : 69, 
        "thyme.png" : 70, 
        "ginger.png" : 71, 
        "oregano.png" : 72, 
        "saffron.png" : 73, 
        "other_spices.png" : 74,

        "beer.png" : 75, 
        "mavrud.png" : 76, 
        "vodka.png" : 77, 
        "wiskey.png" : 78, 
        "juice.png" : 79, 
        "rakiya.png" : 80, 
        "coffee.png" : 81, 
        "tea.png" : 82, 
        "sake.png" : 83, 
        "ouzo.png" : 84, 
        "tequila.png" : 85, 
        "brendy.png" : 86, 
        "martini.png" : 87, 
        "other_drinks.png" : 88,

        "food.png" : 89, 
        "medical.png" : 90, 
        "books.png" : 91, 
        "cleaning.png" : 92, 
        "clothing.png" : 93, 
        "cars.png" : 94, 
        "shoes.png" : 95, 
        "games.png" : 96, 
        "computers.png" : 97, 
        "infinity.png" : 98
    };

    var ic = new ItemsController(kESGetList);
    ic.loadData();
    ic.loadGetList();

    var newItems = new Array();

    ic.vegetables;
    ic.base_food;
    ic.fruits;
    ic.spices;
    ic.drinks;
    ic.categories;

    ic.listArray;

    var resultArray = new Array();
    resultArray = resultArray.concat(generate_hex(ic.base_food, 0));
    resultArray = resultArray.concat(generate_hex(ic.vegetables, 1));
    resultArray = resultArray.concat(generate_hex(ic.fruits, 2));
    resultArray = resultArray.concat(generate_hex(ic.spices, 3));
    resultArray = resultArray.concat(generate_hex(ic.drinks, 4));
    resultArray = resultArray.concat(generate_hex(ic.categories, 5));

    var hexArray = "";
    //For each selected item find the selected custom items
    for(var i = 0; i < ic.listArray.length; ++i) {
        var foundFlag = false;
        for(var j = 0; j < resultArray.length; ++j) {
            var selected = ic.listArray[i].itemIcon;
            if(resultArray[j].itemIcon == selected) {
                var hexValue = resultArray[j].hexValue;
                hexValue = hexValue.substr(1, hexValue.length - 1);
                resultArray[j].hexValue = "1" + hexValue;
                foundFlag = true;
                break;
            }
        }
        if(foundFlag == false) {
            var hexnum = (itemDict[ic.listArray[i].itemIcon]).toString(16);
            if(hexnum.length == 1) {
                hexnum = "0" + hexnum;
            }
            hexArray = hexArray + hexnum;
        }
    }

    var selectObj = new Object();
    selectObj.hexValue = hexArray;
    var returnData = [selectObj];
    returnData = returnData.concat(resultArray);
    return returnData;
}

function load_url_checks(strEls) {

    var itemIds = [
         "tomatoes.png", // 0
         "potatoes.png", // 1
         "carrots.png", // 2
         "cabbage.png", // 3
         "cauliflower.png", // 4
         "beetroot.png", // 5
         "onion.png", // 6
         "pepper.png", // 7
         "corn.png", // 8
         "broccoli.png", // 9
         "cucumbers.png", // 10
         "eggplant.png", // 11
         "kidney_beans.png", // 12
         "beans_green.png", // 13
         "lettuce.png", // 14
         "mushrooms.png", // 15
         "spinach.png", // 16
         "lentils.png", // 17
         "pumpkin.png", // 18
         "okra.png", // 19
         "other_vegetables.png",// 20

         "eggs.png", // 21
         "milk.png", // 22
         "cheese.png", // 23
         "bread.png", // 24
         "meat.png", // 25
         "yogurt.png", // 26
         "cream.png", // 27
         "pasta.png", // 28
         "caviar.png", // 29
         "fish.png", // 30
         "flour.png", // 31
         "rice.png", // 32
         "other_basefood.png",// 33

         "apple.png", // 34
         "blackberries.png", // 35
         "plums.png", // 36
         "melon.png", // 37
         "cherries.png", // 38
         "lemons.png", // 39
         "orange.png", // 40
         "pears.png", // 41
         "peaches.png", // 42
         "apricots.png", // 43
         "pineapple.png", // 44
         "mango.png", // 45
         "banana.png", // 46
         "watermelon.png", // 47
         "grapefruit.png", // 48
         "other_fruits.png",// 49

         "oil.png", // 50
         "vinegar.png", // 51
         "salt.png", // 52
         "pepperSpice.png", // 53
         "cinnamon.png", // 54
         "dill.png", // 55
         "vanilla.png", // 56
         "basil.png", // 57
         "aniseed.png", // 58
         "spearmint.png", // 59
         "caraway.png", // 60
         "cardamom.png", // 61
         "rosemary.png", // 62
         "nutmeg.png", // 63
         "cumin.png", // 64
         "curcuma.png", // 65
         "sumac.png", // 66
         "parsley.png", // 67
         "celery.png", // 68
         "lovage.png", // 69
         "thyme.png", // 70
         "ginger.png", // 71
         "oregano.png", // 72
         "saffron.png", // 73
         "other_spices.png",// 74

         "beer.png", // 75
         "mavrud.png", // 76
         "vodka.png", // 77
         "wiskey.png", // 78
         "juice.png", // 79
         "rakiya.png", // 80
         "coffee.png", // 81
         "tea.png", // 82
         "sake.png", // 83
         "ouzo.png", // 84
         "tequila.png", // 85
         "brendy.png", // 86
         "martini.png", // 87
         "other_drinks.png",// 88

         "food.png", // 89
         "medical.png", // 90
         "books.png", // 91
         "cleaning.png", // 92
         "clothing.png", // 93
         "cars.png", // 94
         "shoes.png", // 95
         "games.png", // 96
         "computers.png", // 97
         "infinity.png" // 98
    ];

    //if no URL messages dont load
    if(!strEls || strEls.length == 0) {
        return;
    }

    //Start loading url checked items
    for(var i = 0; i < strEls.length; ++i) {
        if(strEls[i] < itemIds.length) {
            var el =  itemIds[strEls[i]];
            createCookie(toHex(el), "true", 0);
        }
    }

}

function load_url_data(strEls) {
    var categories = [
    "base_food",
    "vegetables",
    "fruits",
    "spices",
    "drinks",
    "categories"
    ];

    var categoryArrays = [
        new Array(),
        new Array(),
        new Array(),
        new Array(),
        new Array(),
        new Array()
    ];

    var categoryIconArrays = [
        new Array(),
        new Array(),
        new Array(),
        new Array(),
        new Array(),
        new Array()
    ];

    //load the default items data
    for(var i = 0; i < 6; ++i) {
        categoryIconArrays[i] = JSON.parse(readCookie(categories[i] + "_icons"));
        categoryArrays[i] = JSON.parse(readCookie(categories[i]));
    }

    //if no URL messages dont load
    if(!strEls || strEls.length == 0) {
        return;
    }
    
    //Start loading url data
    for(var i = 0; i < strEls.length; ++i) {
        var el = strEls[i];

        if(i == 0) {
            if(el[0].length > 0) {
                //TODO ask user for old selected items
                var selections = new Array();
                for(var j = 0; j < el[0].length; ++j) {
                    selections[j] = el[0].charCodeAt(j);
                }
                load_url_checks(selections);
            }
            continue;
        }

        if(!el[0] || el[0].length <= 1) {
            continue;
        }

        //extract element category
        var category = el[0].charCodeAt(0);
        var shouldSelect = category & 0x16;
        category = category & 0x7;
        if(category > 5) {
            category = 5;
        }

        el[0] = (el[0]).substr(1, (el[0]).length - 1);

        //if has image data
        var name = el[0];
        var icon = name + ".png";
        if(el[1].length > 0) {
            icon = el[1];
        }
        
        //Select the item if shouldSelect
        if(shouldSelect == 16) {
            createCookie(toHex(icon),"true",0);
        }

        var objectsArray = categoryArrays[category];
        if(objectsArray == null) {
            return;
        }
        if(!arrayContains(objectsArray, name)) {
            var objLen = objectsArray.length;
            objectsArray[objLen] = name;

            var objectsIconsArray = categoryIconArrays[category];
            if(objectsIconsArray == null) {
                continue;
            }
            objectsIconsArray[objLen] = icon;
        }
        
        //mark as custom item
        createCookie(toHex(name)+"_flag", "true",0);

    }

    //write the merged data
    for(var i = 0; i < 6; ++i) {
        if(categoryArrays[i] != null && categoryArrays[i].length > 0) {
            createCookie(categories[i], JSON.stringify(categoryArrays[i]),0);
            createCookie(categories[i] + "_icons", JSON.stringify(categoryIconArrays[i]),0);
        }
    }
}

function arrayContains(arr, str) {
    for(var i = 0; i < arr.length; ++i) {
        if(arr[i] == str) {
            return true;
        }
    }
    return false;
}

appLaunched();


