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


var localeObj = ""; //global locale object

//constants
mp_locale_loaded = "locale_loaded";

/*
 * "initLocale" retreives the localization json file accoring to the browser 
 * language and sets the mp_lang session only cookie
 */
function initLocale()
{
    var lang = readCookie("userLang");;
    if(!lang || !lang.length)
	lang = navigator.language;
    if(!lang)
	lang = navigator.browserLanguage; //ie
    if(!lang)
	lang = navigator.systemLanguage; //ie
    if(!lang)
	lang = navigator.userLanguage;

    if(lang.length > 2)
	lang = lang.substring(0, 2);

    if(!lang)
    {
	lang = "en" //fall back to en locale
    }

    loadLocale(lang);
}

/*
 * "loadLocale" retreives the localization json file accoring to the "lang" 
 * argument and sets the mp_lang session only cookie
 */
function loadLocale(lang)
{
    $.ajax('/vsl/js/' + lang + '_string.json').done(function (data){
	localeObj = data;
	mpNotifications.sendNotification(mp_locale_loaded);
    });
}

/*
 * localized(keyString)
 * get localized string for key
 * the return value is string according to the browser language
 */
function localized(key)
{
    var retStr = localeObj[key];
    if(retStr)
    {
	return retStr;
    }
    return key; //fall back to the keyp
}
