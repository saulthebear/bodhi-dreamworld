import { GameObject } from "./GameObject.js"
import { Sprite } from "./Sprite.js"

/**
 * The character that the user controls.
 * @extends GameObject
 */
export class Player extends GameObject {
  /** Is the player currently jumping?
   * @type {boolean}
   */
  #isJumping = false

  /** The width of the player, in pixels.
   * Changes based on player action. Eg. is larger when running
   * @type {number}
   */
  #width

  /** The height of the player, in pixels.
   * Changes based on player action.
   * @type {number}
   */
  #height

  /** The sprite to render when player is sitting still, facing right.
   * @type {Sprite}
   */
  #idleRightSprite

  /** The sprite to render when player is sitting still, facing left.
   * @type {Sprite}
   */
  #idleLeftSprite

  /** The sprite to render when player is moving right.
   * @type {Sprite}
   */
  #runRightSprite

  /** The sprite to render when player is moving left.
   * @type {Sprite}
   */
  #runLeftSprite

  /** The current sprite to render.
   * @type {Sprite}
   */
  #currentSprite

  /** The direction the player is facing
   * @type {"right" | "left"}
   */
  #direction = "right"

  /** The absolute value by which velocity is changed when moving left/right,
   * in pixels per tick
   * @type {number}
   */
  #xSpeed = 0.6

  /**
   * @param {number} x - horizontal position, in pixels
   * @param {number} y - vertical position, in pixels
   * @param {number} width - Initial width, in pixels
   * @param {number} height - Initial height, in pixels
   */
  constructor(x, y, width, height) {
    const color = "white"
    super(x, y, width, height, color)

    /** Horizontal velocity, in pixels per tick.
     * Positive values go right, negative values go left.
     * @type {number}
     */
    this.xVelocity = 0

    /** Vertical velocity, in pixels per tick.
     * Positive values go down, negative values go up.
     * @type {number}
     */
    this.yVelocity = 0

    this.#width = width
    this.#height = height

    this.#addSprites()
  }

  /**
   * Update the player's position, based on its velocity.
   * Called once per tick.
   */
  update() {
    // Previous position used for collision detection
    this.prevX = this.x
    this.prevY = this.y
    if (Math.abs(this.xVelocity) < 0.1) this.#idle()

    this.x = Math.round(this.x + this.xVelocity)
    this.y = Math.round(this.y + this.yVelocity)
  }

  /**
   * Increase horizontal velocity in the left direction.
   */
  moveLeft() {
    this.#run("left")
    this.xVelocity -= this.#xSpeed
  }

  /**
   * Increase horizontal velocity in the right direction.
   */
  moveRight() {
    this.#run("right")
    this.xVelocity += this.#xSpeed
  }

  /**
   * Increase player's upward velocity, if not already jumping.
   */
  jump() {
    // Disallow jumping in the air
    if (!this.#isJumping) {
      this.yVelocity -= 20
      this.#isJumping = true
    }
  }

  /**
   * Allow the player to jump again. Called when player hits the ground.
   */
  stopJump() {
    this.#isJumping = false
  }

  /**
   * Get the current sprite set to the correct animation frame.
   * @override
   */
  get imageInfo() {
    const imageInfo = this.#currentSprite.frame()
    imageInfo.dx = this.x
    imageInfo.dy = this.y
    imageInfo.dWidth = this.#width + 1
    imageInfo.dHeight = this.#height
    return imageInfo
  }

  /**
   * Initialize all the sprites for different actions.
   */
  #addSprites() {
    const idleAnimationFactor = 20
    const runAnimationFactor = 5

    const idleRightImage = new Image()
    idleRightImage.src = "./sprites/idle-right.png"
    this.#idleRightSprite = new Sprite({
      image: idleRightImage,
      width: 52,
      height: 12,
      cols: 4,
      speedFactor: idleAnimationFactor,
    })

    const idleLeftImage = new Image()
    idleLeftImage.src = "./sprites/idle-left.png"
    this.#idleLeftSprite = new Sprite({
      image: idleLeftImage,
      width: 52,
      height: 12,
      cols: 4,
      speedFactor: idleAnimationFactor,
    })

    const runRightImage = new Image()
    runRightImage.src = "./sprites/run-right.png"
    this.#runRightSprite = new Sprite({
      image: runRightImage,
      width: 136,
      height: 12,
      cols: 8,
      speedFactor: runAnimationFactor,
    })

    const runLeftImage = new Image()
    runLeftImage.src = "./sprites/run-left.png"
    this.#runLeftSprite = new Sprite({
      image: runLeftImage,
      width: 136,
      height: 12,
      cols: 8,
      speedFactor: runAnimationFactor,
    })
  }

  /**
   * Set the current sprite to either idleLeft or idleRight.
   */
  #idle() {
    this.#currentSprite =
      this.#direction === "right" ? this.#idleRightSprite : this.#idleLeftSprite
    this.#width = this.#height = 12
  }

  /**
   * Set the current sprite to the correct run animation based on direction.
   * @param {"right"|"left"} direction - Direction player is moving
   */
  #run(direction) {
    this.#direction = direction
    this.#width = 16
    this.#height = 12
    this.#currentSprite =
      this.#direction === "right" ? this.#runRightSprite : this.#runLeftSprite
  }
}
