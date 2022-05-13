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

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

import { GameObject } from "./GameObject.js";
import { Sprite } from "./Sprite.js";
/**
 * The character that the user controls.
 * @extends GameObject
 */

var _isJumping = /*#__PURE__*/new WeakMap();

var _width = /*#__PURE__*/new WeakMap();

var _height = /*#__PURE__*/new WeakMap();

var _idleRightSprite = /*#__PURE__*/new WeakMap();

var _idleLeftSprite = /*#__PURE__*/new WeakMap();

var _runRightSprite = /*#__PURE__*/new WeakMap();

var _runLeftSprite = /*#__PURE__*/new WeakMap();

var _currentSprite = /*#__PURE__*/new WeakMap();

var _direction = /*#__PURE__*/new WeakMap();

var _xSpeed = /*#__PURE__*/new WeakMap();

var _addSprites = /*#__PURE__*/new WeakSet();

var _idle = /*#__PURE__*/new WeakSet();

var _run = /*#__PURE__*/new WeakSet();

export var Player = /*#__PURE__*/function (_GameObject) {
  _inherits(Player, _GameObject);

  var _super = _createSuper(Player);

  /** Is the player currently jumping?
   * @type {boolean}
   */

  /** The width of the player, in pixels.
   * Changes based on player action. Eg. is larger when running
   * @type {number}
   */

  /** The height of the player, in pixels.
   * Changes based on player action.
   * @type {number}
   */

  /** The sprite to render when player is sitting still, facing right.
   * @type {Sprite}
   */

  /** The sprite to render when player is sitting still, facing left.
   * @type {Sprite}
   */

  /** The sprite to render when player is moving right.
   * @type {Sprite}
   */

  /** The sprite to render when player is moving left.
   * @type {Sprite}
   */

  /** The current sprite to render.
   * @type {Sprite}
   */

  /** The direction the player is facing
   * @type {"right" | "left"}
   */

  /** The absolute value by which velocity is changed when moving left/right,
   * in pixels per tick
   * @type {number}
   */

  /**
   * @param {number} x - horizontal position, in pixels
   * @param {number} y - vertical position, in pixels
   * @param {number} width - Initial width, in pixels
   * @param {number} height - Initial height, in pixels
   */
  function Player(x, y, width, height) {
    var _this;

    _classCallCheck(this, Player);

    var color = "white";
    _this = _super.call(this, x, y, width, height, color);
    /** Horizontal velocity, in pixels per tick.
     * Positive values go right, negative values go left.
     * @type {number}
     */

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _run);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _idle);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _addSprites);

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _isJumping, {
      writable: true,
      value: false
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _width, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _height, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _idleRightSprite, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _idleLeftSprite, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _runRightSprite, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _runLeftSprite, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _currentSprite, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _direction, {
      writable: true,
      value: "right"
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _xSpeed, {
      writable: true,
      value: 0.6
    });

    _this.xVelocity = 0;
    /** Vertical velocity, in pixels per tick.
     * Positive values go down, negative values go up.
     * @type {number}
     */

    _this.yVelocity = 0;

    _classPrivateFieldSet(_assertThisInitialized(_this), _width, width);

    _classPrivateFieldSet(_assertThisInitialized(_this), _height, height);

    _classPrivateMethodGet(_assertThisInitialized(_this), _addSprites, _addSprites2).call(_assertThisInitialized(_this));

    return _this;
  }
  /**
   * Update the player's position, based on its velocity.
   * Called once per tick.
   */


  _createClass(Player, [{
    key: "update",
    value: function update() {
      // Previous position used for collision detection
      this.prevX = this.x;
      this.prevY = this.y;
      if (Math.abs(this.xVelocity) < 0.1) _classPrivateMethodGet(this, _idle, _idle2).call(this);
      this.x = Math.round(this.x + this.xVelocity);
      this.y = Math.round(this.y + this.yVelocity);
    }
    /**
     * Increase horizontal velocity in the left direction.
     */

  }, {
    key: "moveLeft",
    value: function moveLeft() {
      _classPrivateMethodGet(this, _run, _run2).call(this, "left");

      this.xVelocity -= _classPrivateFieldGet(this, _xSpeed);
    }
    /**
     * Increase horizontal velocity in the right direction.
     */

  }, {
    key: "moveRight",
    value: function moveRight() {
      _classPrivateMethodGet(this, _run, _run2).call(this, "right");

      this.xVelocity += _classPrivateFieldGet(this, _xSpeed);
    }
    /**
     * Increase player's upward velocity, if not already jumping.
     */

  }, {
    key: "jump",
    value: function jump() {
      // Disallow jumping in the air
      if (!_classPrivateFieldGet(this, _isJumping)) {
        this.yVelocity -= 20;

        _classPrivateFieldSet(this, _isJumping, true);
      }
    }
    /**
     * Allow the player to jump again. Called when player hits the ground.
     */

  }, {
    key: "stopJump",
    value: function stopJump() {
      _classPrivateFieldSet(this, _isJumping, false);
    }
    /**
     * Get the current sprite set to the correct animation frame.
     * @override
     */

  }, {
    key: "imageInfo",
    get: function get() {
      var imageInfo = _classPrivateFieldGet(this, _currentSprite).frame();

      imageInfo.dx = this.x;
      imageInfo.dy = this.y;
      imageInfo.dWidth = _classPrivateFieldGet(this, _width) + 1;
      imageInfo.dHeight = _classPrivateFieldGet(this, _height);
      return imageInfo;
    }
    /**
     * Initialize all the sprites for different actions.
     */

  }]);

  return Player;
}(GameObject);

