import { GameObject } from "./GameObject.js"

export class Platform extends GameObject {
  #randomImageX
  constructor(x, y, width, height, collisionDirections = {}) {
    const platformColor = "pink"
    super(x, y, width, height, platformColor)
    this.collisionDirections = collisionDirections

    this.image = new Image()
    this.image.src = "./sprites/platform-tile-long-grass-2.png"
  }

  get imageInfo() {
    if (!this.#randomImageX) {
      const imageWidth = 144
      this.#randomImageX = Math.floor(Math.random() * (imageWidth - this.width))
      if (this.#randomImageX < 0) this.#randomImageX = 0
    }

    return {
      image: this.image,
      sx: this.#randomImageX,
      sy: 0,
      sWidth: this.width % 144,
      sHeight: 6,
      dx: this.x,
      dy: this.y,
      dWidth: this.width,
      dHeight: this.height,
    }
  }

  applyColliders(object) {
    let hasCollided = false

    if (this.collisionDirections.top) {
      hasCollided = this.collideTop(object)
    }

    if (!hasCollided && this.collisionDirections.right) {
      hasCollided = this.collideRight(object)
    }

    if (!hasCollided && this.collisionDirections.bottom) {
      hasCollided = this.collideBottom(object)
    }

    if (!hasCollided && this.collisionDirections.left) {
      hasCollided = this.collideLeft(object)
    }
  }

  collideTop(object) {
    const wasAbove = object.prevY < this.top

    if (this.isCollidingTop(object) && wasAbove) {
      object.yVelocity = 0
      object.bottom = this.top
      object.stopJump()
      return true
    }

    return false
  }

  collideRight(object) {
    const wasRight = object.prevX >= this.right

    if (this.isCollidingRight(object) && wasRight) {
      object.left = this.right
      object.xVelocity = 0
      return true
    }
    return false
  }

  collideBottom(object) {
    const wasBelow = object.prevY >= this.bottom

    if (this.isCollidingBottom(object) && wasBelow) {
      object.top = this.bottom
      object.yVelocity = 0
      return true
    }
    return false
  }

  collideLeft(object) {
    const wasLeft = object.prevX <= this.left

    if (this.isCollidingLeft(object) && wasLeft) {
      object.right = this.left
      object.xVelocity = 0
      return true
    }
    return false
  }
}
