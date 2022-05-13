import { GameObject } from "./GameObject.js"

/**
 * Collectable items in the game.
 * @extends GameObject
 */
export class Treat extends GameObject {
  /**
   * Called whenever a player collides with a treat. Removes the treat from
   * {@link treats} so that is no longer rendered or updated.
   * @type {function}
   * @static
   */
  static collectionCallback = () => {}

  /**
   * The highest vertical position the treat can bob up to when moving up and
   * down.
   * @type {number}
   */
  #minY

  /**
   * The lowest vertical position the treat can bob down to when moving up and
   * down.
   * @type {number}
   */
  #maxY

  /**
   * The current vertical position, in fractional pixels. This number is rounded
   * to an integer before rendering to ensure the image is sharp.
   * @type {number}
   */
  #fractionalY

  /**
   * The direction the treat is currently moving.
   * @type {"UP" | "DOWN"}
   */
  #bobDirection = "UP"

  /**
   * The speed in pixels per tick that the treat moves up and down.
   * Set to a random value between 0.05 and 0.06, so all treats aren't bobbing
   * in sync.
   */
  #bobSpeed = 0.05 + Math.random() * 0.01

  /**
   * @param {number} x - Horizontal position in pixels.
   * @param {number} y - Vertical starting position in pixels.
   * @param {number} width - In pixels.
   * @param {number} height - In pixels.
   */
  constructor(x, y, width, height) {
    super(x, y, width, height, "lightgreen")

    /**
     * Sprite to render.
     * @type {HTMLImageElement}
     */
    this.image = new Image()
    this.image.src = "./sprites/fish.png"

    // Initialize values for bobbing up and down
    this.#minY = y - 3
    this.#maxY = y
    this.#fractionalY = y
  }

  /**
   * Check if an object is colliding with the treat, and if it is call the
   * static {@link Treat.collectionCallback}
   * @param {GameObject} object - Object that might be colliding with the treat.
   */
  collide(object) {
    if (this.isColliding(object)) {
      Treat.collectionCallback(this)
    }
  }

  /**@override */
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

  /**
   * Update the vertical position so that the treat bobs up and down
   */
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
