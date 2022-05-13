function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Level } from "./Level.js";
import { Player } from "./Player.js";
import { Treat } from "./Treat.js";
import { BrushProjectile } from "./Projectile.js"; // Level Maps

import { level1Map } from "../levels/level1.js";
import { level2Map } from "../levels/level2.js";
import { level3Map } from "../levels/level3.js";
/**
 * The game holds the world which contains all the level's objects.
 * The game also calls the world's `update` method, which in turn calls all the
 * world objects' `update` methods.
 * @property {string[]} levels - Level maps in string representations
 * @property {GameWorld} world - The game world, holding the current level's
 * objects and properties.
 * @property {number} timer - Seconds elapsed since start of level.
 * @property {boolean} gameOver - Did the current level end?
 */

export var Game = /*#__PURE__*/function () {
  /**
   * @typedef GameConfig
   * @property {number} level - The level to load
   */

  /**
   * @param {GameConfig} config
   */
  function Game(_ref) {
    var level = _ref.level;

    _classCallCheck(this, Game);

    var blockSize = 6;
    var currLevel = new Level(Game.levels[level - 1], blockSize);
    this.world = new GameWorld(currLevel, blockSize);
    this.timer = 0;
  }
  /**
   * Updates the game world, level timer, and sets the gameOver prop.
   * @param {number} timeStep - seconds between update calls
   */


  _createClass(Game, [{
    key: "update",
    value: function update(timeStep) {
      this.timer += timeStep;
      this.world.update(timeStep);
      this.gameOver = this.world.gameOver;
    }
  }]);

  return Game;
}();
/**
 * Holds all the objects in the level, and updates them.
 */

_defineProperty(Game, "levels", [level1Map, level2Map, level3Map]);

var _brushTriggerTime = /*#__PURE__*/new WeakMap();

var _brushTimeElapsed = /*#__PURE__*/new WeakMap();

var _checkWin = /*#__PURE__*/new WeakSet();

var _collectTreat = /*#__PURE__*/new WeakSet();

var _spawnBrushes = /*#__PURE__*/new WeakSet();

