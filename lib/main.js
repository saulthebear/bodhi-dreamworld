function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Renderer } from "./classes/Renderer.js";
import { Engine } from "./classes/Engine.js";
import { Game } from "./classes/Game.js";
import { Controller } from "./classes/Controller.js";
/**
 * @file `main.js` is the JavaScript entry point for this game
 * @author Stefan Vosloo
 * @see <a href="https://saulthebear.github.io/bodhi-dreamworld/">Play the game!</a>
 */

/*****************
 *   GLOBALS     *
 *****************/

/**
 * The current game level.
 * @see setLevel
 * @type {number}
 */

var currentLevel = 1;
/**
 * The number of game levels that exist.
 * Derived from the {@link Game} class
 */

var availableLevels = Game.levels.length;
/**
 * The number of levels that the user has unlocked.
 * Unlocking the next level requires getting all the treats in the previous
 * level. This information is saved in localStorage.
 * The first level is unlocked by default.
 * @type {number}
 */

var unlockedLevels = 1;
/**
 * @type {Engine}
 */

var engine = new Engine({
  update: update,
  render: render,
  fps: 60
});
/**
 * The game holds the world which contains all the level's objects.
 * The game also calls the world's `update` method, which in turn calls all the
 * world objects' `update` methods.
 * Instantiated in the {@link restart} function.
 * @type {Game}
 */

var game;
/**
 * The renderer is responsible for drawing to the canvas.
 *
 * It contains utility functions to draw shapes or images to the canvas.
 * These functions actually draw to a buffer canvas, and this buffer is only
 * drawn to the on-screen canvas when the renderer's `render` method is called.
 * Instantiated in the {@link restart} function.
 * @type {Renderer}
 */

var renderer;
/**
 * The controller is responsible for handling user input.
 * It sets properties like `upActive` which can then be used to
 * call game functions here in `main.js`.
 * @type {Controller}
 */

var controller = new Controller();
/**
 * Delete Button.
 * Deletes data from local-storage, resetting unlocked levels and high scores.
 * @see deleteSavedData
 * @type {HTMLElement}
 */

var deleteDataBtn = document.querySelector("#delete-data-btn");
/**
 * Restart Button.
 * Restarts the current level.
 * @see restart
 * @type {HTMLElement}
 */

var restartBtn = document.querySelector("#restart-btn");
/**
 * Help Button.
 * Shows instructions for the game.
 * @see helpToggle
 * @type {HTMLElement}
 */

var helpBtn = document.querySelector("#help-btn");
/**
 * Previous Level Button.
 * Disabled if the current level is #1.
 * @see decrementLevel
 * @type {HTMLElement}
 */

var prevLevelBtn = document.querySelector("#prev-level");
/**
 * Next Level Button.
 * Disabled if there is no next level,
 * or the user hasn't unlocked the next level.
 * @see incrementLevel
 * @type {HTMLElement}
 */

var nextLevelBtn = document.querySelector("#next-level");
/******************************************************************************/

/*****************
 *    Callbacks   *
 *****************/

/**
 * This is the highest level update function and is the one called by the
  `engine` every frame. This function is responsible for calling game functions
  based on user input, and then calling the `game`'s main `update` function.
  Here non-game related update functions are also called, such as updating
  the DOM to reflect the time passed, how many treats have been collected,
  and informing the user when the level has been completed.
 * @param {number} timeStep - In seconds - The amount of time that passes between
  calls to this function. Derived from the `engine`'s `fps` property
 * @returns {void}
 */

function update(timeStep) {
  if (game.gameOver) {
    // Need to request an animation frame to ensure
    // game over renders after all other drawings
    requestAnimationFrame(gameOver);
    return;
  }

  if (controller.leftActive) game.world.player.moveLeft();
  if (controller.rightActive) game.world.player.moveRight();

  if (controller.upActive) {
    game.world.player.jump(); // Don't continually jump if key is held down

    controller.upActive = false;
  }

  updateTimer();
  updateTreats();
  game.update(timeStep);
}
/**
 * This is the `render` function called by the `engine` on every frame.
 * It is responsible for clearing the screen and drawing all the game objects by
 * calling relevant methods in the {@link renderer}
 */


function render() {
  // Clear the screen
  renderer.drawImage({
    image: game.world.bgImage,
    sx: 0,
    sy: 0,
    sWidth: 144,
    sHeight: 198,
    dx: 0,
    dy: 0,
    dWidth: game.world.width,
    dHeight: game.world.height
  }); // Draw platforms

  game.world.platforms.forEach(function (platform) {
    return renderer.drawImage(platform.imageInfo);
  }); // Draw treats

  game.world.treats.forEach(function (treat) {
    renderer.drawImage(treat.imageInfo);
  }); // Draw the level end goal

  game.world.goals.forEach(function (goal) {
    renderer.drawImage(goal.imageInfo);
  }); // Draw projectile brushes

  game.world.brushes.forEach(function (brush) {
    return renderer.drawImage(brush.imageInfo);
  }); // Draw the player

  renderer.drawImage(game.world.player.imageInfo); // Output on screen

  renderer.render();
}
/**
 * This function is called on page load and then on every window resize event.
 * It is responsible for resizing the canvas, so that if fits in the window
 */


