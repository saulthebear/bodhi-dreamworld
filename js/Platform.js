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
    if (!this.isWithinWidth(object)) return false

    const isIntersectingHeight =
      object.bottom > this.top && object.top < this.bottom
    const wasAbove = object.prevY < this.top

    if (isIntersectingHeight && wasAbove) {
      object.yVelocity = 0
      object.bottom = this.top
      object.stopJump()
      return true
    }

    return false
  }

  collideRight(object) {
    if (!this.isWithinHeight(object)) return false

    const wasRight = object.prevX >= this.right

    if (this.isWithinWidth(object) && wasRight) {
      object.left = this.right
      object.xVelocity = 0
      return true
    }
    return false
  }
  collideBottom(object) {
    if (!this.isWithinWidth(object)) return false

    const wasBelow = object.prevY >= this.bottom

    if (this.isWithinHeight(object) && wasBelow) {
      object.top = this.bottom
      object.yVelocity = 0
      return true
    }
    return false
  }

  collideLeft(object) {
    if (!this.isWithinHeight(object)) return false

    const wasLeft = object.prevX <= this.left

    if (this.isWithinWidth(object) && wasLeft) {
      object.right = this.left
      object.xVelocity = 0
      return true
    }
    return false
  }

  isWithinWidth(object) {
    return object.right > this.left && object.left < this.right
  }

  isWithinHeight(object) {
    return object.bottom > this.top && object.top < this.bottom
  }

  // isIntersecting(object) {
  //   return this.isWithinWidth(object) && this.isWithinHeight(object)
  // }
}
