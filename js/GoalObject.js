import { GameObject } from "./GameObject.js"

// The object that when reached ends the level
export class GoalObject extends GameObject {
  constructor(x, y, width, height) {
    super(x, y, width, height, "red")
  }

  isColliding(object) {
    return (
      this.isCollidingTop(object) ||
      this.isCollidingRight(object) ||
      this.isCollidingBottom(object) ||
      this.isCollidingLeft(object)
    )
  }
}
