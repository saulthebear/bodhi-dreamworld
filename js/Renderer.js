export class Renderer {
  // Offscreen canvas to prerender to.
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
  #buffer
  #ctx

  constructor(canvas, aspectRatio) {
    this.#buffer = document.createElement("canvas").getContext("2d")
    this.#ctx = canvas.getContext("2d")

    this.aspectRatio = aspectRatio
    this.#resizeCanvas()
  }

  render() {
    this.clearCanvas(this.#randomColor())
    this.#ctx.drawImage(this.#buffer.canvas, 0, 0)
  }

  clearCanvas(color) {
    this.#buffer.fillStyle = color
    this.#buffer.fillRect(
      0,
      0,
      this.#buffer.canvas.width,
      this.#buffer.canvas.height
    )
  }

  #randomColor() {
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)
    const alpha = Math.random()
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
  }

  #resizeCanvas() {
    // Max size is based on browser window size
    const maxWidth = document.documentElement.clientWidth * this.aspectRatio
    const maxHeight = document.documentElement.clientHeight
    let newCanvasWidth = maxWidth
    let newCanvasHeight = maxHeight
    // Make canvas the maximum size it can be in the window while keeping its aspect ratio
    if (maxWidth > maxHeight) {
      newCanvasWidth = this.aspectRatio * maxHeight
    } else {
      newCanvasHeight = maxWidth / this.aspectRatio
    }
    this.#ctx.canvas.width = newCanvasWidth
    this.#ctx.canvas.height = newCanvasHeight
    this.#buffer.canvas.width = newCanvasWidth
    this.#buffer.canvas.height = newCanvasHeight
  }
}
