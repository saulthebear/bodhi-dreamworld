import { GameObject } from "./GameObject.js"

export class BrushProjectile extends GameObject {
  constructor({ spawnX, spawnY, direction = "RIGHT" }) {
    super(spawnX, spawnY, 12, 6, "red")

    switch (direction) {
      case "RIGHT":
        this.xVelocity = 1
        this.yVelocity = 0
        break
      case "LEFT":
        this.xVelocity = -1
        this.yVelocity = 0
        break
    }

    this.image = new Image()
    this.image.src = "../sprites/brush-2.png"
  }

  update() {
    this.x += this.xVelocity
    this.y += this.yVelocity
  }

  isOutOfBounds({ topBound, rightBound, bottomBound, leftBound }) {
    return (
      this.bottom < topBound ||
      this.left > rightBound ||
      this.top > bottomBound ||
      this.right < leftBound
    )
  }

  collide(object) {
    if (
      this.isCollidingTop(object) ||
      this.isCollidingRight(object) ||
      this.isCollidingBottom(object) ||
      this.isCollidingLeft(object)
    ) {
      if (this.xVelocity > 0) object.xVelocity = 10 * this.xVelocity
      if (this.yVelocity > 0) object.yVelocity = 10 * this.yVelocity
    }
  }

  get imageInfo() {
    return {
      image: this.image,
      sx: 0,
      sy: 0,
      sWidth: 24,
      sHeight: 12,
      dx: this.x,
      dy: this.y,
      dWidth: this.width,
      dHeight: this.height,
    }
  }
}
