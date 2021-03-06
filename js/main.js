import { Renderer } from "./classes/Renderer.js"
import { Engine } from "./classes/Engine.js"
import { Game } from "./classes/Game.js"
import { Controller } from "./classes/Controller.js"

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
let currentLevel = 1

/**
 * The number of game levels that exist.
 * Derived from the {@link Game} class
 */
let availableLevels = Game.levels.length

/**
 * The number of levels that the user has unlocked.
 * Unlocking the next level requires getting all the treats in the previous
 * level. This information is saved in localStorage.
 * The first level is unlocked by default.
 * @type {number}
 */
let unlockedLevels = 1

/**
 * @type {Engine}
 */
const engine = new Engine({ update, render, fps: 60 })

/**
 * The game holds the world which contains all the level's objects.
 * The game also calls the world's `update` method, which in turn calls all the
 * world objects' `update` methods.
 * Instantiated in the {@link restart} function.
 * @type {Game}
 */
let game

/**
 * The renderer is responsible for drawing to the canvas.
 *
 * It contains utility functions to draw shapes or images to the canvas.
 * These functions actually draw to a buffer canvas, and this buffer is only
 * drawn to the on-screen canvas when the renderer's `render` method is called.
 * Instantiated in the {@link restart} function.
 * @type {Renderer}
 */
let renderer

/**
 * The controller is responsible for handling user input.
 * It sets properties like `upActive` which can then be used to
 * call game functions here in `main.js`.
 * @type {Controller}
 */
const controller = new Controller()

/**
 * Delete Button.
 * Deletes data from local-storage, resetting unlocked levels and high scores.
 * @see deleteSavedData
 * @type {HTMLElement}
 */
const deleteDataBtn = document.querySelector("#delete-data-btn")

/**
 * Restart Button.
 * Restarts the current level.
 * @see restart
 * @type {HTMLElement}
 */
const restartBtn = document.querySelector("#restart-btn")

/**
 * Help Button.
 * Shows instructions for the game.
 * @see helpToggle
 * @type {HTMLElement}
 */
const helpBtn = document.querySelector("#help-btn")

/**
 * Previous Level Button.
 * Disabled if the current level is #1.
 * @see decrementLevel
 * @type {HTMLElement}
 */
const prevLevelBtn = document.querySelector("#prev-level")

/**
 * Next Level Button.
 * Disabled if there is no next level,
 * or the user hasn't unlocked the next level.
 * @see incrementLevel
 * @type {HTMLElement}
 */
const nextLevelBtn = document.querySelector("#next-level")

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
    requestAnimationFrame(gameOver)
    return
  }
  if (controller.leftActive) game.world.player.moveLeft()
  if (controller.rightActive) game.world.player.moveRight()
  if (controller.upActive) {
    game.world.player.jump()
    // Don't continually jump if key is held down
    controller.upActive = false
  }
  updateTimer()
  updateTreats()
  game.update(timeStep)
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
    dHeight: game.world.height,
  })

  // Draw platforms
  game.world.platforms.forEach((platform) =>
    renderer.drawImage(platform.imageInfo)
  )

  // Draw treats
  game.world.treats.forEach((treat) => {
    renderer.drawImage(treat.imageInfo)
  })

  // Draw the level end goal
  game.world.goals.forEach((goal) => {
    renderer.drawImage(goal.imageInfo)
  })

  // Draw projectile brushes
  game.world.brushes.forEach((brush) => renderer.drawImage(brush.imageInfo))

  // Draw the player
  renderer.drawImage(game.world.player.imageInfo)

  // Output on screen
  renderer.render()
}

/**
 * This function is called on page load and then on every window resize event.
 * It is responsible for resizing the canvas, so that if fits in the window
 */
