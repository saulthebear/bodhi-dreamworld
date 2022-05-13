function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

import { GameObject } from "./GameObject.js";
/**
 * Collectable items in the game.
 * @extends GameObject
 */

var _minY = /*#__PURE__*/new WeakMap();

var _maxY = /*#__PURE__*/new WeakMap();

var _fractionalY = /*#__PURE__*/new WeakMap();

var _bobDirection = /*#__PURE__*/new WeakMap();

var _bobSpeed = /*#__PURE__*/new WeakMap();

export var Treat = /*#__PURE__*/function (_GameObject) {
  _inherits(Treat, _GameObject);

  var _super = _createSuper(Treat);

  /**
   * Called whenever a player collides with a treat. Removes the treat from
   * {@link treats} so that is no longer rendered or updated.
   * @type {function}
   * @static
   */

  /**
   * The highest vertical position the treat can bob up to when moving up and
   * down.
   * @type {number}
   */

  /**
   * The lowest vertical position the treat can bob down to when moving up and
   * down.
   * @type {number}
   */

  /**
   * The current vertical position, in fractional pixels. This number is rounded
   * to an integer before rendering to ensure the image is sharp.
   * @type {number}
   */

  /**
   * The direction the treat is currently moving.
   * @type {"UP" | "DOWN"}
   */

  /**
   * The speed in pixels per tick that the treat moves up and down.
   * Set to a random value between 0.05 and 0.06, so all treats aren't bobbing
   * in sync.
   */

  /**
   * @param {number} x - Horizontal position in pixels.
   * @param {number} y - Vertical starting position in pixels.
   * @param {number} width - In pixels.
   * @param {number} height - In pixels.
   */
  function Treat(x, y, width, height) {
    var _this;

    _classCallCheck(this, Treat);

    _this = _super.call(this, x, y, width, height, "lightgreen");
    /**
     * Sprite to render.
     * @type {HTMLImageElement}
     */

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _minY, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _maxY, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _fractionalY, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _bobDirection, {
      writable: true,
      value: "UP"
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _bobSpeed, {
      writable: true,
      value: 0.05 + Math.random() * 0.01
    });

    _this.image = new Image();
    _this.image.src = "./sprites/fish.png"; // Initialize values for bobbing up and down

    _classPrivateFieldSet(_assertThisInitialized(_this), _minY, y - 3);

    _classPrivateFieldSet(_assertThisInitialized(_this), _maxY, y);

    _classPrivateFieldSet(_assertThisInitialized(_this), _fractionalY, y);

    return _this;
  }
  /**
   * Check if an object is colliding with the treat, and if it is call the
   * static {@link Treat.collectionCallback}
   * @param {GameObject} object - Object that might be colliding with the treat.
   */


  _createClass(Treat, [{
    key: "collide",
    value: function collide(object) {
      if (this.isColliding(object)) {
        Treat.collectionCallback(this);
      }
    }
    /**@override */

  }, {
    key: "imageInfo",
    get: function get() {
      return {
        image: this.image,
        sx: 0,
        sy: 0,
        sWidth: 6,
        sHeight: 6,
        dx: this.x,
        dy: this.y,
        dWidth: this.width,
        dHeight: this.height
      };
    }
    /**
     * Update the vertical position so that the treat bobs up and down
     */

  }, {
    key: "update",
    value: function update() {
      if (_classPrivateFieldGet(this, _fractionalY) <= _classPrivateFieldGet(this, _minY) && _classPrivateFieldGet(this, _bobDirection) === "UP") {
        _classPrivateFieldSet(this, _bobDirection, "DOWN");
      } else if (_classPrivateFieldGet(this, _fractionalY) >= _classPrivateFieldGet(this, _maxY) && _classPrivateFieldGet(this, _bobDirection) === "DOWN") {
        _classPrivateFieldSet(this, _bobDirection, "UP");
      }

      if (_classPrivateFieldGet(this, _bobDirection) === "UP") _classPrivateFieldSet(this, _fractionalY, _classPrivateFieldGet(this, _fractionalY) - _classPrivateFieldGet(this, _bobSpeed));else _classPrivateFieldSet(this, _fractionalY, _classPrivateFieldGet(this, _fractionalY) + _classPrivateFieldGet(this, _bobSpeed));
      this.y = Math.round(_classPrivateFieldGet(this, _fractionalY));
    }
  }]);

  return Treat;
}(GameObject);

_defineProperty(Treat, "collectionCallback", function () {});