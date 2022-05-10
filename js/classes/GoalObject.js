import { GameObject } from "./GameObject.js"

// The object that when reached ends the level
export class GoalObject extends GameObject {
  constructor(x, y, width, height) {
    // super(x, y, width, height, "red")
    super(x, y, width, height * 2, "red")
    this.image = new Image()
    this.image.src = "../sprites/jar-2.png"
  }

  isColliding(object) {
    return (
      this.isCollidingTop(object) ||
      this.isCollidingRight(object) ||
      this.isCollidingBottom(object) ||
      this.isCollidingLeft(object)
    )
  }

  get imageInfo() {
    return {
      image: this.image,
      sx: 0,
      sy: 0,
      sWidth: 12,
      sHeight: 12,
      dx: this.x,
      dy: this.y,
      dWidth: this.width,
      dHeight: this.height,
    }
  }
}
