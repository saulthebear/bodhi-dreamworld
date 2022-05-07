export class Controller {
  constructor() {
    this.upActive = false
    this.leftActive = false
    this.rightActive = false
  }
  handleKeyPress(type, key) {
    const isActive = type === "keydown"

    switch (key) {
      case "w":
      case "ArrowUp":
        this.upActive = isActive
        break
      case "a":
      case "ArrowLeft":
        this.leftActive = isActive
        break
      case "d":
      case "ArrowRight":
        this.rightActive = isActive
        break
    }
  }
}
