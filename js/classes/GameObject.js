export class GameObject {
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  set top(y) {
    this.y = y
  }

  set right(x) {
    this.x = x - this.width
  }

  set left(x) {
    this.x = x
  }

  set bottom(y) {
    this.y = y - this.height
  }

  get top() {
    return this.y
  }

  get right() {
    return this.x + this.width
  }

  get bottom() {
    return this.y + this.height
  }

  get left() {
    return this.x
  }

  isWithinWidth(object) {
    return object.right > this.left && object.left < this.right
  }

  isWithinHeight(object) {
    return object.bottom > this.top && object.top < this.bottom
  }

  isCollidingTop(object) {
    if (!this.isWithinWidth(object)) return false

    return this.isWithinHeight(object)
  }

  isCollidingRight(object) {
    if (!this.isWithinHeight(object)) return false

    return this.isWithinWidth(object)
  }

  isCollidingBottom(object) {
    if (!this.isWithinWidth(object)) return false
    return this.isWithinHeight(object)
  }
  isCollidingLeft(object) {
    if (!this.isWithinHeight(object)) return false
    return this.isWithinWidth(object)
  }
}