function handleResize() {
  var marginInline = getComputedStyle(document.documentElement).getPropertyValue("--margin-inline").split("px")[0];
  var width = document.documentElement.clientWidth - marginInline;
  var height = document.documentElement.clientHeight - marginInline;
  renderer.resizeCanvas(width, height, game.world.aspectRatio);
  renderer.render();
}
/**
 * Key press event callback.
 * passes user input events on to the {@link controller}
 * @param {{type: string, key: string}} event
 */


function handleInputEvent(_ref) {
  var type = _ref.type,
      key = _ref.key;
  controller.handleKeyPress(type, key);
}
/**
 * Converts seconds to a string of minutes and seconds in the form `MM:SS`
 * @param {number} totalSeconds - Time in seconds
 * @returns {string} - Formatted time string
 */


function secondsToTimerString(totalSeconds) {
  var minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  var seconds = String(Math.round(totalSeconds - minutes * 60)).padStart(2, "0");
  var timerString = "".concat(minutes, ":").concat(seconds);
  return timerString;
}
/**
 * Updates the DOM to display how much time has elapsed since starting the level
 */


function updateTimer() {
  var totalSeconds = game.timer;
  var timerString = secondsToTimerString(totalSeconds);
  var timerElements = document.querySelectorAll("#time-number");
  timerElements.forEach(function (timer) {
    return timer.innerText = timerString;
  });
}
/**
 * Calculates the total number of treats in the level and how many have been
 * collected, and then updates the DOM to display this to the user.
 */


function updateTreats() {
  var total = game.world.totalTreats;
  var remaining = game.world.treats.length;
  var collected = total - remaining;
  var totalTreatsElements = document.querySelectorAll("#treats-total");
  totalTreatsElements.forEach(function (ele) {
    return ele.innerText = total;
  });
  var collectedTreatsElements = document.querySelectorAll("#treats-collected");
  collectedTreatsElements.forEach(function (ele) {
    return ele.innerText = collected;
  });
}
/**
 * Sets the {@link currentLevel} and starts the game at that level.
 * Calls {@link setupLevelButtons} to enable/disable the appropriate buttons.
 * @param {number} levelNumber - The level number to switch to
 */


function setLevel(levelNumber) {
  currentLevel = levelNumber;
  var levelIndicator = document.querySelector("#level-number");
  levelIndicator.innerText = levelNumber;
  setupLevelButtons();
  restart();
}
/**
 * Go to the next level.
 * Does nothing if there is no next level, or it hasn't been unlocked.
 * Callback for clicking the next level button.
 */


function incrementLevel() {
  if (currentLevel < unlockedLevels) setLevel(currentLevel + 1);
}
/**
 * Go to the previous level.
 * Does nothing if there is no previous level (ie. current level is 1).
 * Callback for clicking the previous level button.
 */


function decrementLevel() {
  if (currentLevel > 1) setLevel(currentLevel - 1);
}
/**
  Set the disabled property of level select buttons
  based on the current level and number of available levels.
*/


function setupLevelButtons() {
  prevLevelBtn.disabled = currentLevel === 1;
  nextLevelBtn.disabled = currentLevel === unlockedLevels;
}
/**
 * Called once the level has been completed.
 * Responsible for stopping the game {@link engine} (which stops rendering
 * and stops the game timer) and showing the user a message in the DOM informing
 * them that the level has been completed.
 */


function gameOver() {
  engine.stop(); // Show level complete message

  var levelCompleteMessage = document.querySelector("#level-complete");
  levelCompleteMessage.classList.remove("hidden");
  var treatsRemaining = game.world.treats.length;
  var isLevelCompleted = treatsRemaining === 0;
  var levelTime = game.timer;
  initializeLocalData();
  saveLevelData(currentLevel, levelTime, isLevelCompleted);
  updateUnlockedLevels();
  showPersonalBest();
}
/**
 * Show / hide game instructions and help.
 * Callback for clicking the help button.
 */


function helpToggle() {
  var helpSection = document.querySelector(".help");
  helpSection.classList.toggle("hidden");
}
/**
 * Start / Restart the game at the current level.
 *
 * Callback for clicking the restart button.
 * Hides the "level complete" message.
 * Initializes the {@link game} and {@link renderer}, then starts the
 * {@link engine}.
 * Updates the DOM - (unlocked levels, personal best, resizes the canvas)
 */