function handleResize() {
  const marginInline = getComputedStyle(document.documentElement)
    .getPropertyValue("--margin-inline")
    .split("px")[0]
  const width = document.documentElement.clientWidth - marginInline
  const height = document.documentElement.clientHeight - marginInline
  renderer.resizeCanvas(width, height, game.world.aspectRatio)
  renderer.render()
}

/**
 * Key press event callback.
 * passes user input events on to the {@link controller}
 * @param {{type: string, key: string}} event
 */
function handleInputEvent({ type, key }) {
  controller.handleKeyPress(type, key)
}

/**
 * Converts seconds to a string of minutes and seconds in the form `MM:SS`
 * @param {number} totalSeconds - Time in seconds
 * @returns {string} - Formatted time string
 */
function secondsToTimerString(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0")
  const seconds = String(Math.round(totalSeconds - minutes * 60)).padStart(
    2,
    "0"
  )
  const timerString = `${minutes}:${seconds}`
  return timerString
}

/**
 * Updates the DOM to display how much time has elapsed since starting the level
 */
function updateTimer() {
  const totalSeconds = game.timer
  const timerString = secondsToTimerString(totalSeconds)
  const timerElements = document.querySelectorAll("#time-number")
  timerElements.forEach((timer) => (timer.innerText = timerString))
}

/**
 * Calculates the total number of treats in the level and how many have been
 * collected, and then updates the DOM to display this to the user.
 */
function updateTreats() {
  const total = game.world.totalTreats
  const remaining = game.world.treats.length
  const collected = total - remaining

  const totalTreatsElements = document.querySelectorAll("#treats-total")
  totalTreatsElements.forEach((ele) => (ele.innerText = total))

  const collectedTreatsElements = document.querySelectorAll("#treats-collected")
  collectedTreatsElements.forEach((ele) => (ele.innerText = collected))
}

/**
 * Sets the {@link currentLevel} and starts the game at that level.
 * Calls {@link setupLevelButtons} to enable/disable the appropriate buttons.
 * @param {number} levelNumber - The level number to switch to
 */
function setLevel(levelNumber) {
  currentLevel = levelNumber
  const levelIndicator = document.querySelector("#level-number")
  levelIndicator.innerText = levelNumber

  setupLevelButtons()
  restart()
}

/**
 * Go to the next level.
 * Does nothing if there is no next level, or it hasn't been unlocked.
 * Callback for clicking the next level button.
 */
function incrementLevel() {
  if (currentLevel < unlockedLevels) setLevel(currentLevel + 1)
}

/**
 * Go to the previous level.
 * Does nothing if there is no previous level (ie. current level is 1).
 * Callback for clicking the previous level button.
 */
function decrementLevel() {
  if (currentLevel > 1) setLevel(currentLevel - 1)
}

/**
  Set the disabled property of level select buttons
  based on the current level and number of available levels.
*/
function setupLevelButtons() {
  prevLevelBtn.disabled = currentLevel === 1
  nextLevelBtn.disabled = currentLevel === unlockedLevels
}

/**
 * Called once the level has been completed.
 * Responsible for stopping the game {@link engine} (which stops rendering
 * and stops the game timer) and showing the user a message in the DOM informing
 * them that the level has been completed.
 */
function gameOver() {
  engine.stop()

  // Show level complete message
  const levelCompleteMessage = document.querySelector("#level-complete")
  levelCompleteMessage.classList.remove("hidden")

  const treatsRemaining = game.world.treats.length
  const isLevelCompleted = treatsRemaining === 0
  const levelTime = game.timer

  initializeLocalData()
  saveLevelData(currentLevel, levelTime, isLevelCompleted)
  updateUnlockedLevels()
  showPersonalBest()
}

/**
 * Show / hide game instructions and help.
 * Callback for clicking the help button.
 */
