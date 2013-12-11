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

var mpWin = 0;

var itemsControllerView = 0;
var viewControllerView = 0;
var viewController = 0;
var aboutControllerView = 0;
var chooseLanguageControllerView = 0;

function appLaunched() {
    //InitCookies
    var isLaunched = readCookie("isFirstLaunch");
    if(!isLaunched)
    {
	initJSONCookies();
        createCookie("isFirstLaunch", "true", 0);
    }




    //Get reference to the window
    mpWin = new MPWindow($(".mp_window .mp_screen"));


    //Get screens
    var tmpScreen = $("#vsl_products");
    itemsControllerView = tmpScreen.clone();
    tmpScreen.replaceWith("");
    tmpScreen = $("#vsl_aboutus");
    aboutControllerView = tmpScreen.clone();
    tmpScreen.replaceWith("");
    tmpScreen = $("#vsl_language");
    chooseLanguageControllerView = tmpScreen.clone();
    tmpScreen.replaceWith("");
    viewControllerView = $("#vsl_ViewController");
    viewController = new ViewController();
    viewController.mp_view = viewControllerView;
    viewController.viewDidLoad();
    mpWin.mp_controller = viewController;

    mpNotifications.registerForNotification(function (notif) {
	    viewController.resetLocale();
    }, mp_locale_loaded);

//    tmpScreen.replaceWith("");
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

appLaunched();


