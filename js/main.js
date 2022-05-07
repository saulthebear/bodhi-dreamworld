import { Renderer } from "./Renderer.js"
import { Engine } from "./Engine.js"
import { Game } from "./Game.js"

const engine = new Engine({ update: update, render: render, fps: 1 })
const game = new Game()
const renderer = new Renderer(
  document.querySelector("canvas"),
  game.world.width,
  game.world.height
)

function update() {
  game.update()

  const player = game.world.player
  const randomOption = Math.floor(Math.random() * 3)
  if (randomOption === 0) {
    player.jump()
  } else if (randomOption === 1) {
    player.moveLeft()
  } else {
    player.moveRight()
  }
}

function render() {
  // Clear the screen
  renderer.fill(game.color)
  renderer.drawObject(game.world.player)
  // console.log(game.world.player)
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

window.addEventListener("resize", handleResize)

handleResize()
engine.start()
