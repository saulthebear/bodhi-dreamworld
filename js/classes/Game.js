import { Level } from "./Level.js"
import { Player } from "./Player.js"
import { Treat } from "./Treat.js"
import { BrushProjectile } from "./Projectile.js"

// Level Maps
import { level1Map } from "../levels/level1.js"
import { level2Map } from "../levels/level2.js"
import { level3Map } from "../levels/level3.js"

/**
 * The game holds the world which contains all the level's objects.
 * The game also calls the world's `update` method, which in turn calls all the
 * world objects' `update` methods.
 * @property {string[]} levels - Level maps in string representations
 * @property {GameWorld} world - The game world, holding the current level's
 * objects and properties.
 * @property {number} timer - Seconds elapsed since start of level.
 * @property {boolean} gameOver - Did the current level end?
 */
export class Game {
  static levels = [level1Map, level2Map, level3Map]

  /**
   * @typedef GameConfig
   * @property {number} level - The level to load
   */
  /**
   * @param {GameConfig} config
   */
  constructor({ level }) {
    const blockSize = 6

    const currLevel = new Level(Game.levels[level - 1], blockSize)

    this.world = new GameWorld(currLevel, blockSize)
    this.timer = 0
  }

  /**
   * Updates the game world, level timer, and sets the gameOver prop.
   * @param {number} timeStep - seconds between update calls
   */
  update(timeStep) {
    this.timer += timeStep
    this.world.update(timeStep)
    this.gameOver = this.world.gameOver
  }
}

/**
 * Holds all the objects in the level, and updates them.
 */
class GameWorld {
  /**
   * Time in seconds between brush spawns.
   * @type {number}
   * @private
   */
  #brushTriggerTime = 3
  /**
   * Time elapsed since last brush spawn. Initialized to equal brushTriggerTime,
   * so that spawning starts immediately.
   * @type {number}
   * @private
   */
  #brushTimeElapsed = 3

  constructor(level, blockSize) {
    /** Has the level been completed?
     * @type {boolean} */
    this.gameOver = false

    /** The width of the world in pixels
     * @type {number} */
    this.width = level.width

    /** The height of the world in pixels
     * @type {number} */
    this.height = level.height

    /** All the platforms in the level
     * @type {Platform[]} */
    this.platforms = level.platforms

    /** All the goal objects in the level. When reached the level ends.
     * @type {GoalObject[]} */
    this.goals = level.goals

    /** All the treats (collectable items) in the level.
     * @type {Treat[]} */
    this.treats = level.treats

    /** How many treats are there in the level. Not the number of treats at
     * any given time, but the total number at the start.
     * @type {number} */
    this.totalTreats = this.treats.length

    /** All the brush projectiles currently in the level.
     * @type {Projectile[]} */
    this.brushes = []

    /** Information about where brush projectiles spawn, and their direction of
     * travel.
     * @type {BrushSpawn[]} */
    this.brushSpawns = level.brushSpawns

    /** The background image of the level.
     * This is the image to be used when clearing the canvas.
     * @type {HTMLImageElement} */
    this.bgImage = new Image()
    this.bgImage.src = "./sprites/bg-sky.png"

    const playerSize = blockSize * 2

    /**
     * @type {Player} */
    this.player = new Player(
      level.player.x,
      level.player.y,
      playerSize,
      playerSize
    )

    // Called whenever a treat is collided with
    Treat.collectionCallback = this.#collectTreat.bind(this)

    /** Downward velocity added every tick, in pixels
     * @type {number}
     */
    this.gravity = 3

    /** Multiplier added to velocity every tick
     * @type {number}
     */
    this.friction = 0.7
  }

  /**
   * The aspect ratio of the level (width / height)
   * @returns {number} - Aspect ratio
   */
  get aspectRatio() {
    return this.width / this.height
  }

  /**
   * Prevent the object passed in from leaving the world bounds.
   * If the object passed in is outside the bounds of the world, set its
   * position, so that it is inside the world.
   * @param {GameObject} object
   */
  collideWithWorldEdge(object) {
    if (object.left < 0) {
      // Object beyond left of world
      // Place object against left of world and stop its leftward velocity
      object.x = 0
      object.xVelocity = 0
    } else if (object.right > this.width) {
      // Object beyond right of world
      // Place object against right of world and stop its rightward velocity
      object.x = this.width - object.width
      object.xVelocity = 0
    }

    if (object.top < 0) {
      // Object beyond top of world
      // Place object against top of world and stop its upwards velocity
      object.y = 0
      object.yVelocity = 0
    } else if (object.bottom > this.height) {
      // Object beyond bottom of world
      // Place object on bottom of world and stop its downwards velocity
      object.y = this.height - object.height
      object.yVelocity = 0
      if (object.stopJump) object.stopJump()
    }
  }

  /**
   * Update all the objects in the level
   * @param {number} timeStep - Time between updates in seconds
   */
  update(timeStep) {
    this.player.yVelocity += this.gravity
    this.player.update()
    this.player.xVelocity *= this.friction
    this.player.yVelocity *= this.friction
    this.collideWithWorldEdge(this.player)

    this.platforms.forEach((platform) => platform.applyColliders(this.player))

    this.treats.forEach((treat) => {
      treat.collide(this.player)
      treat.update()
    })

    this.#spawnBrushes(this.brushSpawns, timeStep)

    this.brushes.forEach((brush) => {
      brush.collide(this.player)
      brush.update()
    })

    this.#checkWin()
  }

  /**
   * Check if the player is colliding with any {@link GoalObject}. If so, set
   * {@link gameOver} to `true`
   * @private
   */
  #checkWin() {
    const didWin = this.goals.some((goal) => goal.isColliding(this.player))
    if (didWin) {
      this.gameOver = true
    }
  }

  /**
   * Callback for player collision with a {@link Treat}.
   * Removes the treat from {@link treats}.
   * @param {Treat} collectedTreat - Treat that the player collided with
   * @callback Treat.collectionCallback
   */
  #collectTreat(collectedTreat) {
    this.treats = this.treats.filter((treat) => treat !== collectedTreat)
  }

  /**
   * Spawns brush {@link Projectile}s where specified in the level map.
   * Only spawns a brush when enough time has passed, as determined by
   * {@link GameWorld~brushTriggerTime}. A random delay is also added, so that
   * all projectiles are not in sync.
   * @param {BrushSpawn[]} spawns - Info on where to spawn projectiles
   * @param {number} timeStep - Time between update calls in seconds
   */
  #spawnBrushes(spawns, timeStep) {
    this.#brushTimeElapsed += timeStep
    if (this.#brushTimeElapsed > this.#brushTriggerTime) {
      spawns.forEach(({ spawnX, spawnY, direction }) => {
        // Delay up to 1 second
        const randomDelay = Math.random() * 1000
        setTimeout(
          () =>
            this.brushes.push(
              new BrushProjectile({ spawnX, spawnY, direction })
            ),
          randomDelay
        )
      })
      this.#brushTimeElapsed -= this.#brushTriggerTime
    }
  }
}
