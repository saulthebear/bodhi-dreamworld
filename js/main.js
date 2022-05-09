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

function update() {
  if (controller.leftActive) game.world.player.moveLeft()
  if (controller.rightActive) game.world.player.moveRight()
  if (controller.upActive) {
    game.world.player.jump()
    // Don't continually jump if key is held down
    controller.upActive = false
  }
  game.update()
}

function render() {
  // Clear the screen
  renderer.fill(game.world.backgroundColor)

  // Draw the player
  // renderer.drawObject(game.world.player)
  renderer.drawImage(game.world.player.spriteFrame())

  // Draw platforms
  game.world.platforms.forEach((platform) => renderer.drawObject(platform))

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

window.addEventListener("resize", handleResize)
window.addEventListener("keydown", handleInputEvent)
window.addEventListener("keyup", handleInputEvent)

handleResize()
engine.start()
