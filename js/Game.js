export class Game {
  constructor() {
    this.color = this.#randomColor()
    this.world = new GameWorld(250, 300)
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

class GameWorld {
  constructor() {
    this.width = 160
    this.height = 192
    this.player = new Player()
  }

  get aspectRatio() {
    return this.width / this.height
  }
}

class Player {
  constructor() {
    this.color = "white"
    this.height = 16
    this.width = 16
    this.x = 5
    this.y = 5
  }
}
