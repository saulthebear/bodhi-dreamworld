# 😻 Bodhi's Dreamworld ☁️

Bodhi's Dreamworld is a platform game where you guide Mr. Bodhi Bigglesworth through his dream to collect scattered treats and ultimately get into the big treat jar! Put your jumping and dodging skills to the test as you navigate the platforms and avoid the automated grooming brushes being launched your way.

This game was created by Stefan Vosloo for project 1 of General Assembly's Software Engineering Immersive.

[🕹 Play the game 🎮](https://saulthebear.github.io/bodhi-dreamworld/)

## Table of contents

- [🖼 Screenshot](#screenshot)
- [👀 Overview](#overview)
  - [🏔 The challenge](#the-challenge)
  - [🔗 Links](#links)
- [⚙️ My process](#my-process)
  - [🛠 Built with](#built-with)
  - [🧠 What I learned](#what-i-learned)
  - [🔎 Resources referenced](#resources-referenced)
- [🧑‍💻 Author](#author)

## Screenshot

![](./screenshot.png)

## Overview

### The challenge

Project requirements:

- A game in the browser
- A win condition, upon which the user is informed of winning
- Separate HTML, CSS, and JavaScript files
- JavaScript used for DOM manipulation
- Clean and DRY code
- The game should be deployed publicly
- Instructions should included

Personal Goals:

- Minimum Viable Product (MVP)
  - [x] Create a movable player character
  - [x] Let character jump
  - [x] Create platforms to jump over / onto
  - [x] A goal that when reached ends the level
  - [x] Display a level timer -- The goal is to see how quickly you can complete the level
  - [x] A restart button
  - [x] A button to show instructions
- Stretch Goals:
  - [x] Add obstacles
    - [x] A machine that shoots out brushes - Getting dazes the player for a few seconds
    - [ ] A treadmill moving in the opposite direction of desired travel
    - [ ] A shower that intermittently turns on. Getting wet slows the player down
    - [ ] A timed dryer. If the player gets sucked in, they'll have to wait for the dryer to finish its cycle before it opens up
  - [x] Animated sprites
  - [x] Extra treats to collect along the way
  - [x] Multiple levels
  - [x] Let user select level
  - [x] Heads up display
  - [x] Favicon
  - [x] Complete code documentation
  - [ ] Have viewport move with character, so that the whole level isn't visible at once
  - [ ] Double jumping / wall jumping for harder obstacles

### Links

- Live Site: [Github Pages](https://saulthebear.github.io/bodhi-dreamworld/)
- Documentation: [Docs](https://saulthebear.github.io/bodhi-dreamworld/docs)
- Original Project Pitch and Wireframes: [Github README](./Project%20Pitch.md)

## My process

### Built with

- Vanilla JavaScript (no third-party libraries, except for documentation tool)
- HTML5 canvas
- CSS
- JSDoc - To generate a documentation website from code comments

- An Object Oriented approach was used
  - A MVC pattern was used, dividing main responsibilities between a Game, Renderer, and Controller class
  - Classes are loosely coupled
  - Code is modular and expandable
  - Inheritance is shallow - only 1 level deep at most

### What I learned

This project taught me a lot about organizing my code and the importance of loose coupling. Starting with this approach helped me immensely in being able to expand and extend the game quickly after developing the MVP.

I also learned a lot about game development and animation in general. Having never developed any games or animated anything before, I had to learn about rendering and update loops from scratch. I implemented a fixed time step engine (relying heavily on Jake Gordon and Frank Poth's guides linked in the resources section), which keeps the game running at a consistent speed regardless of the machine it runs on. I also learned how to use sprite sheets to create an animated character.

This project also taught me how to document code properly. I used JSDoc comments to document every class, variable, and function, which allowed me to generate a documentation website. The process of documenting the code forced me to really understand every bit of code and what its purpose is, which allowed me to find opportunities for refactoring to make it even clearer. This documentation will also serve to remind me of how the program works when I come back to it in the future. While I believe in "self-documenting code" I think its even better to have both self-documenting code and explicit documentation, as the documentation can be referenced independently and give an overview of the whole program.

I am very happy that I was able to implement a level map editor. This consisted of a simple multi-line string which is then parsed to determine the size of the game world as well as the placement of game objects. This allowed me to quickly add multiple levels, and easily test and tweak them. The level map strings are designed to be both human readable and easily parsable by the computer. To continue building on this I would love to extend it to be able to determine both the width and height of objects. The way it works at the moment is by reading the file one line at a time, determining an object's x and y position and its width, but the height is just set to the block height of a single line.

```js
export const level1Map = `
**************************
*                        *
*                        *
*                        *
* !!  $                  *
*     =                  *
*======  ===             *
*               $        *
*                    $   *
*                        *
*              ====      *
* $       =             $*
*======  ==            ==*
*                        *
*                        *
*>                       *
*                        *
*         $    ==========*
*         ==             *
*                        *
*   ====                 *
*                        *
*                        *
*  $   $                 *
*=======                 *
*          =====         *
*           ==== $       *
*           =======      *
*                       $*
*                     ===*
*       $      $      ===*
*       ==     ==   =====*
*p      ==     ==   =====*
*========================*
**************************
`
```

I struggled with getting text to render sharply on the canvas. I assume this has to do with the relatively small dimensions I used for my canvas leading to a low resolution. This worked well for the pixel art style of the game, but didn't work well for rendering text. I managed to work around this problem by overlaying HTML elements on the canvas. This allowed me to create a HUD (heads-up display), to show the user their level time as well as how many treats they have collected and how many remain. It also allowed me to overlay text on the screen when a user completes a level, informing them of their success.

I'm also very pleased to be have been able to implement a way of locking levels until a user has fully completed a previous level (ie. collected 100% of the treats). This was achieved by using the browser's local storage API. This approach has the advantage of persisting even after the user refreshes or closes the tab/window. I combined the tracking of whether a level was unlocked with tracking and displaying of a user's best time on a level to give returning players an added challenge to aim for. The disadvantage of this approach is that a tech-savvy user can easily manipulate this data, however this only affects their own game and is not a big deal.

There are several stretch goals that I have not reached yet, allowing for building on this game in the future. The biggest missing stretch goal is adding all the obstacles I had in my original project pitch.

### Resources referenced

- [Javascript Game Foundations - The Game Loop - Jake Gordon](https://codeincomplete.com/articles/javascript-game-foundations-the-game-loop/) - This resource really helped me understand how to implement my game engine and how it works with requestAnimationFrame
- [Create a Platformer Game with JavaScript - Frank Poth](https://www.youtube.com/watch?v=w-OKdSHRlfA) - This video showed me how to divide my code using an MVP approach and how to implement a fixed time step engine.
- [The guide to implementing 2D platformers - Rodrigo Monteiro](http://higherorderfun.com/blog/2012/05/20/the-guide-to-implementing-2d-platformers/) - This showed me how to implement character movement and collisions
- [HTML5 Canvas and JavaScript Mario Game Tutorial - Christopher Lis](https://www.youtube.com/watch?v=4q2vvZn5aoo) - This video helped me understand how to implement animation
- [2D Pixel Art Cat Sprites - Elthen](https://elthen.itch.io/2d-pixel-art-cat-sprites) - The sprite sheet I used for the player

## Author

- Linkedin - [Stefan Vosloo](https://www.linkedin.com/in/stefan-vosloo/)
- Twitter - [@saulthebear](https://www.twitter.com/saulthebear)