function helpToggle() {
  const helpSection = document.querySelector(".help")
  helpSection.classList.toggle("hidden")
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
  const levelCompleteMessage = document.querySelector("#level-complete")
  levelCompleteMessage.classList.add("hidden")

  // Instantiate the game with current level
  game = new Game({ level: currentLevel })

  // Instantiate renderer with current level's size
  renderer = new Renderer(
    document.querySelector("canvas"),
    game.world.width,
    game.world.height
  )

  setupLevelButtons()
  updateUnlockedLevels()
  showPersonalBest()

  // Resize the canvas to have correct aspect ratio and fit in the window
  handleResize()

  engine.start()
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
  let levelData = {}

  for (let i = 1; i <= availableLevels; i++) {
    levelData[i] = {
      unlocked: i === 1, // Level 1 is the only one unlocked
      bestTime: Infinity,
    }
  }

  // Overwrite levelData with values from local storage
  // Ensures local storage has a value for each level, even if new ones have
  // been added since last saved
  let savedData = localStorage.getItem("levelData")
  if (savedData) {
    savedData = JSON.parse(savedData)
    levelData = { ...levelData, ...savedData }
  }

  localStorage.setItem("levelData", JSON.stringify(levelData))
  return levelData
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
  time = Math.round(time)

  let prevBestTime = Infinity

  let allLevelData = localStorage.getItem("levelData")
  allLevelData = JSON.parse(allLevelData)
  prevBestTime = allLevelData[levelNumber].bestTime || Infinity

  const bestTime = time < prevBestTime ? time : prevBestTime

  const currLevelData = { unlocked: true, bestTime }

  // Unlock next level if current level has been completed
  if (isLevelCompleted) {
    const nextLevelData = allLevelData[levelNumber + 1]
    if (nextLevelData) {
      nextLevelData.unlocked = true
      allLevelData[levelNumber + 1] = nextLevelData
    }
  }

  allLevelData[levelNumber] = currLevelData

  allLevelData = JSON.stringify(allLevelData)

  localStorage.setItem("levelData", allLevelData)
}

/**
 * Delete saved level data from local storage.
 * Set the {@link currentLevel} to 1, since later levels are no longer unlocked.
 */
function deleteSavedData() {
  localStorage.removeItem("levelData")
  setLevel(1)
}

/**
 * Set {@link unlockedLevels} by checking local storage and finding the highest
 * level that is unlocked.
 */
function updateUnlockedLevels() {
  // Ensure local data exists
  const levelData = initializeLocalData()

  // Find the highest unlocked level
  let hightestUnlocked = 1
  for (const level in levelData) {
    if (level > hightestUnlocked && levelData[level].unlocked)
      hightestUnlocked = +level
  }

  unlockedLevels = hightestUnlocked

  // Show the user how many levels have been unlocked
  const display = document.querySelector("#unlocked-levels-display")
  display.innerText = `${unlockedLevels} / ${availableLevels} unlocked`

  // Allow user to go to next level if unlocked
  setupLevelButtons()
}

/**
 * Update the DOM to show the best time for the current level as saved in local
 * storage.
 */
function showPersonalBest() {
  const levelData = initializeLocalData()

  const bestTime = levelData[currentLevel].bestTime
  const bestTimeString = secondsToTimerString(bestTime)
  const bestTimeDisplay = document.querySelector("#pb-time-number")
  bestTimeDisplay.innerText = bestTimeString
}

/******************************************************************************/

/*****************
 *     EVENT      *
 *   LISTENERS    *
 *****************/

prevLevelBtn.addEventListener("click", decrementLevel)
nextLevelBtn.addEventListener("click", incrementLevel)
deleteDataBtn.addEventListener("click", deleteSavedData)
restartBtn.addEventListener("click", restart)
helpBtn.addEventListener("click", helpToggle)

window.addEventListener("resize", handleResize)
window.addEventListener("keydown", handleInputEvent)
window.addEventListener("keyup", handleInputEvent)

/******************************************************************************/

/*****************
 *     START      *
 *   EXECUTION    *
 *****************/

setLevel(1)

/******************************************************************************/
