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

  // #addPlatform(
  //   x,
  //   y,
  //   width,
  //   height,
  //   collisionDirections = { top: true, right: true, bottom: true, left: true }
  // ) {
  //   this.platforms.push(new Platform(x, y, width, height, collisionDirections))
  // }

  // #constructLevel() {
  // // floor #1
  // this.#addPlatform(0, 208, 160, 8, { top: true })

  // // #2
  // this.#addPlatform(81, 192, 16, 16)

  // // #3 & #4
  // this.#addPlatform(120, 192, 40, 16, { left: true, top: true })
  // this.#addPlatform(136, 176, 24, 16, { left: true, top: true })

  // // #5 & #6
  // this.#addPlatform(56, 160, 56, 8)
  // this.#addPlatform(56, 144, 32, 16)

  // // #7
  // this.#addPlatform(0, 120, 32, 8)

  // // #8
  // this.#addPlatform(56, 104, 32, 8)

  // // #9
  // this.#addPlatform(112, 96, 48, 8)

  // // #10
  // this.#addPlatform(0, 72, 48, 8)

  // // #11
  // this.#addPlatform(56, 72, 16, 8)
  // // #12
  // this.#addPlatform(144, 64, 16, 8)
  // // #13
  // this.#addPlatform(96, 56, 32, 8)
  // // #14
  // this.#addPlatform(72, 32, 24, 8)
  // // #15
  // this.#addPlatform(0, 40, 48, 8)
  // }
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
    // console.log(this.#platforms)
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
    console.log(rowsOfPlatforms)
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
        // console.log(platform)
        // console.log(
        //   `x: ${x} y: ${y} start: ${platformInfo.start} end: ${platformInfo.end}`
        // )
        platforms.push(platform)
      })
    }
    return platforms
  }
}

// const levelObj = new Level(level1, 8)
