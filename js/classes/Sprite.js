export class Sprite {
  #image
  #width
  #height
  #rows
  #cols
  #offsetX
  #offsetY
  #speedFactor

  #frameWidth
  #frameHeight

  #currFrame
  #partialFrame

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

    this.activeRow = 0

    this.#frameWidth = width / cols
    this.#frameHeight = height / rows

    this.#currFrame = 0
    this.#partialFrame = 0
    this.#speedFactor = speedFactor
  }

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

  incrementFrame() {
    this.#partialFrame++
    // console.log(this.#partialFrame)
    if (this.#partialFrame === this.#speedFactor) {
      this.#partialFrame = 0

      this.#currFrame++
      if (this.#currFrame >= this.#cols) this.#currFrame = 0
    }
  }
}
