import { GameObject } from "./GameObject.js"

export class Treat extends GameObject {
  static collectionCallback = () => {}

  #minY // Highest it can bob to
  #maxY // Lowest it can bob to
  #fractionalY // Used to update bob position -- Rounded to a whole number
  #bobDirection = "UP"
  #bobSpeed = 0.05 + Math.random() * 0.01 // Random so they aren't in sync

  constructor(x, y, width, height) {
    super(x, y, width, height, "lightgreen")
    this.image = new Image()
    this.image.src = "./sprites/fish.png"

    // Initialize values for bobbing up and down
    this.#minY = y - 3
    this.#maxY = y
    this.#fractionalY = y
  }

  collide(object) {
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

  // Update y position so the treat bobs up and down
  update() {
    if (this.#fractionalY <= this.#minY && this.#bobDirection === "UP") {
      this.#bobDirection = "DOWN"
    } else if (
      this.#fractionalY >= this.#maxY &&
      this.#bobDirection === "DOWN"
    ) {
      this.#bobDirection = "UP"
    }

    if (this.#bobDirection === "UP") this.#fractionalY -= this.#bobSpeed
    else this.#fractionalY += this.#bobSpeed

    this.y = Math.round(this.#fractionalY)
  }
}