function _addSprites2() {
  var idleAnimationFactor = 20;
  var runAnimationFactor = 5;
  var idleRightImage = new Image();
  idleRightImage.src = "./sprites/idle-right.png";

  _classPrivateFieldSet(this, _idleRightSprite, new Sprite({
    image: idleRightImage,
    width: 52,
    height: 12,
    cols: 4,
    speedFactor: idleAnimationFactor
  }));

  var idleLeftImage = new Image();
  idleLeftImage.src = "./sprites/idle-left.png";

  _classPrivateFieldSet(this, _idleLeftSprite, new Sprite({
    image: idleLeftImage,
    width: 52,
    height: 12,
    cols: 4,
    speedFactor: idleAnimationFactor
  }));

  var runRightImage = new Image();
  runRightImage.src = "./sprites/run-right.png";

  _classPrivateFieldSet(this, _runRightSprite, new Sprite({
    image: runRightImage,
    width: 136,
    height: 12,
    cols: 8,
    speedFactor: runAnimationFactor
  }));

  var runLeftImage = new Image();
  runLeftImage.src = "./sprites/run-left.png";

  _classPrivateFieldSet(this, _runLeftSprite, new Sprite({
    image: runLeftImage,
    width: 136,
    height: 12,
    cols: 8,
    speedFactor: runAnimationFactor
  }));
}

function _idle2() {
  _classPrivateFieldSet(this, _currentSprite, _classPrivateFieldGet(this, _direction) === "right" ? _classPrivateFieldGet(this, _idleRightSprite) : _classPrivateFieldGet(this, _idleLeftSprite));

  _classPrivateFieldSet(this, _width, _classPrivateFieldSet(this, _height, 12));
}

function _run2(direction) {
  _classPrivateFieldSet(this, _direction, direction);

  _classPrivateFieldSet(this, _width, 16);

  _classPrivateFieldSet(this, _height, 12);

  _classPrivateFieldSet(this, _currentSprite, _classPrivateFieldGet(this, _direction) === "right" ? _classPrivateFieldGet(this, _runRightSprite) : _classPrivateFieldGet(this, _runLeftSprite));
}