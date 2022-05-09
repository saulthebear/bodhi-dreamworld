export class Sprite {
  #image
  #width
  #height
  #cols
  #frameWidth
  #currFrame
  #partialFrame
  #speedFactor
  constructor(image, width, height, cols, speedFactor) {
    this.#image = image

    this.#width = width
    this.#height = height
    this.#cols = cols

    this.#frameWidth = width / cols

    this.#currFrame = 0
    this.#partialFrame = 0
    this.#speedFactor = speedFactor
  }

  frame() {
    const info = {
      image: this.#image,
      sx: this.#frameWidth * this.#currFrame,
      sy: 0,
      sWidth: this.#frameWidth,
      sHeight: this.#height,
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
