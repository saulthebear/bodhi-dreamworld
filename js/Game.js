import { Platform } from "./Platform.js"
import { Player } from "./Player.js"
import { level1String } from "./levels.js"

export class Game {
  constructor() {
    const blockSize = 6
    const level1 = new Level(level1String, blockSize)
    this.world = new GameWorld(level1, blockSize)
  }

  update(timeStep) {
    this.world.update()
  }
}

class GameWorld {
  constructor(level, blockSize) {
    this.width = level.width
    this.height = level.height
    this.platforms = level.platforms

    this.backgroundColor = "rgba(0,0,0,1)"

    const playerSize = blockSize * 2
    this.player = new Player(
      level.player.x,
      level.player.y,
      playerSize,
      playerSize
    )

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

    const levelInfoObjects = this.#parseLevelString(rowStrings)

    const platformInfoObjects = levelInfoObjects.filter(
      (o) => o.type === "platform"
    )
    this.#platforms = this.#createPlatforms(platformInfoObjects)

    const playerInfo = levelInfoObjects.filter((o) => o.type === "player")[0]
    this.#player = { x: playerInfo.x, y: playerInfo.y }
  }

  get player() {
    return this.#player
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
    const rowsOfObjects = []
    const objectTypeMap = Object.create(null)

    objectTypeMap["="] = "platform"
    objectTypeMap["p"] = "player"

    const symbols = Object.keys(objectTypeMap)

    for (let i = 1; i < rowStrings.length - 1; i++) {
      const rowString = rowStrings[i]

      // Holds all the start and end indices of objects on this row
      let rowObjects = []

      let currentSymbol = null

      for (let j = 1; j < rowString.length; j++) {
        const block = rowString[j]
        const colIndex = j - 1

        // Object start
        if (!currentSymbol && symbols.includes(block)) {
          currentSymbol = block
          rowObjects.push({ type: objectTypeMap[block], start: colIndex })
        }

        // Object end
        if (currentSymbol && block !== currentSymbol) {
          const lastObject = rowObjects[rowObjects.length - 1]
          lastObject.end = colIndex - 1
          currentSymbol = null
        }
      }
      rowsOfObjects.push(rowObjects)
    }
    const detailedObjects = this.#addDetail(rowsOfObjects)
    return detailedObjects.flat()
  }

  #addDetail(rowsOfObjects) {
    return rowsOfObjects.map((row, rowIndex) => {
      if (row.length === 0) return row

      const y = rowIndex * this.#blockSize
      return row.map((simpleObject) => {
        const x = simpleObject.start * this.#blockSize
        const widthInBlocks = simpleObject.end - simpleObject.start + 1
        const width = widthInBlocks * this.#blockSize

        return {
          type: simpleObject.type,
          x,
          y,
          width,
          height: this.#blockSize,
        }
      })
    })
  }

  #createPlatforms(platformInfoObjects) {
    const collisions = { top: true, right: true, bottom: true, left: true }
    return platformInfoObjects.map(
      (info) =>
        new Platform(info.x, info.y, info.width, info.height, collisions)
    )
  }
}
