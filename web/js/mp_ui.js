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


function init_mp_ui() {
    enableCookie();
}

/*
 * 
 */
function reloadData(list) {
    var numItems = 0;
    list.empty();
    if(!(list.delegate)) {
	return;
    }
    if((list.delegate.numberOfRows != null && list.delegate.cellForRowCol != null)) {
	numItems = list.delegate.numberOfRows(list);
	for(var i = 0; i < numItems; ++i) {
	    // no headers are supported for now
	    list.append(list.delegate.cellForRowCol(list, i, 0));
	}
    }

}

/*
 * mpAnimate method
 */

function mpAnimate(element, cssKey, cssPixelValue, func) {
    var oldVal = $(element).css(cssKey);
    var pxIndex = oldVal.indexOf("px");
    oldVal = Number(oldVal.substring(0, pxIndex));
    var i = 0;
    var step = (cssPixelValue - oldVal) / 30.0;
    var myTimer = setInterval(function (){
	element[0].style.left = parseFloat(element[0].style.left) + step + "px";
	++i;
	if(i >= 30) {
	    clearInterval(myTimer);
	    if(func){
		func(element);
	    }
	}
    }, 18);
}

// function mpAnimate(element, cssKey, cssPixelValue, func) {
//     var oldVal = $(element).css(cssKey);
//     var pxIndex = oldVal.indexOf("px");
//     oldVal = Number(oldVal.substring(0, pxIndex));
//     var i = 0;
//     var step = (cssPixelValue - oldVal) / 30.0;
//     var myTimer = setInterval(function (){
// 	$(element).css(cssKey, (oldVal + i*step) + "px");
// 	++i;
// 	if(i > 30) {
// 	    clearInterval(myTimer);
// 	    if(func){
// 		func(element);
// 	    }
// 	}
//     }, 18);
// }

function mpAnimateExt(element, cssKey, cssValue, cssValueExt, func) {
    var oldVal = $(element).css(cssKey);
    var pxIndex = oldVal.indexOf(cssValueExt);
    oldVal = Number(oldVal.substring(0, pxIndex));
    var i = 0;
    var step = (cssValue - oldVal) / 30.0;
    var myTimer = setInterval(function (){
	$(element).css(cssKey, (oldVal + i*step) + cssValueExt);
	++i;
	if(i > 30) {
	    clearInterval(myTimer);
	    if(func){
		func(element);
	    }
	}
    }, 18);
}

/*
 * MPWindow object (also responsible for page navigation)
 */
function MPWindow(element) {
    this.mp_view = element;

    this.mp_view_navigation_stack = new Array();
    this.pushControllerView = pushControllerView;
    this.popControllerView = popControllerView;
    this.didFinishedPopping = didFinishedPopping;

    //animated not implemented yet
    function pushControllerView(controller_view, animated) {
	var containerWidth = $(window).width();
	this.mp_view_navigation_stack[this.mp_view_navigation_stack.length] = this.mp_view.clone(); //contents
	controller_view.css('left', containerWidth + 'px');
	
	this.mp_view.after(controller_view);
	setTimeout(function () {
	    controller_view[0].style.left = '0px';
	    setTimeout(function () {
		$(".mp_window .mp_screen").first().replaceWith("");
	    }, 300);
	}, 100);

	// controller_view.animate({left: "-="+containerWidth+'px'}, 300, function () {
	//      $(".mp_window .mp_screen").first().replaceWith("");
	// });
	// mpAnimate(controller_view, "left", "0", function () {
	//     $(".mp_window .mp_screen").first().replaceWith("");
	// });
	this.mp_view = $(".mp_window .mp_screen").last();


	// this.mp_view.replaceWith(controller_view); //contents
	// this.mp_view = $(".mp_window .mp_screen");
	// this.mp_view.animate({left: "-=100%"}, 500);
    }

    //animated not implemented yet
    function popControllerView(animated) {
	var containerWidth = $(window).width();
	if(this.mp_view_navigation_stack.length > 0) {
	    var local_next_view = this.mp_view_navigation_stack[this.mp_view_navigation_stack.length - 1];
	    this.mp_view.before(local_next_view);
	    setTimeout(function () {
		$(".mp_window .mp_screen").last()[0].style.left = containerWidth + 'px';
		setTimeout(function () {
		    $(".mp_window .mp_screen").last().replaceWith("");
		}, 300);
	    }, 100);
	    // this.mp_view.animate({left: "+="+containerWidth+'px'}, 300, function () {
	    // 	$(this).replaceWith("");
	    // });
	    // mpAnimate(this.mp_view, "left", containerWidth, function () {
	    // 	$(".mp_window .mp_screen").last().replaceWith("");
	    // });
	    this.mp_view_navigation_stack.pop();
	    this.mp_view = $(".mp_window .mp_screen").first();
	}
//	this.mp_view_navigation_stack[this.mp_view_navigation_stack.length - 1] = undefined; // undefined
    }

    function didFinishedPopping() {
	this.mp_view.replaceWith("");
	this.mp_view = $(".mp_window .mp_screen");
    }

}

/*
 * MPController object
 */
// function MPController(element) {
//     this.mp_view = element;

//     function getMPView() {
// 	if(mp_view) {
// 	    return mp_view;
// 	}
//     }
// }


init_mp_ui();