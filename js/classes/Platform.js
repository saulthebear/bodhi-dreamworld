import { GameObject } from "./GameObject.js"

/**
 * A platform with which the player collides.
 * @extends GameObject
 */
export class Platform extends GameObject {
  /**
   * A random x value within the width of the platform sprite. The platform's
   * sprite will be cropped from this value, giving each platform a different
   * look.
   * @type {number}
   */
  #randomImageX

  /**
   * @param {number} x - Horizontal position, in pixels
   * @param {number} y - Vertical position, in pixels
   * @param {number} width - In pixels
   * @param {number} height - In pixels
   * @param {CollisionDirections} collisionDirections - Sides of the platform
   * the player should collide with
   */
  constructor(x, y, width, height, collisionDirections = {}) {
    const platformColor = "pink"
    super(x, y, width, height, platformColor)

    /** Sides of the platform the player should collide with.
     * @type {CollisionDirections}
     */
    this.collisionDirections = collisionDirections

    /**
     * The sprite to render.
     * @type {HTMLImageElement}
     */
    this.image = new Image()
    this.image.src = "./sprites/platform-tile-grass.png"
  }

  /**
   * @override
   */
  get imageInfo() {
    if (!this.#randomImageX) {
      const imageWidth = 144
      this.#randomImageX = Math.floor(Math.random() * (imageWidth - this.width))
      if (this.#randomImageX < 0) this.#randomImageX = 0
    }

    // Prevent sWidth being 0 when platform's width is exactly 144
    const sWidth = this.width === 144 ? 144 : this.width % 144

    return {
      image: this.image,
      sx: this.#randomImageX,
      sy: 0,
      sWidth: sWidth,
      sHeight: 6,
      dx: this.x,
      dy: this.y,
      dWidth: this.width,
      dHeight: this.height,
    }
  }

  /**
   * Check each of the directions defined in {@link Platform#collisionDirections}
   * and run the collider for that direction. At most one collider is applied,
   * so if it is eg. colliding with both the top and left, only the top collider
   * will be applied.
   * @param {GameObject} object - Object that might collide with the platform
   */
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

  /**
   * Check if an object is colliding with the top of this platform. If it is,
   * stop its velocity in this direction and place it outside this platform.
   * @param {GameObject} object - Object that might collide with the platform
   * @returns {boolean} - Is the object colliding?
   */
  collideTop(object) {
    const wasAbove = object.prevY < this.top

    if (this.isColliding(object) && wasAbove) {
      object.yVelocity = 0
      object.bottom = this.top
      object.stopJump()
      return true
    }

    return false
  }

  /**
   * Check if an object is colliding with the right of this platform. If it is,
   * stop its velocity in this direction and place it outside this platform.
   * @param {GameObject} object - Object that might collide with the platform
   * @returns {boolean} - Is the object colliding?
   */
  collideRight(object) {
    const wasRight = object.prevX >= this.right

    if (this.isColliding(object) && wasRight) {
      object.left = this.right
      object.xVelocity = 0
      return true
    }
    return false
  }

  /**
   * Check if an object is colliding with the bottom of this platform. If it is,
   * stop its velocity in this direction and place it outside this platform.
   * @param {GameObject} object - Object that might collide with the platform
   * @returns {boolean} - Is the object colliding?
   */
  collideBottom(object) {
    const wasBelow = object.prevY >= this.bottom

    if (this.isColliding(object) && wasBelow) {
      object.top = this.bottom
      object.yVelocity = 0
      return true
    }
    return false
  }

  /**
   * Check if an object is colliding with the left of this platform. If it is,
   * stop its velocity in this direction and place it outside this platform.
   * @param {GameObject} object - Object that might collide with the platform
   * @returns {boolean} - Is the object colliding?
   */
  collideLeft(object) {
    const wasLeft = object.prevX <= this.left

    if (this.isColliding(object) && wasLeft) {
      object.right = this.left
      object.xVelocity = 0
      return true
    }
    return false
  }
}

/********************
 * TYPE DEFINITIONS *
 ********************/

/**
 * Sides of an object for which collisions should be checked
 * @typedef CollisionDirections
 * @param {boolean} top
 * @param {boolean} right
 * @param {boolean} bottom
 * @param {boolean} left
 */
