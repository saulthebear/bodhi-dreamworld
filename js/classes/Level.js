import { Platform } from "./Platform.js"
import { GoalObject } from "./GoalObject.js"
import { Treat } from "./Treat.js"

/**
 * Responsible for parsing level maps into game objects.
 */
export class Level {
  /**
   * @type {DetailedLevelObject}
   */
  #levelInfoObjects

  /**
   * @type {Platform[]}
   */
  #platforms

  /**
   * @type {Player}
   */
  #player

  /**
   * @type {GoalObject[]}
   */
  #goals

  /**
   * @type {Treat[]}
   */
  #treats

  /**
   * @type {BrushSpawn}
   */
  #brushSpawns

  /**
   * The width of the level in "blocks". The pixel size of these blocks is
   * passed as a constructor to Level
   * @type {number}
   */
  #widthInBlocks
  /**
   * The height of the level in "blocks". The pixel size of these blocks is
   * passed as a constructor to Level
   * @type {number}
   */
  #heightInBlocks

  /**
   * The size in pixels of one block in the level map.
   * @type {number}
   */
  #blockSize

  constructor(levelMap, blockSize) {
    const rowStrings = this.#splitString(levelMap)
    this.#widthInBlocks = rowStrings[0].length - 2
    this.#heightInBlocks = rowStrings.length - 2
    this.#blockSize = blockSize

    this.#levelInfoObjects = this.#parseLevelMap(rowStrings)

    this.#platforms = this.#createPlatforms(this.#infoObjects("platform"))

    const playerInfo = this.#infoObjects("player")[0]
    this.#player = { x: playerInfo.x, y: playerInfo.y }

    this.#goals = []
    const goalInfos = this.#infoObjects("goal")
    goalInfos.forEach((goalInfo) =>
      this.#goals.push(
        new GoalObject(goalInfo.x, goalInfo.y, goalInfo.width, goalInfo.height)
      )
    )

    const treatInfos = this.#infoObjects("treat")
    this.#treats = treatInfos.map(
      (treatInfo) =>
        new Treat(treatInfo.x, treatInfo.y, treatInfo.width, treatInfo.height)
    )

    const brushSpawnInfos = this.#infoObjects("brush-spawn-right")
    this.#brushSpawns = brushSpawnInfos.map((info) => {
      return { spawnX: info.x, spawnY: info.y, direction: "RIGHT" }
    })
  }

  /**
   * The player initialized in their position on the level map
   * @type {Player}
   */
  get player() {
    return this.#player
  }

  /**
   * All level platforms initialized at their positions on the level map
   * @type {Platform[]}
   */
  get platforms() {
    return this.#platforms
  }

  /**
   * All level goal objects initialized at their positions on the level map
   * @type {Goal[]}
   */
  get goals() {
    return this.#goals
  }

  /**
   * All level treats initialized at their positions on the level map
   * @type {Treat[]}
   */
  get treats() {
    return this.#treats
  }

  /**
   * All level brush spawns initialized at their positions on the level map
   * @type {BrushSpawn[]}
   */
  get brushSpawns() {
    return this.#brushSpawns
  }

  /**
   * The width of the map in pixels
   * @type {number}
   */
  get width() {
    return this.#blockSize * this.#widthInBlocks
  }

  /**
   * The height of the map in pixels
   * @type {number}
   */
  get height() {
    return this.#blockSize * this.#heightInBlocks
  }

  /**
   * Splits the full level map string into rows, trimming empty rows
   * @param {string} levelString - The full level map string
   * @returns {string[]} - Each row of the map, as a string
   */
  #splitString(levelString) {
    return levelString.split("\n").filter((row) => row.length > 0)
  }

  /**
   * Parses the level map one row at a time, determining what objects there are,
   * where they are, and how big they are.
   * @param {string[]} rowStrings
   * @returns {DetailedLevelObject}
   */
  #parseLevelMap(rowStrings) {
    const rowsOfObjects = []
    const objectTypeMap = Object.create(null)

    objectTypeMap["="] = "platform"
    objectTypeMap["p"] = "player"
    objectTypeMap["!"] = "goal"
    objectTypeMap["$"] = "treat"
    objectTypeMap[">"] = "brush-spawn-right"

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

  /**
   * Transforms rows of {@link SimpleLevelObject}s into
   * {@link DetailedRowObject}s
   * @param {SimpleLevelObject[][]} rowsOfObjects - Two dimensional array,
   * consisting of rows of SimpleLevelObjects. The row index determines the y
   * coordinate of the objects in that row.
   * @returns {DetailedLevelObject[][]} - Rows of detailed objects
   */
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

  /**
   * Transforms detailed objects of type "platform" into {@link Platform} objects
   * @param {DetailedLevelObject[]} platformInfoObjects - Level objects of type
   * "platform"
   * @returns {Platform[]}
   */
  #createPlatforms(platformInfoObjects) {
    const collisions = { top: true, right: true, bottom: true, left: true }
    return platformInfoObjects.map(
      (info) =>
        new Platform(info.x, info.y, info.width, info.height, collisions)
    )
  }

  /**
   * Filters {@link Level~levelInfoObjects}.
   * Returns objects matching the `type` argument.
   * @param {string} type - type property of a DetailedLevelObject
   * @returns {DetailedLevelObject[]} - Filtered objects
   */
  #infoObjects(type) {
    return this.#levelInfoObjects.filter((o) => o.type === type)
  }
}

/********************
 * TYPE DEFINITIONS *
 ********************/

/**
 * Describes the type and position of an object found in the level map
 * @typedef SimpleLevelObject
 * @property {string} type - identifier for the type of object
 * @property {number} start - The column number in which the object starts
 * @property {number} end - The column number in which the object ends
 */

/**
 * Describes the type and pixel positions and dimensions of an object found
 * in the level map
 * @typedef DetailedLevelObject
 * @property {string} type - identifier for the type of object
 * @property {number} x - the horizontal position of the object in the world
 * @property {number} y - the vertical position of the object in the world
 * @property {number} width - pixel width of the object
 * @property {number} height - pixel height of the object
 */
