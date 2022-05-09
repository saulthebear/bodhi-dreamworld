import { Platform } from "./Platform.js"
import { Player } from "./Player.js"

export class Game {
  constructor() {
    this.world = new GameWorld(250, 300)
  }

  update(timeStep) {
    this.world.update()
  }
}

class GameWorld {
  constructor() {
    this.width = 160
    this.height = 192

    this.backgroundColor = "black"

    this.player = new Player(16, 32)

    // Downward velocity added every tick
    this.gravity = 3
    // Multiplier applied to velocity every tick
    this.friction = 0.75

    this.platforms = []
    this.#constructLevel()
  }

  get aspectRatio() {
    return this.width / this.height
  }

  collideWithWorldEdge(object) {
    const objectLeft = object.x
    const objectRight = object.x + object.width
    const objectTop = object.y
    const objectBottom = object.y + object.height

    if (objectLeft < 0) {
      // Object beyond left of world
      // Place object against left of world and stop its leftward velocity
      object.x = 0
      object.xVelocity = 0
    } else if (objectRight > this.width) {
      // Object beyond right of world
      // Place object against right of world and stop its rightward velocity
      object.x = this.width - object.width
      object.xVelocity = 0
    }

    if (objectTop < 0) {
      // Object beyond top of world
      // Place object against top of world and stop its upwards velocity
      object.y = 0
      object.yVelocity = 0
    } else if (objectBottom > this.height) {
      // Object beyond bottom of world
      // Place object on bottom of world and stop its downwards velocity
      object.y = this.height - object.height
      object.yVelocity = 0
      object.stopJump()
    }
  }

  update() {
    this.player.yVelocity += this.gravity

    this.player.update()

    this.player.xVelocity *= this.friction
    this.player.yVelocity *= this.friction

    this.collideWithWorldEdge(this.player)

    this.platforms.forEach((platform) => platform.applyColliders(this.player))
  }

  #addPlatform(
    x,
    y,
    width,
    height,
    collisionDirections = { top: true, right: true, bottom: true, left: true }
  ) {
    this.platforms.push(new Platform(x, y, width, height, collisionDirections))
  }

  #constructLevel() {
    // floor
    this.#addPlatform(0, 180, 160, 8, { top: true })

    this.#addPlatform(81, 168, 16, 16)

    this.#addPlatform(120, 168, 40, 16, { left: true, top: true })
    this.#addPlatform(136, 152, 24, 16, { left: true, top: true })

    this.#addPlatform(56, 136, 56, 8)
    this.#addPlatform(0, 88, 32, 8)

    this.#addPlatform(56, 120, 32, 16)
  }
}
