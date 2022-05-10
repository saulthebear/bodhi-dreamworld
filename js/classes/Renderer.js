/*
  Handles rendering to the canvas
  When an something is drawn it is first added to an offscreen canvas (buffer),
  and that buffer is drawn to the onscreen canvas only when render() is called
*/

export class Renderer {
  // Offscreen canvas's context to prerender to.
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
  #buffer
  // Onscreen canvas context
  #ctx

  constructor(canvas, worldWidth, worldHeight) {
    this.#buffer = document.createElement("canvas").getContext("2d")
    this.#ctx = canvas.getContext("2d")

    this.#buffer.canvas.width = worldWidth
    this.#buffer.canvas.height = worldHeight
  }

  // Draw the buffer to the on screen canvas
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

  fill(color) {
    this.#buffer.fillStyle = color
    this.#buffer.fillRect(
      0,
      0,
      this.#buffer.canvas.width,
      this.#buffer.canvas.height
    )
  }

  drawRectangle(x, y, width, height, color) {
    this.#buffer.fillStyle = color
    this.#buffer.fillRect(x, y, width, height)
  }

  drawObject({ x, y, width, height, color }) {
    this.drawRectangle(x, y, width, height, color)
  }

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

  write(text) {
    this.#buffer.textAlign = "center"
    this.#buffer.fillStyle = "white"
    this.#buffer.font = "20px serif"
    const centerX = this.#buffer.canvas.width / 2
    const centerY = this.#buffer.canvas.height / 2
    this.#buffer.fillText(text, centerX, centerY)
  }

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
