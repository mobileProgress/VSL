/*  MPUI
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

function mp_get_args() {
  var length = window.location.href.length;
  var paramStart = window.location.href.indexOf("?");
  if(paramStart > 0) {
      var params = window.location.href.substr(paramStart + 1, length - paramStart);
    return params;
  }
  return "";
}

function mp_get_version(message) {
  var vEnd = message.indexOf("v");
  if(vEnd > 0) {
    var vStr = message.substr(0, vEnd);
    return Number.parseInt(vStr);
  }
  return 0;
}

function mp_read_message(message) {
  var length = message.length;
  var vStart = message.indexOf("=");
  var result = "";
  if(vStart > 0) {
    var result = message.substr(vStart + 1, length - vStart - 1);
    var endStr = result.indexOf("&");
    if(endStr > 0) {
      result = result.substr(0, endStr);
    }
    return result;
  }
  return "";
}

function mp_extract_message(message) {
  var vEnd = message.indexOf("v");
  if(vEnd > 0) {
    var extract = message.substr(vEnd + 1, message.length - vEnd - 1);
    return extract;
  }
  return "";
}

function mp_parse_message() {
    var url_args = mp_get_args();
    var message = mp_read_message(url_args);
    if(mp_get_version(message) == 1) {
      var msg = mp_extract_message(message);
      var argArray = msg.split(',');
      for(var i = 0; i < argArray.length; ++i) {
          var couple = argArray[i].split('_');
          if(couple.length > 1) {
              couple[0] = fromHex(couple[0]);
              couple[1] = fromHex(couple[1]);
          }else {
              couple[0] = fromHex(couple[0]);
              couple[1] = "";
          }
          argArray[i] = couple;
      }
      return argArray;
    }
    return new Array();
}
