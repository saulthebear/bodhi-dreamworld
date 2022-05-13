import { GameObject } from "./GameObject.js"

/**
 * A brush projectile, which moves horizontally. Knocks the player back if they
 * collide.
 * @extends GameObject
 */
export class BrushProjectile extends GameObject {
  /**
   * @param {BrushSpawn} spawn - spawn configuration
   */
  constructor({ spawnX, spawnY, direction = "RIGHT" }) {
    super(spawnX, spawnY, 12, 6, "red")

    switch (direction) {
      case "RIGHT":
        /** Horizontal velocity.
         * @type {number}
         */
        this.xVelocity = 1
        /** Vertical velocity.
         * @type {number}
         */
        this.yVelocity = 0
        break
      case "LEFT":
        this.xVelocity = -1
        this.yVelocity = 0
        break
    }

    /**
     * The sprite to render.
     * @type {HTMLImageElement}
     */
    this.image = new Image()
    this.image.src = "./sprites/brush.png"
  }

  /**
   * Change position based on current x and y velocity
   */
  update() {
    this.x += this.xVelocity
    this.y += this.yVelocity
  }

  /**
   * Is the projectile out of bounds?
   * @param {Bounds} bounds
   * @returns {boolean}
   */
  isOutOfBounds({ topBound, rightBound, bottomBound, leftBound }) {
    return (
      this.bottom < topBound ||
      this.left > rightBound ||
      this.top > bottomBound ||
      this.right < leftBound
    )
  }

  /**
   * Check of an object is colliding with the projectile, and if so increase its
   * velocity in the direction the projectile is moving (ie. knock it back)
   * @param {GameObject} object - Object that might be colliding with projectile
   */
  collide(object) {
    if (this.isColliding(object)) {
      if (this.xVelocity > 0) object.xVelocity = 10 * this.xVelocity
      if (this.yVelocity > 0) object.yVelocity = 10 * this.yVelocity
    }
  }

  /**
   * @override
   */
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

/********************
 * TYPE DEFINITIONS *
 ********************/

/**
 * Information about where brush projectiles spawn, and their direction of
 * travel.
 * @typedef BrushSpawn
 * @property {number} spawnX - x position
 * @property {number} spawnY - y position
 * @property {("RIGHT"|"LEFT")=} direction - Direction in which projectiles move.
 */

/**
 * Describes a rectangular boundary
 * @typedef Bounds
 * @property {number} topBound - min y value, in pixels
 * @property {number} rightBound - max x value, in pixels
 * @property {number} bottomBound - max y value, in pixels
 * @property {number} leftBound - min x value, in pixels
 */
