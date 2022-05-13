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

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

import { GameObject } from "./GameObject.js";
/**
 * A platform with which the player collides.
 * @extends GameObject
 */

var _randomImageX = /*#__PURE__*/new WeakMap();

export var Platform = /*#__PURE__*/function (_GameObject) {
  _inherits(Platform, _GameObject);

  var _super = _createSuper(Platform);

  /**
   * A random x value within the width of the platform sprite. The platform's
   * sprite will be cropped from this value, giving each platform a different
   * look.
   * @type {number}
   */

  /**
   * @param {number} x - Horizontal position, in pixels
   * @param {number} y - Vertical position, in pixels
   * @param {number} width - In pixels
   * @param {number} height - In pixels
   * @param {CollisionDirections} collisionDirections - Sides of the platform
   * the player should collide with
   */
  function Platform(x, y, width, height) {
    var _this;

    var collisionDirections = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    _classCallCheck(this, Platform);

    var platformColor = "pink";
    _this = _super.call(this, x, y, width, height, platformColor);
    /** Sides of the platform the player should collide with.
     * @type {CollisionDirections}
     */

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _randomImageX, {
      writable: true,
      value: void 0
    });

    _this.collisionDirections = collisionDirections;
    /**
     * The sprite to render.
     * @type {HTMLImageElement}
     */

    _this.image = new Image();
    _this.image.src = "./sprites/platform-tile-grass.png";
    return _this;
  }
  /**
   * @override
   */


  _createClass(Platform, [{
    key: "imageInfo",
    get: function get() {
      if (!_classPrivateFieldGet(this, _randomImageX)) {
        var imageWidth = 144;

        _classPrivateFieldSet(this, _randomImageX, Math.floor(Math.random() * (imageWidth - this.width)));

        if (_classPrivateFieldGet(this, _randomImageX) < 0) _classPrivateFieldSet(this, _randomImageX, 0);
      }

      return {
        image: this.image,
        sx: _classPrivateFieldGet(this, _randomImageX),
        sy: 0,
        sWidth: this.width % 144,
        sHeight: 6,
        dx: this.x,
        dy: this.y,
        dWidth: this.width,
        dHeight: this.height
      };
    }
    /**
     * Check each of the directions defined in {@link Platform#collisionDirections}
     * and run the collider for that direction. At most one collider is applied,
     * so if it is eg. colliding with both the top and left, only the top collider
     * will be applied.
     * @param {GameObject} object - Object that might collide with the platform
     */

  }, {
    key: "applyColliders",
    value: function applyColliders(object) {
      var hasCollided = false;

      if (this.collisionDirections.top) {
        hasCollided = this.collideTop(object);
      }

      if (!hasCollided && this.collisionDirections.right) {
        hasCollided = this.collideRight(object);
      }

      if (!hasCollided && this.collisionDirections.bottom) {
        hasCollided = this.collideBottom(object);
      }

      if (!hasCollided && this.collisionDirections.left) {
        hasCollided = this.collideLeft(object);
      }
    }
    /**
     * Check if an object is colliding with the top of this platform. If it is,
     * stop its velocity in this direction and place it outside this platform.
     * @param {GameObject} object - Object that might collide with the platform
     * @returns {boolean} - Is the object colliding?
     */

  }, {
    key: "collideTop",
    value: function collideTop(object) {
      var wasAbove = object.prevY < this.top;

      if (this.isColliding(object) && wasAbove) {
        object.yVelocity = 0;
        object.bottom = this.top;
        object.stopJump();
        return true;
      }

      return false;
    }
    /**
     * Check if an object is colliding with the right of this platform. If it is,
     * stop its velocity in this direction and place it outside this platform.
     * @param {GameObject} object - Object that might collide with the platform
     * @returns {boolean} - Is the object colliding?
     */

  }, {
    key: "collideRight",
    value: function collideRight(object) {
      var wasRight = object.prevX >= this.right;

      if (this.isColliding(object) && wasRight) {
        object.left = this.right;
        object.xVelocity = 0;
        return true;
      }

      return false;
    }
    /**
     * Check if an object is colliding with the bottom of this platform. If it is,
     * stop its velocity in this direction and place it outside this platform.
     * @param {GameObject} object - Object that might collide with the platform
     * @returns {boolean} - Is the object colliding?
     */

  }, {
    key: "collideBottom",
    value: function collideBottom(object) {
      var wasBelow = object.prevY >= this.bottom;

      if (this.isColliding(object) && wasBelow) {
        object.top = this.bottom;
        object.yVelocity = 0;
        return true;
      }

      return false;
    }
    /**
     * Check if an object is colliding with the left of this platform. If it is,
     * stop its velocity in this direction and place it outside this platform.
     * @param {GameObject} object - Object that might collide with the platform
     * @returns {boolean} - Is the object colliding?
     */

  }, {
    key: "collideLeft",
    value: function collideLeft(object) {
      var wasLeft = object.prevX <= this.left;

      if (this.isColliding(object) && wasLeft) {
        object.right = this.left;
        object.xVelocity = 0;
        return true;
      }

      return false;
    }
  }]);

  return Platform;
}(GameObject);
/********************
 * TYPE DEFINITIONS *
 ********************/

/**
 * Sides of an object for which collisions should be checked
 * @typedef CollisionDirections
 * @param {boolean} top
 * @param {boolean} right
 * @param {boolean} bottom
 * @param {boolean} left
 */