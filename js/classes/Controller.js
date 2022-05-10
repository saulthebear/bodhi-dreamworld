export class Controller {
  constructor() {
    // Being active and being pressed are independent
    // So that we can programmatically set the active state
    // eg. disabling repeated jumping when up key is held down
    this.upActive = false
    this.isUpKeyPressed = false

    this.leftActive = false
    this.isLeftKeyPressed = false

    this.rightActive = false
    this.isRightKeyPressed = false
  }

  handleKeyPress(type, key) {
    const isKeyDown = type === "keydown"

    switch (key) {
      case "w":
      case "ArrowUp":
        if (this.isUpKeyPressed != isKeyDown) {
          this.upActive = isKeyDown
        }
        this.isUpKeyPressed = isKeyDown
        break
      case "a":
      case "ArrowLeft":
        this.isLeftKeyPressed = isKeyDown
        this.leftActive = isKeyDown
        break
      case "d":
      case "ArrowRight":
        this.isRightKeyPressed = isKeyDown
        this.rightActive = isKeyDown
        break
    }
  }
}
