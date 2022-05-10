import { Renderer } from "./Renderer.js"
import { Engine } from "./Engine.js"
import { Game } from "./Game.js"
import { Controller } from "./Controller.js"

const engine = new Engine({ update: update, render: render, fps: 60 })
const game = new Game()
const renderer = new Renderer(
  document.querySelector("canvas"),
  game.world.width,
  game.world.height
)
const controller = new Controller()

function update(timeStep) {
  if (game.gameOver) {
    gameOver()
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

  // Draw the goal
  game.world.goals.forEach((goal) => {
    renderer.drawObject(goal)
  })

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

function gameOver() {
  engine.stop()
  console.log("Game Over!")
}

// Show / hide help
const helpBtn = document.querySelector("#help-btn")
helpBtn.addEventListener("click", () => {
  const helpSection = document.querySelector(".help")
  helpSection.classList.toggle("hidden")
})

window.addEventListener("resize", handleResize)
window.addEventListener("keydown", handleInputEvent)
window.addEventListener("keyup", handleInputEvent)

handleResize()
engine.start()
