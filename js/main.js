const canvas = document.querySelector("canvas")

class Renderer {
  constructor(canvas, aspectRatio) {
    this.canvas = canvas
    this.aspectRatio = aspectRatio
  }

  resize() {
    // Max size is based on browser window size
    const maxWidth = window.innerWidth * this.aspectRatio
    const maxHeight = window.innerHeight

    let newCanvasWidth = maxWidth
    let newCanvasHeight = maxHeight

    // Make canvas the maximum size it can be in the window while keeping its aspect ratio
    if (maxWidth > maxHeight) {
      newCanvasWidth = this.aspectRatio * maxHeight
    } else {
      newCanvasHeight = maxWidth / this.aspectRatio
    }

    this.canvas.width = newCanvasWidth
    this.canvas.height = newCanvasHeight
  }
}

const renderer = new Renderer(canvas, 0.83)
renderer.resize()
