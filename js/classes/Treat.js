import { GameObject } from "./GameObject.js"

export class Treat extends GameObject {
  static collectionCallback = () => {}

  #wasCollected = 0

  constructor(x, y, width, height) {
    super(x, y, width, height, "lightgreen")
    this.image = new Image()
    this.image.src = "../sprites/fish.png"
  }

  collide(object) {
    if (this.#wasCollected) return

    if (
      this.isCollidingTop(object) ||
      this.isCollidingRight(object) ||
      this.isCollidingBottom(object) ||
      this.isCollidingLeft(object)
    ) {
      Treat.collectionCallback(this)
    }
  }

  get imageInfo() {
    return {
      image: this.image,
      sx: 0,
      sy: 0,
      sWidth: 6,
      sHeight: 6,
      dx: this.x,
      dy: this.y,
      dWidth: this.width,
      dHeight: this.height,
    }
  }
}
