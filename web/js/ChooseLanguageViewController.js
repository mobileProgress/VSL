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

langTable = 0;

function ChooseLanguageViewController()
{
    this.mp_view = 0;
    this.bulgarian = "Bulgarian";
    this.russian = "Russian";
    this.english = "English";
    this.systemLanguage = "System Language";

    this.viewDidLoad = viewDidLoad;
    this.numberOfRows = numberOfRows;
    this.cellForRowCol = cellForRowCol;
    this.didSelectRow = didSelectRow;

    function viewDidLoad()
    {
        langTable = this.mp_view.children(".mp_list");
        langTable.delegate = this;
        reloadData(langTable);
    }

// function viewDidUnload
// {
//     self.table = nil;
//     self.bulgarian = nil;
//     self.russian = nil;
//     self.english = nil;
//     self.systemLanguage = nil;
// }

    // function dealloc
    // {
    //  self.table = nil;
    //  self.bulgarian = nil;
    //  self.russian = nil;
    //  self.english = nil;
    //  self.systemLanguage = nil;
    // }

    // function shouldAutorotateToInterfaceOrientation(interfaceOrientation)
    // {
    //  return (interfaceOrientation == UIInterfaceOrientationPortrait);
    // }

//#pragma mark table view data source

    function numberOfRows(listTable)
    {
        return 4;
    }

    function cellForRowCol(listTable, row, col)
    {
        var cell = "<li class=\"mp_list_item\" onClick=\"langTable.delegate.didSelectRow("+ row +");\">";
        switch (row) {
        case 0:
            cell = cell + this.bulgarian;
            break;
        case 1:
            cell = cell + this.russian;
            break;
        case 2:
            cell = cell + this.english;
            break;
        case 3:
            cell = cell + this.systemLanguage;
            break;
            
        default:
            cell = cell + this.systemLanguage;
            break;
        }
        return cell;
    }

    //#pragma mark table view delegate

    function didSelectRow(row)
    {
        switch (row) {
        case 0:
            createCookie("userLang", "bg",0);
            loadLocale("bg");
            break;
        case 1:
            createCookie("userLang", "ru",0);
            loadLocale("ru");
            break;
        case 2:
            createCookie("userLang", "en",0);
            loadLocale("en");
            break;
        case 3:
            createCookie("userLang", "",0);
            initLocale();
            break;
            
        default:
            createCookie("userLang", "",0);
            initLocale();
            break;
        }
        mpWin.popControllerView(true);
    }



}
