/*  MPUI
    Copyright (C) 2013-2014 Мобилен прогрес ЕООД, София, България

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
 * MPPrompt class
 * MPPrompt is displayed as prompt with customizable interface.
 * It has ok and cancel buttons.
 * 
 * note: make shore to call dealloc to remove the reference from
 * the global mp_table structure
 */

var kMPPromptVisible = 0;

function MPPrompt() {

    this.delegate = 0;
    this.table_id = 0;
    this.mp_view = 0;
    
    this.init = init;
    this.initWithContent = initWithContent;
    this.show = show;
    this.remove = remove;
    this.buttonTouched = buttonTouched;
    this.prompt_click = prompt_click;

    function init() {
        this.initWithContent("");
    }

    function prompt_click(event) {
        if(!event)
            event = window.event;

        if(event.stopPropagation) {
            event.stopPropagation();
        } else{ //IE 8
            e.cancelBubble = true;
        }
    }

    function initWithContent(content) {
        //.prompt_back is the layer on top of the screen which prevents touches
        //outside of the prompt. It is also the background shading.
        //#prompt_root is the id of the root element of all prompt elements
        // on the screen. Used for prompt removal.
        //.prompt is the prompt back layer with the coordinates and size of the
        //screen.
        //.prompt_content is the layer which contains all prompt sublayers and the prompt borders.
        //.prompt_inside is the layer with prompt text, input, etc. It is on
        //top of the .prompt_buttons layer which holds the buttons.
        this.mp_view = "<div id=\"prompt_root\" class=\"prompt_back\" onclick=\"kMPPromptVisible.prompt_click(event)\"><div class=\"prompt\" ><div class=\"prompt_content\"><div class=\"prompt_inside\">"+content+"</div><div class=\"prompt_buttons\" ><div class=\"pr_button_left\" onclick=\"kMPPromptVisible.buttonTouched(0)\">Ok</div><div class=\"pr_button_right\" onclick=\"kMPPromptVisible.buttonTouched(1)\">Cancel</div></div></div></div></div>";
    }

    function show() {
        if(kMPPromptVisible) //show only once until removed
            return;
        kMPPromptVisible = this;

	var scrollTop = mpGetScrollPosition() + "px";

        $("body").children().last().after(this.mp_view);

        //adjust prompt geometry
        $("#prompt_root").height(document.documentElement.scrollHeight + "px");
        $("#prompt_root").width(document.documentElement.scrollWidth + "px");
	var prompt = $(".prompt");
	prompt[0].style.top = scrollTop;
	prompt.height(window.innerHeight + "px");
	prompt.width((window.innerWidth*0.8) + "px");
	prompt[0].style.left = (window.innerWidth*0.1) + "px";
	var prompt_content = $(".prompt_content");
        prompt_content[0].style.top = (prompt.height() - prompt_content[0].offsetHeight) / 2 + "px";
    }

    function buttonTouched(number) {
        if(this.delegate) {
            this.delegate.buttonTouched(number);
        }
        remove(); //the view is removed
    }

    function remove() {
	var inserted = $("#prompt_root");
        if(inserted) {
            inserted.remove(); //remove the view from the DOM
        }
	kMPPromptVisible = 0; //latest displayed prompt
    }

}