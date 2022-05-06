import { Renderer } from "./Renderer.js"
import { Engine } from "./Engine.js"
import { Game } from "./Game.js"

const renderer = new Renderer(document.querySelector("canvas"), 0.83)
const engine = new Engine({ update: update, render: render, fps: 1 })
const game = new Game()

function update() {
  game.update()
}

function render() {
  // Clear the screen
  renderer.fill(game.color)
  renderer.render()
}

function handleResize() {
  renderer.resizeCanvas(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
    game.world.aspectRatio
  )
  renderer.render()
}

window.addEventListener("resize", handleResize)

handleResize()
engine.start()
