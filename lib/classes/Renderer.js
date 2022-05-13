function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _buffer = /*#__PURE__*/new WeakMap();

var _ctx = /*#__PURE__*/new WeakMap();

/**
 * Handles rendering to the canvas.
 * When an something is drawn it is first added to an offscreen canvas (buffer),
 * and that buffer is drawn to the onscreen canvas only when render() is called.
 * This optimizes performance.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
 */
export var Renderer = /*#__PURE__*/function () {
  /**
   * Offscreen canvas's context to prerender to.
   * @type {CanvasRenderingContext2D}
   */

  /**
   * Onscreen canvas context
   * @type {CanvasRenderingContext2D}
   */

  /**
   * @param {HTMLCanvasElement} canvas - Onscreen canvas
   * @param {number} worldWidth - The width of the world that will be rendered,
   * in pixels
   * @param {number} worldHeight - The height of the world that will be rendered,
   * in pixels.
   */
  function Renderer(canvas, worldWidth, worldHeight) {
    _classCallCheck(this, Renderer);

    _classPrivateFieldInitSpec(this, _buffer, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _ctx, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _buffer, document.createElement("canvas").getContext("2d"));

    _classPrivateFieldSet(this, _ctx, canvas.getContext("2d"));

    _classPrivateFieldGet(this, _buffer).canvas.width = worldWidth;
    _classPrivateFieldGet(this, _buffer).canvas.height = worldHeight;
  }
  /**
   * Draw the buffer to the onscreen canvas
   */


  _createClass(Renderer, [{
    key: "render",
    value: function render() {
      _classPrivateFieldGet(this, _ctx).drawImage(_classPrivateFieldGet(this, _buffer).canvas, 0, 0, _classPrivateFieldGet(this, _buffer).canvas.width, _classPrivateFieldGet(this, _buffer).canvas.height, 0, 0, _classPrivateFieldGet(this, _ctx).canvas.width, _classPrivateFieldGet(this, _ctx).canvas.height);
    }
    /**
     * Fill the canvas with a solid color.
     * @param {string} color - Color to draw
     */

  }, {
    key: "fill",
    value: function fill(color) {
      _classPrivateFieldGet(this, _buffer).fillStyle = color;

      _classPrivateFieldGet(this, _buffer).fillRect(0, 0, _classPrivateFieldGet(this, _buffer).canvas.width, _classPrivateFieldGet(this, _buffer).canvas.height);
    }
    /**
     * Draw a rectangle on the canvas
     * @param {number} x - horizontal starting position
     * @param {number} y - vertical starting position
     * @param {number} width - rectangle width, in pixels
     * @param {number} height - rectangle height, in pixels
     * @param {string} color - color to fill the rectangle with
     */

  }, {
    key: "drawRectangle",
    value: function drawRectangle(x, y, width, height, color) {
      _classPrivateFieldGet(this, _buffer).fillStyle = color;

      _classPrivateFieldGet(this, _buffer).fillRect(x, y, width, height);
    }
    /**
     * Draw a game object on the canvas, as a solid rectangle.
     * @param {GameObject} object - the object to draw
     */

  }, {
    key: "drawObject",
    value: function drawObject(_ref) {
      var x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          height = _ref.height,
          color = _ref.color;
      this.drawRectangle(x, y, width, height, color);
    }
    /**
     * Draw a sprite on the canvas.
     * @param {ImageInfo} imageInfo - Information about the sprite to draw.
     */

  }, {
    key: "drawImage",
    value: function drawImage(_ref2) {
      var image = _ref2.image,
          sx = _ref2.sx,
          sy = _ref2.sy,
          sWidth = _ref2.sWidth,
          sHeight = _ref2.sHeight,
          dx = _ref2.dx,
          dy = _ref2.dy,
          dWidth = _ref2.dWidth,
          dHeight = _ref2.dHeight;

      _classPrivateFieldGet(this, _buffer).drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
    /**
     * Set the onscreen canvas's width and height to fit into an available space,
     * while maintaining a given aspect ratio.
     * @param {number} availableWidth - in pixels.
     * @param {number} availableHeight - in pixels.
     * @param {number} aspectRatio - width / height
     */

  }, {
    key: "resizeCanvas",
    value: function resizeCanvas(availableWidth, availableHeight, aspectRatio) {
      var newWidth = availableWidth;
      var newHeight = availableHeight;

      if (availableWidth / availableHeight > aspectRatio) {
        newWidth = aspectRatio * availableHeight;
      } else {
        newHeight = availableWidth / aspectRatio;
      }

      _classPrivateFieldGet(this, _ctx).canvas.width = newWidth;
      _classPrivateFieldGet(this, _ctx).canvas.height = newHeight;
      _classPrivateFieldGet(this, _ctx).imageSmoothingEnabled = false;
    }
  }]);

  return Renderer;
}();