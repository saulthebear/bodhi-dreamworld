import { GameObject } from "./GameObject.js"

/**
 * Object that when reached ends the level.
 * @extends GameObject
 */
export class GoalObject extends GameObject {
  /**
   * @param {number} x - horizontal position, in pixels
   * @param {number} y - vertical position, in pixels
   * @param {number} width - in pixels
   * @param {number} height - in pixels
   */
  constructor(x, y, width, height) {
    super(x, y, width, height * 2, "red")

    /**
     * The sprite to render.
     * @type {HTMLImageElement}
     */
    this.image = new Image()
    this.image.src = "./sprites/jar.png"
  }

  /**
   * @override
   */
  get imageInfo() {
    return {
      image: this.image,
      sx: 0,
      sy: 0,
      sWidth: 12,
      sHeight: 12,
      dx: this.x,
      dy: this.y,
      dWidth: this.width,
      dHeight: this.height,
    }
  }
}
