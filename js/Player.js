import { GameObject } from "./GameObject.js"
import { Sprite } from "./Sprite.js"

export class Player extends GameObject {
  #isJumping = false
  #width
  #height
  #idleRightSprite
  #idleLeftSprite
  #runRightSprite
  #runLeftSprite
  #currentSprite
  #direction = "right"

  constructor(x, y, width, height) {
    const color = "white"
    super(x, y, width, height, color)

    this.xVelocity = 0
    this.yVelocity = 0

    this.#width = width
    this.#height = height

    this.#addSprites()
  }

  update() {
    // Previous position used for collision detection
    this.prevX = this.x
    this.prevY = this.y
    if (Math.abs(this.xVelocity) < 0.1) this.#idle()

    this.x = Math.round(this.x + this.xVelocity)
    this.y = Math.round(this.y + this.yVelocity)
  }

  moveLeft() {
    this.#run("left")
    this.xVelocity -= 0.6
  }

  moveRight() {
    this.#run("right")
    this.xVelocity += 0.6
  }

  jump() {
    // Disallow jumping in the air
    if (!this.#isJumping) {
      this.yVelocity -= 20
      this.#isJumping = true
    }
  }

  // Called when player hits the ground and can start jumping again
  stopJump() {
    this.#isJumping = false
  }

  spriteFrame() {
    const imageInfo = this.#currentSprite.frame()
    imageInfo.dx = this.x
    imageInfo.dy = this.y
    imageInfo.dWidth = this.#width + 1
    imageInfo.dHeight = this.#height
    return imageInfo
  }

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

  #idle() {
    this.#currentSprite =
      this.#direction === "right" ? this.#idleRightSprite : this.#idleLeftSprite
    this.#width = this.#height = 12
  }

  #run(direction) {
    this.#direction = direction
    this.#width = 16
    this.#height = 12
    this.#currentSprite =
      this.#direction === "right" ? this.#runRightSprite : this.#runLeftSprite
  }
}
