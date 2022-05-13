/**
 * Responsible for handling user input.
 * Sets properties such as `upActive` and `isUpActive` which can then be
 * accessed to see a particular action should be taken.
 * @property {boolean} upActive - Should up action be taken?
 * @property {boolean} isUpKeyPressed - Is the up key being pressed (held down)
 * @property {boolean} leftActive - Should left action be taken?
 * @property {boolean} isLeftKeyPressed - Is the left key being pressed (held down)
 * @property {boolean} rightActive - Should right action be taken?
 * @property {boolean} isRightKeyPressed - Is the right key being pressed (held down)
 */
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

  /**
   * Callback for keyup and keydown events.
   * Sets the active properties matching the key press.
   * @param {"keyup"|"keydown"} type - The type of input.
   * @param {string} key - The key that was pressed
   */
  handleKeyPress(type, key) {
    const isKeyDown = type === "keydown"

    switch (key) {
      case "w":
      case "ArrowUp":
        // Stop triggering if key is held down, until keyup
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
