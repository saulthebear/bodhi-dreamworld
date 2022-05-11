import { Platform } from "./Platform.js"
import { GoalObject } from "./GoalObject.js"
import { Treat } from "./Treat.js"

export class Level {
  #levelInfoObjects
  #platforms
  #player
  #treats
  #widthInBlocks
  #heightInBlocks
  #blockSize

  constructor(levelString, blockSize) {
    const rowStrings = this.#splitString(levelString)
    this.#widthInBlocks = rowStrings[0].length - 2
    this.#heightInBlocks = rowStrings.length - 2
    this.#blockSize = blockSize

    this.#levelInfoObjects = this.#parseLevelString(rowStrings)

    this.#platforms = this.#createPlatforms(this.#infoObjects("platform"))

    const playerInfo = this.#infoObjects("player")[0]
    this.#player = { x: playerInfo.x, y: playerInfo.y }

    this.goals = []
    const goalInfos = this.#infoObjects("goal")
    goalInfos.forEach((goalInfo) =>
      this.goals.push(
        new GoalObject(goalInfo.x, goalInfo.y, goalInfo.width, goalInfo.height)
      )
    )

    const treatInfos = this.#infoObjects("treat")
    this.#treats = treatInfos.map(
      (treatInfo) =>
        new Treat(treatInfo.x, treatInfo.y, treatInfo.width, treatInfo.height)
    )
  }

  get player() {
    return this.#player
  }

  get platforms() {
    return this.#platforms
  }

  get treats() {
    return this.#treats
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
    objectTypeMap["!"] = "goal"
    objectTypeMap["$"] = "treat"

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

  #infoObjects(type) {
    return this.#levelInfoObjects.filter((o) => o.type === type)
  }
}