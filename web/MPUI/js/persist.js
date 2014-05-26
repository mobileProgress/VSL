/*  MPUI
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

    Linking "MPUI" statically or dynamically with 
    other modules is making a combined work based on MPUI. 
    Thus, the terms and conditions of the GNU General Public License cover 
    the whole combination.

    As a special exception to the GPL, any HTML file which merely makes 
    function calls to this code, and for that purpose includes it by 
    reference shall be deemed a separate work for copyright law purposes. 

    In addition, as a special exception, the copyright holders of 
    "MPUI" give you permission to combine "MPUI" with free software programs or
    libraries that are released under the GNU LGPL and with code included in 
    the standard release of the "jquery" library under the "jquery" library's 
    license (or modified versions of such code, with unchanged license). You 
    may copy and distribute such a system following the terms of the GNU GPL 
    for "MPUI" and the licenses of the other code 
    concerned.

    Note that people who make modified versions of "MPUI" are not 
    obligated to grant these special exceptions for their modified versions; 
    it is their choice whether to do so. 
    The GNU General Public License gives permission to release a modified 
    version without the exceptions above;
*/

var expDays = 60;

function toHex(str) {
    var hex = '';
    var h1 = 0, h2 = 0;
    var hexnum = 0;
    for(var i=0;i<str.length;i++) {
	var num = str.charCodeAt(i);
	if(num > 127) {
	    h1 = num & 0x7C0;
	    h1 = h1 >> 6;
	    h1 = h1 | 0xC0;
	    h2 = num & 0x3F;
	    h2 = h2 | 0x80;
	    hexnum = (h1.toString(16)) + (h2.toString(16));
	}else {
	    hexnum = num.toString(16);
	}
        hex += hexnum;
    }
    return hex;
}

function fromHex(hex) {
    var str = '';
    for(var i=0;i<hex.length;i=i+2) {
	var num = Number("0x" + hex.substring(i, i + 2));
	if(num > 127)
	{
	    num = Number("0x" + hex.substring(i, i + 4));
	    i=i+2;
	    var n1 = num & 0x3F;
	    var n2 = num & 0x1F00;
	    n2 = n2 >> 2;
	    num = n1 | n2;
	}
	str += String.fromCharCode(num);
    }
    return str;
}

/*
 * "createCookie" creates cookie with name "name", value "value" and expiration
 * period "days" days. If "days" equals 0 than expDays constant is used for 
 * the exporation period. If days equals -1 than the cookie is created as 
 * session only without beeing stored.
 */
function createCookie(name,value,days) {
    if(days == 0)
	days = expDays;
    if(days == -1)
	days = 0;
    value = toHex(value);
    if (days) {
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+ new Date(date).toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1,c.length);
	if (c.indexOf(nameEQ) == 0) {
	    var result = c.substring(nameEQ.length,c.length);
	    result = fromHex(result);
	    return result;
	}
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",0);
}

function enableCookie() {
    var cookieEnabled=(navigator.cookieEnabled)? true : false

//if not IE4+ nor NS6+
    if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 
document.cookie="testcookie"
	cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false
    }

//if (cookieEnabled) //if cookies are enabled on client's browser
//do whatever

}