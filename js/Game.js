export class Game {
  constructor() {
    this.color = this.#randomColor()
  }

  update(timeStep) {
    this.color = this.#randomColor()
  }

  #randomColor() {
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)
    const alpha = Math.random()
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
  }
}
