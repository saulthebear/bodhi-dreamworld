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

var _image = /*#__PURE__*/new WeakMap();

var _width = /*#__PURE__*/new WeakMap();

var _height = /*#__PURE__*/new WeakMap();

var _rows = /*#__PURE__*/new WeakMap();

var _cols = /*#__PURE__*/new WeakMap();

var _offsetX = /*#__PURE__*/new WeakMap();

var _offsetY = /*#__PURE__*/new WeakMap();

var _speedFactor = /*#__PURE__*/new WeakMap();

var _frameWidth = /*#__PURE__*/new WeakMap();

var _frameHeight = /*#__PURE__*/new WeakMap();

var _currFrame = /*#__PURE__*/new WeakMap();

var _partialFrame = /*#__PURE__*/new WeakMap();

/**
 * Holds an animated sprite (a single sprite sheet, with multiple rows and/or
 * columns of image frames). Abstracts the process of finding the current / next
 * animation frames.
 */
export var Sprite = /*#__PURE__*/function () {
  /**
   * The source image
   * @type {HTMLImageElement}
   */

  /**
   * The full width of the source image in pixels
   * @type {number}
   */

  /**
   * The full height of the source image in pixels
   * @type {number}
   */

  /**
   * The number of rows of frames in the source image.
   * @type {number}
   */

  /**
   * The number of columns of frames in the source image.
   * @type {number}
   */

  /**
   * The size of the left margin in the source image, in pixels.
   * @type {number}
   */

  /**
   * The size of the top margin in the source image, in pixels.
   * @type {number}
   */

  /**
   * The number of ticks each frame is shown for.
   * @type {number}
   */

  /**
   * The width of a single frame in the sprite image (one column), in pixels.
   * @type {number}
   */

  /**
   * The height of a single frame in the sprite image (one row), in pixels.
   * @type {number}
   */

  /**
   * Tracks the number of the current frame being shown.
   * @type {number}
   */

  /**
   * A number updated each tick, until the next frame can be shown, as
   * determined by the speed factor.
   * @type {number}
   */

  /**
   * @param {SpriteConfig} config
   */
  function Sprite(_ref) {
    var image = _ref.image,
        width = _ref.width,
        height = _ref.height,
        cols = _ref.cols,
        _ref$rows = _ref.rows,
        rows = _ref$rows === void 0 ? 1 : _ref$rows,
        _ref$speedFactor = _ref.speedFactor,
        speedFactor = _ref$speedFactor === void 0 ? 1 : _ref$speedFactor,
        _ref$offsetX = _ref.offsetX,
        offsetX = _ref$offsetX === void 0 ? 0 : _ref$offsetX,
        _ref$offsetY = _ref.offsetY,
        offsetY = _ref$offsetY === void 0 ? 0 : _ref$offsetY;

    _classCallCheck(this, Sprite);

    _classPrivateFieldInitSpec(this, _image, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _width, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _height, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _rows, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _cols, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _offsetX, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _offsetY, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _speedFactor, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _frameWidth, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _frameHeight, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _currFrame, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _partialFrame, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _image, image);

    _classPrivateFieldSet(this, _width, width);

    _classPrivateFieldSet(this, _height, height);

    _classPrivateFieldSet(this, _cols, cols);

    _classPrivateFieldSet(this, _rows, rows);

    _classPrivateFieldSet(this, _offsetX, offsetX);

    _classPrivateFieldSet(this, _offsetY, offsetY);
    /**
     * The row in source image to use.
     * @type {number}
     */


    this.activeRow = 0;

    _classPrivateFieldSet(this, _frameWidth, width / cols);

    _classPrivateFieldSet(this, _frameHeight, height / rows);

    _classPrivateFieldSet(this, _currFrame, 0);

    _classPrivateFieldSet(this, _partialFrame, 0);

    _classPrivateFieldSet(this, _speedFactor, speedFactor);
  }
  /**
   * Returns information about the current frame to show, and calls
   * {@link incrementFrame}.
   * @returns {ImageInfo}
   */


  _createClass(Sprite, [{
    key: "frame",
    value: function frame() {
      var info = {
        image: _classPrivateFieldGet(this, _image),
        sx: _classPrivateFieldGet(this, _frameWidth) * _classPrivateFieldGet(this, _currFrame) + _classPrivateFieldGet(this, _offsetX),
        sy: _classPrivateFieldGet(this, _frameHeight) * this.activeRow + _classPrivateFieldGet(this, _offsetY),
        sWidth: _classPrivateFieldGet(this, _frameWidth),
        sHeight: _classPrivateFieldGet(this, _frameHeight)
      };
      this.incrementFrame();
      return info;
    }
    /**
     * Ticks up partialFrame, and increments currFrame if partialFrame is equal to
     * the speedFactor.
     */

  }, {
    key: "incrementFrame",
    value: function incrementFrame() {
      var _this$partialFrame, _this$partialFrame2;

      _classPrivateFieldSet(this, _partialFrame, (_this$partialFrame = _classPrivateFieldGet(this, _partialFrame), _this$partialFrame2 = _this$partialFrame++, _this$partialFrame)), _this$partialFrame2;

      if (_classPrivateFieldGet(this, _partialFrame) === _classPrivateFieldGet(this, _speedFactor)) {
        var _this$currFrame, _this$currFrame2;

        _classPrivateFieldSet(this, _partialFrame, 0);

        _classPrivateFieldSet(this, _currFrame, (_this$currFrame = _classPrivateFieldGet(this, _currFrame), _this$currFrame2 = _this$currFrame++, _this$currFrame)), _this$currFrame2;
        if (_classPrivateFieldGet(this, _currFrame) >= _classPrivateFieldGet(this, _cols)) _classPrivateFieldSet(this, _currFrame, 0);
      }
    }
  }]);

  return Sprite;
}();
/********************
 * TYPE DEFINITIONS *
 ********************/

/**
 * @typedef SpriteConfig
 * @property {HTMLImageElement} image - An animation sprite image.
 * @property {number} width - The full width of the source image in pixels.
 * @property {number} height - The full height of the source image in pixels.
 * @property {number} cols - The number of columns of frames in the source image.
 * @property {number=} rows - The number of rows of frames in the source image.
 * @property {number=} speedFactor - The number of ticks each frame is shown for.
 * @property {number=} offsetX - The size of the left margin in the source image, in pixels.
 * @property {number=} offsetY - The size of the top margin in the source image, in pixels.
 */