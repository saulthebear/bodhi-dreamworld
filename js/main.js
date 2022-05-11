import { Renderer } from "./classes/Renderer.js"
import { Engine } from "./classes/Engine.js"
import { Game } from "./classes/Game.js"
import { Controller } from "./classes/Controller.js"

/*****************
 *   GLOBALS     *
 *****************/

let currentLevel = 1
// Number of levels that exist
let availableLevels = 2

/*
  The engine is responsible for calling the update and render methods
  at fixed time intervals, determined by the fps property
*/
const engine = new Engine({ update, render, fps: 60 })

/*
  The game holds the world which contains all the level's objects
  The game also calls the world's update method, which in turn calls all the
  world objects' update methods.
  Instantiated in the `restart` function
*/
let game

/*
  The renderer is responsible for drawing to the canvas.
  It contains utility functions to draw shapes or images to the canvas
  These functions actually draw to a buffer canvas, and this buffer is only
  drawn to the on-screen canvas when the renderer's `render` method is called
  Instantiated in the `restart` function
*/
let renderer

/*
  The controller is responsible for handling user input.
  It sets properties like 'upActive' which can then be used to
  call game functions here in main.js
*/
const controller = new Controller()

const restartBtn = document.querySelector("#restart-btn")
const helpBtn = document.querySelector("#help-btn")
const prevLevelBtn = document.querySelector("#prev-level")
const nextLevelBtn = document.querySelector("#next-level")

/******************************************************************************/

/*****************
 *    Callbacks   *
 *****************/

/*
  This is the highest level update function and is the one called by the
  engine every frame. This function is responsible for calling game functions
  based on user input, and then calling the game's main update function.
  Here non-game related update functions are also called, such as updating
  the DOM to reflect the time passed, how many treats have been collected,
  and informing the user when the level has been completed.
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

/*
  This is the render function called by the engine on every frame.
  It is responsible for clearing the screen and drawing all the game objects by
  calling relevant methods in the Renderer
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
  renderer.drawImage(game.world.player.spriteFrame())

  // Output on screen
  renderer.render()
}

/*
  This function is called on page load and then on every window resize event.
  It is responsible for resizing the canvas, so that if fits in the window
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

/* Passes user input events on to the controller object */
function handleInputEvent({ type, key }) {
  controller.handleKeyPress(type, key)
}

/* Updates DOM timer */
function updateTimer() {
  const totalSeconds = game.timer
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0")
  const seconds = String(Math.round(totalSeconds - minutes * 60)).padStart(
    2,
    "0"
  )
  const timerString = `${minutes}:${seconds}`
  const timerElements = document.querySelectorAll("#time-number")
  timerElements.forEach((timer) => (timer.innerText = timerString))
}

/* Updates treats collected display in the DOM */
function updateTreats() {
  const total = game.world.totalTreats
  const remaining = game.world.treats.length
  const collected = total - remaining

  const totalTreatsElements = document.querySelectorAll("#treats-total")
  totalTreatsElements.forEach((ele) => (ele.innerText = total))

  const collectedTreatsElements = document.querySelectorAll("#treats-collected")
  collectedTreatsElements.forEach((ele) => (ele.innerText = collected))
}

// Sets the current level and starts the game at that level
function setLevel(levelNumber) {
  currentLevel = levelNumber
  const levelIndicator = document.querySelector("#level-number")
  levelIndicator.innerText = levelNumber

  setupLevelButtons()
  restart()
}

// Next level - callback for next level button
function incrementLevel() {
  if (currentLevel < availableLevels) setLevel(currentLevel + 1)
}

// Prev level - callback for prev level button
function decrementLevel() {
  if (currentLevel > 1) setLevel(currentLevel - 1)
}

/*
  Sets the disabled property of level select buttons
  based on the current level and number of available levels
*/
function setupLevelButtons() {
  prevLevelBtn.disabled = currentLevel === 1
  nextLevelBtn.disabled = currentLevel === availableLevels
}

/*
  Called once the level has been completed.
  Responsible for stopping the game engine (which stops rendering and stops the
  game timer) and showing the user a message in the DOM informing them that the
  level has been completed.
*/
function gameOver() {
  engine.stop()

  // Show level complete message
  const levelCompleteMessage = document.querySelector("#level-complete")
  levelCompleteMessage.classList.remove("hidden")
}

// Show / hide help - callback for help button click
function helpToggle() {
  const helpSection = document.querySelector(".help")
  helpSection.classList.toggle("hidden")
}

// Start / Restart the game - callback for restart button click
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

  // Resize the canvas to have correct aspect ratio and fit in the window
  handleResize()

  engine.start()
}

/******************************************************************************/

/*****************
 *     EVENT      *
 *   LISTENERS    *
 *****************/

prevLevelBtn.addEventListener("click", decrementLevel)
nextLevelBtn.addEventListener("click", incrementLevel)
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
