function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

import { Platform } from "./Platform.js";
import { GoalObject } from "./GoalObject.js";
import { Treat } from "./Treat.js";
/**
 * Responsible for parsing level maps into game objects.
 */

var _levelInfoObjects = /*#__PURE__*/new WeakMap();

var _platforms = /*#__PURE__*/new WeakMap();

var _player = /*#__PURE__*/new WeakMap();

var _goals = /*#__PURE__*/new WeakMap();

var _treats = /*#__PURE__*/new WeakMap();

var _brushSpawns = /*#__PURE__*/new WeakMap();

var _widthInBlocks = /*#__PURE__*/new WeakMap();

var _heightInBlocks = /*#__PURE__*/new WeakMap();

var _blockSize = /*#__PURE__*/new WeakMap();

var _splitString = /*#__PURE__*/new WeakSet();

var _parseLevelMap = /*#__PURE__*/new WeakSet();

var _addDetail = /*#__PURE__*/new WeakSet();

var _createPlatforms = /*#__PURE__*/new WeakSet();

var _infoObjects = /*#__PURE__*/new WeakSet();

export var Level = /*#__PURE__*/function () {
  /**
   * @type {DetailedLevelObject}
   */

  /**
   * @type {Platform[]}
   */

  /**
   * @type {Player}
   */

  /**
   * @type {GoalObject[]}
   */

  /**
   * @type {Treat[]}
   */

  /**
   * @type {BrushSpawn}
   */

  /**
   * The width of the level in "blocks". The pixel size of these blocks is
   * passed as a constructor to Level
   * @type {number}
   */

  /**
   * The height of the level in "blocks". The pixel size of these blocks is
   * passed as a constructor to Level
   * @type {number}
   */

  /**
   * The size in pixels of one block in the level map.
   * @type {number}
   */
  function Level(levelMap, blockSize) {
    var _this = this;

    _classCallCheck(this, Level);

    _classPrivateMethodInitSpec(this, _infoObjects);

    _classPrivateMethodInitSpec(this, _createPlatforms);

    _classPrivateMethodInitSpec(this, _addDetail);

    _classPrivateMethodInitSpec(this, _parseLevelMap);

    _classPrivateMethodInitSpec(this, _splitString);

    _classPrivateFieldInitSpec(this, _levelInfoObjects, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _platforms, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _player, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _goals, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _treats, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _brushSpawns, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _widthInBlocks, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _heightInBlocks, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _blockSize, {
      writable: true,
      value: void 0
    });

    var _rowStrings = _classPrivateMethodGet(this, _splitString, _splitString2).call(this, levelMap);

    _classPrivateFieldSet(this, _widthInBlocks, _rowStrings[0].length - 2);

    _classPrivateFieldSet(this, _heightInBlocks, _rowStrings.length - 2);

    _classPrivateFieldSet(this, _blockSize, blockSize);

    _classPrivateFieldSet(this, _levelInfoObjects, _classPrivateMethodGet(this, _parseLevelMap, _parseLevelMap2).call(this, _rowStrings));

    _classPrivateFieldSet(this, _platforms, _classPrivateMethodGet(this, _createPlatforms, _createPlatforms2).call(this, _classPrivateMethodGet(this, _infoObjects, _infoObjects2).call(this, "platform")));

    var playerInfo = _classPrivateMethodGet(this, _infoObjects, _infoObjects2).call(this, "player")[0];

    _classPrivateFieldSet(this, _player, {
      x: playerInfo.x,
      y: playerInfo.y
    });

    _classPrivateFieldSet(this, _goals, []);

    var goalInfos = _classPrivateMethodGet(this, _infoObjects, _infoObjects2).call(this, "goal");

    goalInfos.forEach(function (goalInfo) {
      return _classPrivateFieldGet(_this, _goals).push(new GoalObject(goalInfo.x, goalInfo.y, goalInfo.width, goalInfo.height));
    });

    var treatInfos = _classPrivateMethodGet(this, _infoObjects, _infoObjects2).call(this, "treat");

    _classPrivateFieldSet(this, _treats, treatInfos.map(function (treatInfo) {
      return new Treat(treatInfo.x, treatInfo.y, treatInfo.width, treatInfo.height);
    }));

    var brushSpawnInfos = _classPrivateMethodGet(this, _infoObjects, _infoObjects2).call(this, "brush-spawn-right");

    _classPrivateFieldSet(this, _brushSpawns, brushSpawnInfos.map(function (info) {
      return {
        spawnX: info.x,
        spawnY: info.y,
        direction: "RIGHT"
      };
    }));
  }
  /**
   * The player initialized in their position on the level map
   * @type {Player}
   */


  _createClass(Level, [{
    key: "player",
    get: function get() {
      return _classPrivateFieldGet(this, _player);
    }
    /**
     * All level platforms initialized at their positions on the level map
     * @type {Platform[]}
     */

  }, {
    key: "platforms",
    get: function get() {
      return _classPrivateFieldGet(this, _platforms);
    }
    /**
     * All level goal objects initialized at their positions on the level map
     * @type {Goal[]}
     */

  }, {
    key: "goals",
    get: function get() {
      return _classPrivateFieldGet(this, _goals);
    }
    /**
     * All level treats initialized at their positions on the level map
     * @type {Treat[]}
     */

  }, {
    key: "treats",
    get: function get() {
      return _classPrivateFieldGet(this, _treats);
    }
    /**
     * All level brush spawns initialized at their positions on the level map
     * @type {BrushSpawn[]}
     */

  }, {
    key: "brushSpawns",
    get: function get() {
      return _classPrivateFieldGet(this, _brushSpawns);
    }
    /**
     * The width of the map in pixels
     * @type {number}
     */

  }, {
    key: "width",
    get: function get() {
      return _classPrivateFieldGet(this, _blockSize) * _classPrivateFieldGet(this, _widthInBlocks);
    }
    /**
     * The height of the map in pixels
     * @type {number}
     */

  }, {
    key: "height",
    get: function get() {
      return _classPrivateFieldGet(this, _blockSize) * _classPrivateFieldGet(this, _heightInBlocks);
    }
    /**
     * Splits the full level map string into rows, trimming empty rows
     * @param {string} levelString - The full level map string
     * @returns {string[]} - Each row of the map, as a string
     */

  }]);

  return Level;
}();
/********************
 * TYPE DEFINITIONS *
 ********************/

