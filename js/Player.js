import { GameObject } from "./GameObject.js"
import { Sprite } from "./Sprite.js"

export class Player extends GameObject {
  #isJumping = false
  #size

  constructor(x, y, size) {
    const color = "white"
    // Object.assign(this, new GameObject(x, y, size, size, color))
    super(x, y, size, size, color)

    this.xVelocity = 0
    this.yVelocity = 0

    this.#size = size
    const idleRightImage = new Image()
    idleRightImage.src = "./sprites/idle-right.png"
    this.idleRightSprite = new Sprite(idleRightImage, 52, 12, 4, 20)
  }

  update() {
    // Previous position used for collision detection
    this.prevX = this.x
    this.prevY = this.y
    this.x = Math.round(this.x + this.xVelocity)
    this.y = Math.round(this.y + this.yVelocity)
  }

  moveLeft() {
    this.xVelocity -= 0.7
  }

  moveRight() {
    this.xVelocity += 0.7
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
    const imageInfo = this.idleRightSprite.frame()
    imageInfo.dx = this.x
    imageInfo.dy = this.y
    imageInfo.dWidth = this.#size + 1
    imageInfo.dHeight = this.#size
    return imageInfo
  }
}
