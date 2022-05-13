/**
 * Parent class for objects in the game world.
 * Has properties for position, size, and color.
 * Contains convenience methods for finding the position of an object's four
 * edges.
 * Contains methods for detecting collisions with other objects.
 */
export class GameObject {
  /**
   * @param {number} x - horizontal position in pixels
   * @param {number} y - vertical position in pixels
   * @param {number} width - in pixels
   * @param {number} height - in pixels
   * @param {string} color - color to render if no sprite is present
   */
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  /** The y coordinate of the top edge of the object, in pixels. */
  get top() {
    return this.y
  }

  /** The x coordinate of the right edge of the object, in pixels. */
  get right() {
    return this.x + this.width
  }

  /** The y coordinate of the bottom edge of the object, in pixels. */
  get bottom() {
    return this.y + this.height
  }

  /** The x coordinate of the left edge of the object, in pixels. */
  get left() {
    return this.x
  }

  /**
   * Information about this object's sprite.
   * @type {ImageInfo}
   * @abstract
   */
  get imageInfo() {}

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

  /**
   * Is the passed object within the column above, below, or within, this object?
   * @param {GameObject} object
   * @returns {boolean}
   */
  isWithinWidth(object) {
    return object.right > this.left && object.left < this.right
  }

  /**
   * Is the passed object within the row left, right, or within this object?
   * @param {GameObject} object
   * @returns {boolean}
   */
  isWithinHeight(object) {
    return object.bottom > this.top && object.top < this.bottom
  }

  /**
   * Is the passed object colliding with this object?
   * @param {GameObject} object
   * @returns {boolean}
   */
  isColliding(object) {
    return this.isWithinWidth(object) && this.isWithinHeight(object)
  }
}

/********************
 * TYPE DEFINITIONS *
 ********************/

/**
 * Information about a sprite
 * @typedef ImageInfo
 * @property {HTMLImageElement} image - The source image to render
 * @property {number} sx - Starting x position in the source image
 * @property {number} sy - Starting y position in the source image
 * @property {number} sWidth - Width to crop to in source image
 * @property {number} sHeight - Height to crop to in source image
 * @property {number} dx - Destination x position
 * @property {number} dy - Destination y position
 * @property {number} dWidth - Rendered width
 * @property {number} dHeight - Rendered height
 */
