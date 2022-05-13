function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Parent class for objects in the game world.
 * Has properties for position, size, and color.
 * Contains convenience methods for finding the position of an object's four
 * edges.
 * Contains methods for detecting collisions with other objects.
 */
export var GameObject = /*#__PURE__*/function () {
  /**
   * @param {number} x - horizontal position in pixels
   * @param {number} y - vertical position in pixels
   * @param {number} width - in pixels
   * @param {number} height - in pixels
   * @param {string} color - color to render if no sprite is present
   */
  function GameObject(x, y, width, height, color) {
    _classCallCheck(this, GameObject);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  /** The y coordinate of the top edge of the object, in pixels. */


  _createClass(GameObject, [{
    key: "top",
    get: function get() {
      return this.y;
    }
    /** The x coordinate of the right edge of the object, in pixels. */
    ,
    set: function set(y) {
      this.y = y;
    }
  }, {
    key: "right",
    get: function get() {
      return this.x + this.width;
    }
    /** The y coordinate of the bottom edge of the object, in pixels. */
    ,
    set: function set(x) {
      this.x = x - this.width;
    }
  }, {
    key: "bottom",
    get: function get() {
      return this.y + this.height;
    }
    /** The x coordinate of the left edge of the object, in pixels. */
    ,
    set: function set(y) {
      this.y = y - this.height;
    }
    /**
     * Is the passed object within the column above, below, or within, this object?
     * @param {GameObject} object
     * @returns {boolean}
     */

  }, {
    key: "left",
    get: function get() {
      return this.x;
    }
    /**
     * Information about this object's sprite.
     * @type {ImageInfo}
     * @abstract
     */
    ,
    set: function set(x) {
      this.x = x;
    }
  }, {
    key: "imageInfo",
    get: function get() {}
  }, {
    key: "isWithinWidth",
    value: function isWithinWidth(object) {
      return object.right > this.left && object.left < this.right;
    }
    /**
     * Is the passed object within the row left, right, or within this object?
     * @param {GameObject} object
     * @returns {boolean}
     */

  }, {
    key: "isWithinHeight",
    value: function isWithinHeight(object) {
      return object.bottom > this.top && object.top < this.bottom;
    }
    /**
     * Is the passed object colliding with this object?
     * @param {GameObject} object
     * @returns {boolean}
     */

  }, {
    key: "isColliding",
    value: function isColliding(object) {
      return this.isWithinWidth(object) && this.isWithinHeight(object);
    }
  }]);

  return GameObject;
}();
/********************
 * TYPE DEFINITIONS *
 ********************/

/**
 * Information about a sprite
 * @typedef ImageInfo
 * @property {HTMLImageElement} image - The source image to render
 * @property {number} sx - Starting x position in the source image
 * @property {number} sy - Starting y position in the source image
 * @property {number} sWidth - Width to crop to in source image
 * @property {number} sHeight - Height to crop to in source image
 * @property {number} dx - Destination x position
 * @property {number} dy - Destination y position
 * @property {number} dWidth - Rendered width
 * @property {number} dHeight - Rendered height
 */