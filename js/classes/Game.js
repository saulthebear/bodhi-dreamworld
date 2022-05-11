import { Level } from "./Level.js"
import { Player } from "./Player.js"
import { level1String } from "../levels/level1.js"
import { Treat } from "./Treat.js"

export class Game {
  constructor() {
    const blockSize = 6
    const level1 = new Level(level1String, blockSize)
    this.world = new GameWorld(level1, blockSize)
    this.timer = 0
  }

  update(timeStep) {
    this.timer += timeStep
    this.world.update()
    this.gameOver = this.world.gameOver
  }
}

class GameWorld {
  constructor(level, blockSize) {
    this.gameOver = false

    this.width = level.width
    this.height = level.height
    this.platforms = level.platforms
    this.goals = level.goals
    this.treats = level.treats
    this.totalTreats = this.treats.length

    this.bgImage = new Image()
    this.bgImage.src = "../sprites/bg-sky-2.png"

    const playerSize = blockSize * 2
    this.player = new Player(
      level.player.x,
      level.player.y,
      playerSize,
      playerSize
    )

    Treat.collectionCallback = this.#collectTreat.bind(this)

    // Downward velocity added every tick
    this.gravity = 3
    // Multiplier applied to velocity every tick
    this.friction = 0.75
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

    this.treats.forEach((treat) => treat.collide(this.player))

    this.#checkWin()
  }

  #checkWin() {
    const didWin = this.goals.some((goal) => goal.isColliding(this.player))
    if (didWin) {
      this.gameOver = true
    }
  }

  #collectTreat(collectedTreat) {
    this.treats = this.treats.filter((treat) => treat !== collectedTreat)
  }
}
