import { Renderer } from "./classes/Renderer.js"
import { Engine } from "./classes/Engine.js"
import { Game } from "./classes/Game.js"
import { Controller } from "./classes/Controller.js"

const engine = new Engine({ update, render, fps: 60 })
let game = new Game()
const renderer = new Renderer(
  document.querySelector("canvas"),
  game.world.width,
  game.world.height
)
const controller = new Controller()

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

  // Draw the goal
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

function handleResize() {
  const marginInline = getComputedStyle(document.documentElement)
    .getPropertyValue("--margin-inline")
    .split("px")[0]
  const width = document.documentElement.clientWidth - marginInline
  const height = document.documentElement.clientHeight - marginInline
  // const width = document.documentElement.clientWidth
  // const height = document.documentElement.clientHeight
  renderer.resizeCanvas(width, height, game.world.aspectRatio)
  renderer.render()
}

function handleInputEvent({ type, key }) {
  controller.handleKeyPress(type, key)
}

function updateTimer() {
  // console.log(game.timer)
  const totalSeconds = game.timer
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0")
  const seconds = String(Math.round(totalSeconds - minutes * 60)).padStart(
    2,
    "0"
  )
  const timerString = `${minutes}:${seconds}`
  document.querySelector("#time-number").innerText = timerString
}

function updateTreats() {
  const total = game.world.totalTreats
  const remaining = game.world.treats.length
  const collected = total - remaining
  document.querySelector("#treats-total").innerText = total
  document.querySelector("#treats-collected").innerText = collected
}

function gameOver() {
  console.log("stopping the game")
  engine.stop()
  renderer.fill("rgba(114, 168, 204, 0.5)")
  renderer.write("YOU WIN!")
  renderer.render()
}

// Show / hide help
const helpBtn = document.querySelector("#help-btn")
helpBtn.addEventListener("click", () => {
  const helpSection = document.querySelector(".help")
  helpSection.classList.toggle("hidden")
})

// Restart the game
function restart() {
  game = new Game()
  handleResize()
  engine.start()
}
const restartBtn = document.querySelector("#restart-btn")
restartBtn.addEventListener("click", restart)

window.addEventListener("resize", handleResize)
window.addEventListener("keydown", handleInputEvent)
window.addEventListener("keyup", handleInputEvent)

// Start the game on page load
restart()
