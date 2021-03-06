/**
 * Holds an animated sprite (a single sprite sheet, with multiple rows and/or
 * columns of image frames). Abstracts the process of finding the current / next
 * animation frames.
 */
export class Sprite {
  /**
   * The source image
   * @type {HTMLImageElement}
   */
  #image

  /**
   * The full width of the source image in pixels
   * @type {number}
   */
  #width

  /**
   * The full height of the source image in pixels
   * @type {number}
   */
  #height

  /**
   * The number of rows of frames in the source image.
   * @type {number}
   */
  #rows

  /**
   * The number of columns of frames in the source image.
   * @type {number}
   */
  #cols

  /**
   * The size of the left margin in the source image, in pixels.
   * @type {number}
   */
  #offsetX

  /**
   * The size of the top margin in the source image, in pixels.
   * @type {number}
   */
  #offsetY

  /**
   * The number of ticks each frame is shown for.
   * @type {number}
   */
  #speedFactor

  /**
   * The width of a single frame in the sprite image (one column), in pixels.
   * @type {number}
   */
  #frameWidth

  /**
   * The height of a single frame in the sprite image (one row), in pixels.
   * @type {number}
   */
  #frameHeight

  /**
   * Tracks the number of the current frame being shown.
   * @type {number}
   */
  #currFrame

  /**
   * A number updated each tick, until the next frame can be shown, as
   * determined by the speed factor.
   * @type {number}
   */
  #partialFrame

  /**
   * @param {SpriteConfig} config
   */
  constructor({
    image,
    width,
    height,
    cols,
    rows = 1,
    speedFactor = 1,
    offsetX = 0,
    offsetY = 0,
  }) {
    this.#image = image

    this.#width = width
    this.#height = height
    this.#cols = cols
    this.#rows = rows
    this.#offsetX = offsetX
    this.#offsetY = offsetY

    /**
     * The row in source image to use.
     * @type {number}
     */
    this.activeRow = 0

    this.#frameWidth = width / cols
    this.#frameHeight = height / rows

    this.#currFrame = 0
    this.#partialFrame = 0
    this.#speedFactor = speedFactor
  }

  /**
   * Returns information about the current frame to show, and calls
   * {@link incrementFrame}.
   * @returns {ImageInfo}
   */
  frame() {
    const info = {
      image: this.#image,
      sx: this.#frameWidth * this.#currFrame + this.#offsetX,
      sy: this.#frameHeight * this.activeRow + this.#offsetY,
      sWidth: this.#frameWidth,
      sHeight: this.#frameHeight,
    }
    this.incrementFrame()
    return info
  }

  /**
   * Ticks up partialFrame, and increments currFrame if partialFrame is equal to
   * the speedFactor.
   */
  incrementFrame() {
    this.#partialFrame++
    if (this.#partialFrame === this.#speedFactor) {
      this.#partialFrame = 0

      this.#currFrame++
      if (this.#currFrame >= this.#cols) this.#currFrame = 0
    }
  }
}

/********************
 * TYPE DEFINITIONS *
 ********************/

/**
 * @typedef SpriteConfig
 * @property {HTMLImageElement} image - An animation sprite image.
 * @property {number} width - The full width of the source image in pixels.
 * @property {number} height - The full height of the source image in pixels.
 * @property {number} cols - The number of columns of frames in the source image.
 * @property {number=} rows - The number of rows of frames in the source image.
 * @property {number=} speedFactor - The number of ticks each frame is shown for.
 * @property {number=} offsetX - The size of the left margin in the source image, in pixels.
 * @property {number=} offsetY - The size of the top margin in the source image, in pixels.
 */