function restart() {
  // Hide level complete message
  var levelCompleteMessage = document.querySelector("#level-complete");
  levelCompleteMessage.classList.add("hidden"); // Instantiate the game with current level

  game = new Game({
    level: currentLevel
  }); // Instantiate renderer with current level's size

  renderer = new Renderer(document.querySelector("canvas"), game.world.width, game.world.height);
  setupLevelButtons();
  updateUnlockedLevels();
  showPersonalBest(); // Resize the canvas to have correct aspect ratio and fit in the window

  handleResize();
  engine.start();
}
/**
 * User data about a particular level
 * @typedef {Object} SaveData
 * @property {boolean} unlocked - Is the level unlocked?
 * @property {number|null} bestTime - Best level time in seconds.
 */

/**
 * Initializes local storage with SaveData for each level that exists. If data
 * already exists for a particular level, it is kept.
 * @returns {Array<SaveData>} - An ordered array of {@link SaveData} objects,
 * one per level.
 */


function initializeLocalData() {
  var levelData = {};

  for (var i = 1; i <= availableLevels; i++) {
    levelData[i] = {
      unlocked: i === 1,
      // Level 1 is the only one unlocked
      bestTime: Infinity
    };
  } // Overwrite levelData with values from local storage
  // Ensures local storage has a value for each level, even if new ones have
  // been added since last saved


  var savedData = localStorage.getItem("levelData");

  if (savedData) {
    savedData = JSON.parse(savedData);
    levelData = _objectSpread(_objectSpread({}, levelData), savedData);
  }

  localStorage.setItem("levelData", JSON.stringify(levelData));
  return levelData;
}
/**
 * Save data about a particular level to local storage,
 * in the form of {@link SaveData}.
 *
 * If the `time` is better than the saved `bestTime` the new time is stored.
 * If this level was completed, the next level's `unlocked` property is set to
 * `true`.
 * @param {number} levelNumber
 * @param {number} time - Seconds it took to complete the level
 * @param {boolean} isLevelCompleted - Did the user collect all the treats?
 * Required for unlocking the next level.
 */


function saveLevelData(levelNumber, time, isLevelCompleted) {
  time = Math.round(time);
  var prevBestTime = Infinity;
  var allLevelData = localStorage.getItem("levelData");
  allLevelData = JSON.parse(allLevelData);
  prevBestTime = allLevelData[levelNumber].bestTime || Infinity;
  var bestTime = time < prevBestTime ? time : prevBestTime;
  var currLevelData = {
    unlocked: true,
    bestTime: bestTime
  }; // Unlock next level if current level has been completed

  if (isLevelCompleted) {
    var nextLevelData = allLevelData[levelNumber + 1];

    if (nextLevelData) {
      nextLevelData.unlocked = true;
      allLevelData[levelNumber + 1] = nextLevelData;
    }
  }

  allLevelData[levelNumber] = currLevelData;
  allLevelData = JSON.stringify(allLevelData);
  localStorage.setItem("levelData", allLevelData);
}
/**
 * Delete saved level data from local storage.
 * Set the {@link currentLevel} to 1, since later levels are no longer unlocked.
 */


function deleteSavedData() {
  localStorage.removeItem("levelData");
  setLevel(1);
}
/**
 * Set {@link unlockedLevels} by checking local storage and finding the highest
 * level that is unlocked.
 */


function updateUnlockedLevels() {
  // Ensure local data exists
  var levelData = initializeLocalData(); // Find the highest unlocked level

  var hightestUnlocked = 1;

  for (var level in levelData) {
    if (level > hightestUnlocked && levelData[level].unlocked) hightestUnlocked = +level;
  }

  unlockedLevels = hightestUnlocked; // Show the user how many levels have been unlocked

  var display = document.querySelector("#unlocked-levels-display");
  display.innerText = "".concat(unlockedLevels, " / ").concat(availableLevels, " unlocked"); // Allow user to go to next level if unlocked

  setupLevelButtons();
}
/**
 * Update the DOM to show the best time for the current level as saved in local
 * storage.
 */


function showPersonalBest() {
  var levelData = initializeLocalData();
  var bestTime = levelData[currentLevel].bestTime;
  var bestTimeString = secondsToTimerString(bestTime);
  var bestTimeDisplay = document.querySelector("#pb-time-number");
  bestTimeDisplay.innerText = bestTimeString;
}
/******************************************************************************/

/*****************
 *     EVENT      *
 *   LISTENERS    *
 *****************/


prevLevelBtn.addEventListener("click", decrementLevel);
nextLevelBtn.addEventListener("click", incrementLevel);
deleteDataBtn.addEventListener("click", deleteSavedData);
restartBtn.addEventListener("click", restart);
helpBtn.addEventListener("click", helpToggle);
window.addEventListener("resize", handleResize);
window.addEventListener("keydown", handleInputEvent);
window.addEventListener("keyup", handleInputEvent);
/******************************************************************************/

/*****************
 *     START      *
 *   EXECUTION    *
 *****************/

setLevel(1);
/******************************************************************************/