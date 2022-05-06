/*
  Handles rendering to the canvas
  When an something is drawn it is first added to an offscreen canvas (buffer),
  and that buffer is drawn to the onscreen canvas only when render() is called
*/

export class Renderer {
  // Offscreen canvas to prerender to.
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
  #buffer
  #ctx

  constructor(canvas) {
    this.#buffer = document.createElement("canvas").getContext("2d")
    this.#ctx = canvas.getContext("2d")
  }

  render() {
    this.#ctx.drawImage(this.#buffer.canvas, 0, 0)
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

    this.#buffer.canvas.width = newWidth
    this.#buffer.canvas.height = newHeight
  }
}
