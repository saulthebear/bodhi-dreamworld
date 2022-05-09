import { Platform } from "./Platform.js"
import { Player } from "./Player.js"
import { level1String } from "./levels.js"

export class Game {
  constructor() {
    const blockSize = 8
    const level1 = new Level(level1String, blockSize)
    this.world = new GameWorld(level1)
  }

  update(timeStep) {
    this.world.update()
  }
}

class GameWorld {
  constructor(level) {
    this.width = level.width
    this.height = level.height
    this.platforms = level.platforms

    this.backgroundColor = "black"

    this.player = new Player(0, 168)

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
  }
}

class Level {
  #platforms
  #player
  #widthInBlocks
  #heightInBlocks
  #blockSize

  constructor(levelString, blockSize) {
    const rowStrings = this.#splitString(levelString)
    this.#widthInBlocks = rowStrings[0].length - 2
    this.#heightInBlocks = rowStrings.length - 2
    this.#blockSize = blockSize

    this.#platforms = this.#createPlatforms(this.#parseLevelString(rowStrings))
  }

  get platforms() {
    return this.#platforms
  }

  get width() {
    return this.#blockSize * this.#widthInBlocks
  }

  get height() {
    return this.#blockSize * this.#heightInBlocks
  }

  // Splits the string into rows and trims empty rows
  #splitString(levelString) {
    return levelString.split("\n").filter((row) => row.length > 0)
  }

  #parseLevelString(rowStrings) {
    const rowsOfPlatforms = []

    for (let i = 1; i < rowStrings.length - 1; i++) {
      const rowString = rowStrings[i]

      // Holds all the start and end indices of platforms on this row
      let rowPlatforms = []

      let platformStarted = false

      for (let j = 1; j < rowString.length; j++) {
        const block = rowString[j]
        const colIndex = j - 1

        // Platform start
        if (!platformStarted && block === "=") {
          platformStarted = true
          rowPlatforms.push({ start: colIndex })
        }

        // Platform end
        if (platformStarted && block !== "=") {
          const lastPlatform = rowPlatforms[rowPlatforms.length - 1]
          lastPlatform.end = colIndex - 1
          platformStarted = false
        }
      }
      rowsOfPlatforms.push(rowPlatforms)
    }
    return rowsOfPlatforms
  }

  #createPlatforms(rowsOfPlatforms) {
    const platforms = []
    const collisions = { top: true, right: true, bottom: true, left: true }

    for (let i = 0; i < rowsOfPlatforms.length; i++) {
      const row = rowsOfPlatforms[i]
      if (row.length === 0) continue

      const y = i * this.#blockSize
      row.forEach((platformInfo) => {
        const x = platformInfo.start * this.#blockSize
        const widthInBlocks = platformInfo.end - platformInfo.start + 1
        const width = widthInBlocks * this.#blockSize
        const platform = new Platform(x, y, width, this.#blockSize, collisions)
        platforms.push(platform)
      })
    }
    return platforms
  }
}
