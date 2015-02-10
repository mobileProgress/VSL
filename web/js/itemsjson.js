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


function initJSONCookies() {

    createCookie("vegetables", "[ \
\"tomatoes\", \
\"potatoes\", \
\"carrots\", \
\"cabbage\", \
\"cauliflower\", \
\"beetroot\", \
\"onion\", \
\"pepper\", \
\"corn\", \
\"broccoli\", \
\"cucumbers\", \
\"eggplant\", \
\"kidney beans\", \
\"green beans\", \
\"lettuce\", \
\"mushrooms\", \
\"spinach\", \
\"lentils\", \
\"pumpkin\", \
\"okra\", \
\"other vegetable\" \
]", 0);

    createCookie("vegetables_icons", "[ \
\"tomatoes.png\", \
\"potatoes.png\", \
\"carrots.png\", \
\"cabbage.png\", \
\"cauliflower.png\", \
\"beetroot.png\", \
\"onion.png\", \
\"pepper.png\", \
\"corn.png\", \
\"broccoli.png\", \
\"cucumbers.png\", \
\"eggplant.png\", \
\"kidney_beans.png\", \
\"beans_green.png\", \
\"lettuce.png\", \
\"mushrooms.png\", \
\"spinach.png\", \
\"lentils.png\", \
\"pumpkin.png\", \
\"okra.png\", \
\"other_vegetables.png\" \
]", 0);

    createCookie("base_food", "[ \
\"eggs\", \
\"milk\", \
\"cheese\", \
\"bread\", \
\"meat\", \
\"yogurt\", \
\"cream\", \
\"pasta\", \
\"caviar\", \
\"fish\", \
\"flour\", \
\"rice\", \
\"other base food\" \
]", 0);

    createCookie("base_food_icons", "[ \
\"eggs.png\", \
\"milk.png\", \
\"cheese.png\", \
\"bread.png\", \
\"meat.png\", \
\"yogurt.png\", \
\"cream.png\", \
\"pasta.png\", \
\"caviar.png\", \
\"fish.png\", \
\"flour.png\", \
\"rice.png\", \
\"other_basefood.png\" \
]", 0);

    createCookie("fruits", "[ \
\"apple\", \
\"blackberries\", \
\"plums\", \
\"melon\", \
\"cherries\", \
\"lemons\", \
\"orange\", \
\"pears\", \
\"peaches\", \
\"apricots\", \
\"pineapple\", \
\"mango\", \
\"bananas\", \
\"watermelon\", \
\"grapefruit\", \
\"other fruit\" \
]", 0);

    createCookie("fruits_icons", "[ \
\"apple.png\", \
\"blackberries.png\", \
\"plums.png\", \
\"melon.png\", \
\"cherries.png\", \
\"lemons.png\", \
\"orange.png\", \
\"pears.png\", \
\"peaches.png\", \
\"apricots.png\", \
\"pineapple.png\", \
\"mango.png\", \
\"banana.png\", \
\"watermelon.png\", \
\"grapefruit.png\", \
\"other_fruits.png\" \
]", 0);

    createCookie("spices", "[ \
\"oil\", \
\"vinegar\", \
\"salt\", \
\"pepper spice\", \
\"cinnamon\", \
\"dill\", \
\"vanilla\", \
\"basil\", \
\"aniseed\", \
\"spearmint\", \
\"caraway\", \
\"cardamom\", \
\"rosemary\", \
\"nutmeg\", \
\"cumin\", \
\"curcuma\", \
\"sumac\", \
\"parsley\", \
\"celery\", \
\"lovage\", \
\"thyme\", \
\"ginger\", \
\"oregano\", \
\"saffron\", \
\"other spice\" \
]", 0);

    createCookie("spices_icons", "[ \
\"oil.png\", \
\"vinegar.png\", \
\"salt.png\", \
\"pepperSpice.png\", \
\"cinnamon.png\", \
\"dill.png\", \
\"vanilla.png\", \
\"basil.png\", \
\"aniseed.png\", \
\"spearmint.png\", \
\"caraway.png\", \
\"cardamom.png\", \
\"rosemary.png\", \
\"nutmeg.png\", \
\"cumin.png\", \
\"curcuma.png\", \
\"sumac.png\", \
\"parsley.png\", \
\"celery.png\", \
\"lovage.png\", \
\"thyme.png\", \
\"ginger.png\", \
\"oregano.png\", \
\"saffron.png\", \
\"other_spices.png\" \
]", 0);

    createCookie("drinks", "[ \
\"beer\", \
\"wine\", \
\"vodka\", \
\"wiskey\", \
\"juice\", \
\"rakiya\", \
\"coffee\", \
\"tea\", \
\"sake\", \
\"ouzo\", \
\"tequila\", \
\"brendy\", \
\"martini\", \
\"other drink\" \
]", 0);

    createCookie("drinks_icons", "[ \
\"beer.png\", \
\"mavrud.png\", \
\"vodka.png\", \
\"wiskey.png\", \
\"juice.png\", \
\"rakiya.png\", \
\"coffee.png\", \
\"tea.png\", \
\"sake.png\", \
\"ouzo.png\", \
\"tequila.png\", \
\"brendy.png\", \
\"martini.png\", \
\"other_drinks.png\" \
]", 0);

    createCookie("categories", "[ \
\"food\", \
\"medical\", \
\"books\", \
\"bath and cleaning\", \
\"clothing\", \
\"cars\", \
\"shoes\", \
\"games\", \
\"computers\", \
\"something else\" \
]", 0);

    createCookie("categories_icons", "[ \
\"food.png\", \
\"medical.png\", \
\"books.png\", \
\"cleaning.png\", \
\"clothing.png\", \
\"cars.png\", \
\"shoes.png\", \
\"games.png\", \
\"computers.png\", \
\"infinity.png\" \
]", 0);

}