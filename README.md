# Contrasty
**Day 1:**  

![Day 1](https://raw.githubusercontent.com/AHmims/Contrasty/master/screenshots/day1.png)

**Day 2:**  
So far :
- The scoring system works.
- Main window UI is done.
- Colors changes dynamically.
- The script determins which color is the darkest/lightest then changes the color inputs accordingly to provide a correct ratio.
- Clicking on the star icon changes it.

A tricky part was to color svg icons imported via an <img> ag through css.
The hardest part about today which took me about 4 hours to figure out was a way fire an event when the mouse moves when it's out the window, there exists some native modules that doo the trick but I couldn't get them to work, the only native that works for me is RobotJs that I'll be using to get the color on from the cursor position.

![Day 2](https://github.com/AHmims/Contrasty/raw/master/screenshots/day2-1.png)

The adopted solution was to create another window that will act as a colorpicker, this window will have a transparent background and follow the mouse movements, once the user clicks the picked will send the selcted color to the main window the closes it self.

![Day 2](https://github.com/AHmims/Contrasty/raw/master/screenshots/day2-2.png)

----------
Desired result :  

![Final Result](https://raw.githubusercontent.com/AHmims/Contrasty/master/screenshots/result.png)

Normal : 

![Normal State](https://raw.githubusercontent.com/AHmims/Contrasty/master/screenshots/Artboard%20–%201.png)

Favorite : 

![Favorite State](https://raw.githubusercontent.com/AHmims/Contrasty/master/screenshots/Artboard%20–%204.png)

Bookmarks : 

![Bookmarks State](https://raw.githubusercontent.com/AHmims/Contrasty/master/screenshots/Artboard%20–%205.png)

Settings : 

![Settings State](https://raw.githubusercontent.com/AHmims/Contrasty/master/screenshots/Artboard%20–%206.png)