/**
 * Describes the type and position of an object found in the level map
 * @typedef SimpleLevelObject
 * @property {string} type - identifier for the type of object
 * @property {number} start - The column number in which the object starts
 * @property {number} end - The column number in which the object ends
 */

/**
 * Describes the type and pixel positions and dimensions of an object found
 * in the level map
 * @typedef DetailedLevelObject
 * @property {string} type - identifier for the type of object
 * @property {number} x - the horizontal position of the object in the world
 * @property {number} y - the vertical position of the object in the world
 * @property {number} width - pixel width of the object
 * @property {number} height - pixel height of the object
 */

function _splitString2(levelString) {
  return levelString.split("\n").filter(function (row) {
    return row.length > 0;
  });
}

function _parseLevelMap2(rowStrings) {
  var rowsOfObjects = [];
  var objectTypeMap = Object.create(null);
  objectTypeMap["="] = "platform";
  objectTypeMap["p"] = "player";
  objectTypeMap["!"] = "goal";
  objectTypeMap["$"] = "treat";
  objectTypeMap[">"] = "brush-spawn-right";
  var symbols = Object.keys(objectTypeMap);

  for (var i = 1; i < rowStrings.length - 1; i++) {
    var rowString = rowStrings[i]; // Holds all the start and end indices of objects on this row

    var rowObjects = [];
    var currentSymbol = null;

    for (var j = 1; j < rowString.length; j++) {
      var block = rowString[j];
      var colIndex = j - 1; // Object start

      if (!currentSymbol && symbols.includes(block)) {
        currentSymbol = block;
        rowObjects.push({
          type: objectTypeMap[block],
          start: colIndex
        });
      } // Object end


      if (currentSymbol && block !== currentSymbol) {
        var lastObject = rowObjects[rowObjects.length - 1];
        lastObject.end = colIndex - 1;
        currentSymbol = null;
      }
    }

    rowsOfObjects.push(rowObjects);
  }

  var detailedObjects = _classPrivateMethodGet(this, _addDetail, _addDetail2).call(this, rowsOfObjects);

  return detailedObjects.flat();
}

function _addDetail2(rowsOfObjects) {
  var _this2 = this;

  return rowsOfObjects.map(function (row, rowIndex) {
    if (row.length === 0) return row;

    var y = rowIndex * _classPrivateFieldGet(_this2, _blockSize);

    return row.map(function (simpleObject) {
      var x = simpleObject.start * _classPrivateFieldGet(_this2, _blockSize);

      var widthInBlocks = simpleObject.end - simpleObject.start + 1;

      var width = widthInBlocks * _classPrivateFieldGet(_this2, _blockSize);

      return {
        type: simpleObject.type,
        x: x,
        y: y,
        width: width,
        height: _classPrivateFieldGet(_this2, _blockSize)
      };
    });
  });
}

function _createPlatforms2(platformInfoObjects) {
  var collisions = {
    top: true,
    right: true,
    bottom: true,
    left: true
  };
  return platformInfoObjects.map(function (info) {
    return new Platform(info.x, info.y, info.width, info.height, collisions);
  });
}

function _infoObjects2(type) {
  return _classPrivateFieldGet(this, _levelInfoObjects).filter(function (o) {
    return o.type === type;
  });
}