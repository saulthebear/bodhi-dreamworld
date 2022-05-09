import { GameObject } from "./GameObject.js"

export class Player extends GameObject {
  #isJumping = false

  constructor(x, y) {
    const color = "white"
    const size = 16
    // Object.assign(this, new GameObject(x, y, size, size, color))
    super(x, y, size, size, color)

    this.xVelocity = 0
    this.yVelocity = 0
  }

  update() {
    // Previous position used for collision detection
    this.prevX = this.x
    this.prevY = this.y
    this.x = Math.round(this.x + this.xVelocity)
    this.y = Math.round(this.y + this.yVelocity)
  }

  moveLeft() {
    this.xVelocity -= 0.6
  }

  moveRight() {
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
}
