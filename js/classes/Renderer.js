/**
 * Handles rendering to the canvas.
 * When an something is drawn it is first added to an offscreen canvas (buffer),
 * and that buffer is drawn to the onscreen canvas only when render() is called.
 * This optimizes performance.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
 */
export class Renderer {
  /**
   * Offscreen canvas's context to prerender to.
   * @type {CanvasRenderingContext2D}
   */
  #buffer

  /**
   * Onscreen canvas context
   * @type {CanvasRenderingContext2D}
   */
  #ctx

  /**
   * @param {HTMLCanvasElement} canvas - Onscreen canvas
   * @param {number} worldWidth - The width of the world that will be rendered,
   * in pixels
   * @param {number} worldHeight - The height of the world that will be rendered,
   * in pixels.
   */
  constructor(canvas, worldWidth, worldHeight) {
    this.#buffer = document.createElement("canvas").getContext("2d")
    this.#ctx = canvas.getContext("2d")

    this.#buffer.canvas.width = worldWidth
    this.#buffer.canvas.height = worldHeight
  }

  /**
   * Draw the buffer to the onscreen canvas
   */
  render() {
    this.#ctx.drawImage(
      this.#buffer.canvas,
      0,
      0,
      this.#buffer.canvas.width,
      this.#buffer.canvas.height,
      0,
      0,
      this.#ctx.canvas.width,
      this.#ctx.canvas.height
    )
  }

  /**
   * Fill the canvas with a solid color.
   * @param {string} color - Color to draw
   */
  fill(color) {
    this.#buffer.fillStyle = color
    this.#buffer.fillRect(
      0,
      0,
      this.#buffer.canvas.width,
      this.#buffer.canvas.height
    )
  }

  /**
   * Draw a rectangle on the canvas
   * @param {number} x - horizontal starting position
   * @param {number} y - vertical starting position
   * @param {number} width - rectangle width, in pixels
   * @param {number} height - rectangle height, in pixels
   * @param {string} color - color to fill the rectangle with
   */
  drawRectangle(x, y, width, height, color) {
    this.#buffer.fillStyle = color
    this.#buffer.fillRect(x, y, width, height)
  }

  /**
   * Draw a game object on the canvas, as a solid rectangle.
   * @param {GameObject} object - the object to draw
   */
  drawObject({ x, y, width, height, color }) {
    this.drawRectangle(x, y, width, height, color)
  }

  /**
   * Draw a sprite on the canvas.
   * @param {ImageInfo} imageInfo - Information about the sprite to draw.
   */
  drawImage({ image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight }) {
    this.#buffer.drawImage(
      image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    )
  }

  /**
   * Set the onscreen canvas's width and height to fit into an available space,
   * while maintaining a given aspect ratio.
   * @param {number} availableWidth - in pixels.
   * @param {number} availableHeight - in pixels.
   * @param {number} aspectRatio - width / height
   */
  resizeCanvas(availableWidth, availableHeight, aspectRatio) {
    let newWidth = availableWidth
    let newHeight = availableHeight

    if (availableWidth / availableHeight > aspectRatio) {
      newWidth = aspectRatio * availableHeight
    } else {
      newHeight = availableWidth / aspectRatio
    }

    this.#ctx.canvas.width = newWidth
    this.#ctx.canvas.height = newHeight

    this.#ctx.imageSmoothingEnabled = false
  }
}
