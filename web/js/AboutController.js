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


function AboutController()
{
    this.aboutUs = 0;
    this.contactUs = 0;
    this.twitter = 0;
    
    this.description = 0;
    
    this.aboutUsAction = aboutUsAction;
    this.contactUsAction = contactUsAction;
    this.twitterAction = twitterAction;
    this.viewDidLoad = viewDidLoad;
    
    this.mp_view = 0;

    function viewDidLoad()
    {

	this.aboutUs = this.mp_view.children("#about_link");
	this.contactUs = this.mp_view.children("#contact_link");
	this.twitter = this.mp_view.children("#share_link");
    
	this.description = this.mp_view.children("#about_desc");

	if(this.description)
	{
            var desc = localized("description");
            if(desc)
		this.description.text(desc);
	}
	
	if(this.aboutUs)
	{
            var string = localized("about_us");
            if(string)
		this.aboutUs.text(string);
	}

	if(this.contactUs)
	{
            var string = localized("contact_us");
            if(string)
		this.contactUs.text(string);
	}

	if(this.twitter)
	{
            var string = localized("share_this_app");
            if(string)
		this.twitter.text(string);
	}
	
    }

    // function viewDidUnload()
    // {
    // 	this.aboutUs = 0;
    // 	this.contactUs = 0;
    // 	this.twitter = 0;
    // 	this.description = 0;
    // }

    // function shouldAutorotateToInterfaceOrientation(interfaceOrientation)
    // {
    // 	return (interfaceOrientation == UIInterfaceOrientationPortrait);
    // }

    // function viewWillAppear(animated)
    // {
    // 	[[self navigationController] setNavigationBarHidden:NO animated:animated];
    // 	[[[self navigationController] navigationBar] setBarStyle:UIBarStyleBlack];
    // }

//#pragma mark Actions

    function aboutUsAction()
    {
	//[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"http://www.mobileprogressive.com"]];
    }

    function contactUsAction()
    {
    //[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"mailto://contactus@mobileprogressive.com"]];
    }

    function twitterAction()
    {
    }

}

