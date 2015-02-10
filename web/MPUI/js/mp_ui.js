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

/*
 * library initialization
 */

function init_mp_ui() {
    enableCookie();
    if(initLocale) {
        initLocale();
    }
}

/*
 * Returns window's vertical scroll position
 */
function mpGetScrollPosition() {
    var pos = 0;
    if(document.documentElement) {
        pos = document.documentElement.scrollTop;
    }
    if(!pos || pos == 0) {
        pos = window.pageYOffset;
    }

    if(!pos)
    {
        return 0;
    }

    return pos;
}

/*
 * Sets window's vertical scroll position
 */
function mpSetScrollPosition(topArg) {
    if(document.documentElement)
        document.documentElement.scrollTop = topArg;
    if(window.scrollTo)
        window.scrollTo(0, topArg);
}

/*
 * Vertical list of items reload function
 * Reloads the list by calling it's adapter's 
 * cellForRowCol and numberOfRows functions 
 */
function reloadData(list) {
    var numItems = 0;
    var scrollPos = mpGetScrollPosition();
    list.empty();
    if(!(list.delegate)) {
        return;
    }
    if((list.delegate.numberOfRows != null) && (list.delegate.cellForRowCol != null)) {
        numItems = list.delegate.numberOfRows(list);
        for(var i = 0; i < numItems; ++i) {
            // no headers are supported for now
            list.append(list.delegate.cellForRowCol(list, i, 0));
        }
    }
    mpSetScrollPosition(scrollPos);
    setTimeout(function () {
        mpSetScrollPosition(scrollPos);
    }, 10);

}

/*
 * mpAnimate method
 * Animates css properties of element "element"
 * Only pixel values are supported for this method
 * "cssKey" is the css key of the animation
 * "cssPixelValue" is the requested value at the end of the animation
 * "func" is optional function to execute at the end of the animation
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

/*
 * mpAnimateExt
 * same as mpAnimate method but has argument cssValueExt which
 * could be "px", "%" or other css value type
 */

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
function MPWindow(controller) {
    this.mp_controller = controller;

    this.mp_view_navigation_stack = new Array();
    this.pushControllerView = pushControllerView;
    this.popControllerView = popControllerView;
    this.didFinishedPopping = didFinishedPopping;

    //animated not implemented yet
    function pushControllerView(ctl, animated) {
        var containerWidth = $(window).width();
        //save old controller
        this.mp_view_navigation_stack.push(this.mp_controller);

        //insert the new controller's view
        ctl.mp_view[0].className = "mp_screen right_end";
        $(".mp_window .mp_screen").last().after(ctl.mp_view);
        if(ctl.viewAppeared)
        {
            ctl.viewAppeared();
        }

        var domView = ctl.mp_view[0];
        setTimeout(function () {
            domView.className = "mp_screen";
            setTimeout(function () {
                $(".mp_window .mp_screen").first().replaceWith("");
            }, 500);
        }, 10);

        this.mp_contoller = ctl;
    }

    //animated not implemented yet
    function popControllerView(animated) {
        var containerWidth = $(window).width();
        if(this.mp_view_navigation_stack.length > 0) {
            var next_controller = this.mp_view_navigation_stack[this.mp_view_navigation_stack.length - 1];
            this.mp_view_navigation_stack.pop();
            $(".mp_window .mp_screen").last().before(next_controller.mp_view);
            var domView = $(".mp_window .mp_screen").last()[0];

            setTimeout(function () {
                //domView.style.left = containerWidth + 'px';
                domView.className = "mp_screen right_end";

                setTimeout(function () {
                    $(".mp_window .mp_screen").last().replaceWith("");
                    if(next_controller.viewAppeared)
                    {
                        next_controller.viewAppeared();
                    }
                }, 500);
            }, 10);
            this.mp_controller = next_controller;

        }
    }

    function didFinishedPopping() {
        this.mp_view.replaceWith("");
        this.mp_view = $(".mp_window .mp_screen");
    }

}

init_mp_ui();