var GameWorld = /*#__PURE__*/function () {
  /**
   * Time in seconds between brush spawns.
   * @type {number}
   * @private
   */

  /**
   * Time elapsed since last brush spawn. Initialized to equal brushTriggerTime,
   * so that spawning starts immediately.
   * @type {number}
   * @private
   */
  function GameWorld(level, blockSize) {
    _classCallCheck(this, GameWorld);

    _classPrivateMethodInitSpec(this, _spawnBrushes);

    _classPrivateMethodInitSpec(this, _collectTreat);

    _classPrivateMethodInitSpec(this, _checkWin);

    _classPrivateFieldInitSpec(this, _brushTriggerTime, {
      writable: true,
      value: 3
    });

    _classPrivateFieldInitSpec(this, _brushTimeElapsed, {
      writable: true,
      value: 3
    });

    /** Has the level been completed?
     * @type {boolean} */
    this.gameOver = false;
    /** The width of the world in pixels
     * @type {number} */

    this.width = level.width;
    /** The height of the world in pixels
     * @type {number} */

    this.height = level.height;
    /** All the platforms in the level
     * @type {Platform[]} */

    this.platforms = level.platforms;
    /** All the goal objects in the level. When reached the level ends.
     * @type {GoalObject[]} */

    this.goals = level.goals;
    /** All the treats (collectable items) in the level.
     * @type {Treat[]} */

    this.treats = level.treats;
    /** How many treats are there in the level. Not the number of treats at
     * any given time, but the total number at the start.
     * @type {number} */

    this.totalTreats = this.treats.length;
    /** All the brush projectiles currently in the level.
     * @type {Projectile[]} */

    this.brushes = [];
    /** Information about where brush projectiles spawn, and their direction of
     * travel.
     * @type {BrushSpawn[]} */

    this.brushSpawns = level.brushSpawns;
    /** The background image of the level.
     * This is the image to be used when clearing the canvas.
     * @type {HTMLImageElement} */

    this.bgImage = new Image();
    this.bgImage.src = "./sprites/bg-sky.png";
    var playerSize = blockSize * 2;
    /**
     * @type {Player} */

    this.player = new Player(level.player.x, level.player.y, playerSize, playerSize); // Called whenever a treat is collided with

    Treat.collectionCallback = _classPrivateMethodGet(this, _collectTreat, _collectTreat2).bind(this);
    /** Downward velocity added every tick, in pixels
     * @type {number}
     */

    this.gravity = 3;
    /** Multiplier added to velocity every tick
     * @type {number}
     */

    this.friction = 0.7;
  }
  /**
   * The aspect ratio of the level (width / height)
   * @returns {number} - Aspect ratio
   */


  _createClass(GameWorld, [{
    key: "aspectRatio",
    get: function get() {
      return this.width / this.height;
    }
    /**
     * Prevent the object passed in from leaving the world bounds.
     * If the object passed in is outside the bounds of the world, set its
     * position, so that it is inside the world.
     * @param {GameObject} object
     */

  }, {
    key: "collideWithWorldEdge",
    value: function collideWithWorldEdge(object) {
      if (object.left < 0) {
        // Object beyond left of world
        // Place object against left of world and stop its leftward velocity
        object.x = 0;
        object.xVelocity = 0;
      } else if (object.right > this.width) {
        // Object beyond right of world
        // Place object against right of world and stop its rightward velocity
        object.x = this.width - object.width;
        object.xVelocity = 0;
      }

      if (object.top < 0) {
        // Object beyond top of world
        // Place object against top of world and stop its upwards velocity
        object.y = 0;
        object.yVelocity = 0;
      } else if (object.bottom > this.height) {
        // Object beyond bottom of world
        // Place object on bottom of world and stop its downwards velocity
        object.y = this.height - object.height;
        object.yVelocity = 0;
        if (object.stopJump) object.stopJump();
      }
    }
    /**
     * Update all the objects in the level
     * @param {number} timeStep - Time between updates in seconds
     */

  }, {
    key: "update",
    value: function update(timeStep) {
      var _this = this;

      this.player.yVelocity += this.gravity;
      this.player.update();
      this.player.xVelocity *= this.friction;
      this.player.yVelocity *= this.friction;
      this.collideWithWorldEdge(this.player);
      this.platforms.forEach(function (platform) {
        return platform.applyColliders(_this.player);
      });
      this.treats.forEach(function (treat) {
        treat.collide(_this.player);
        treat.update();
      });

      _classPrivateMethodGet(this, _spawnBrushes, _spawnBrushes2).call(this, this.brushSpawns, timeStep);

      this.brushes.forEach(function (brush) {
        brush.collide(_this.player);
        brush.update();
      });

      _classPrivateMethodGet(this, _checkWin, _checkWin2).call(this);
    }
    /**
     * Check if the player is colliding with any {@link GoalObject}. If so, set
     * {@link gameOver} to `true`
     * @private
     */

  }]);

  return GameWorld;
}();

function _checkWin2() {
  var _this2 = this;

  var didWin = this.goals.some(function (goal) {
    return goal.isColliding(_this2.player);
  });

  if (didWin) {
    this.gameOver = true;
  }
}

function _collectTreat2(collectedTreat) {
  this.treats = this.treats.filter(function (treat) {
    return treat !== collectedTreat;
  });
}

function _spawnBrushes2(spawns, timeStep) {
  var _this3 = this;

  _classPrivateFieldSet(this, _brushTimeElapsed, _classPrivateFieldGet(this, _brushTimeElapsed) + timeStep);

  if (_classPrivateFieldGet(this, _brushTimeElapsed) > _classPrivateFieldGet(this, _brushTriggerTime)) {
    spawns.forEach(function (_ref2) {
      var spawnX = _ref2.spawnX,
          spawnY = _ref2.spawnY,
          direction = _ref2.direction;
      // Delay up to 1 second
      var randomDelay = Math.random() * 1000;
      setTimeout(function () {
        return _this3.brushes.push(new BrushProjectile({
          spawnX: spawnX,
          spawnY: spawnY,
          direction: direction
        }));
      }, randomDelay);
    });

    _classPrivateFieldSet(this, _brushTimeElapsed, _classPrivateFieldGet(this, _brushTimeElapsed) - _classPrivateFieldGet(this, _brushTriggerTime));
  }
}