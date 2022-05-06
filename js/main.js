import { Renderer } from "./Renderer.js"
import { Engine } from "./Engine.js"
import { Game } from "./Game.js"

const renderer = new Renderer(document.querySelector("canvas"), 0.83)
const engine = new Engine({ update: update, render: render, fps: 1 })
const game = new Game()

function update() {
  game.update
}

function render() {
  renderer.clearCanvas(game.color)
  renderer.render()
}

engine.start()
