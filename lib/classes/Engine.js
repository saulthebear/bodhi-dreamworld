function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _update = /*#__PURE__*/new WeakMap();

var _render = /*#__PURE__*/new WeakMap();

var _timeStep = /*#__PURE__*/new WeakMap();

var _mostRecentTime = /*#__PURE__*/new WeakMap();

var _lastFrameTime = /*#__PURE__*/new WeakMap();

var _accumulatedTime = /*#__PURE__*/new WeakMap();

var _updated = /*#__PURE__*/new WeakMap();

var _isRunning = /*#__PURE__*/new WeakMap();

var _calculateAccumulatedTime = /*#__PURE__*/new WeakSet();

var _frame = /*#__PURE__*/new WeakMap();

/**
 * The Engine is responsible for calling the `update` and `render` methods
  at fixed time intervals, determined by the `fps` property
 */
export var Engine = /*#__PURE__*/function () {
  /**
   * Game update function to call before rendering each frame
   * @type {function}
   */

  /**
   * Render function to call each frame
   * @type {function}
   */

  /**
   * Fixed time step in seconds. `update` & `render` are called at this
   * frequency
   * @type {number}
   */

  /**
   * Most recent time the cycle was run
   * `DOMHighResTimeStamp`, measured in milliseconds.
   * @type {number}
   */

  /**
   * Time the last frame was rendered.
   * `DOMHighResTimeStamp`, measured in milliseconds.
   * @type {number}
   */

  /**
   * Time elapsed between frames in seconds
   * @type {number}
   */

  /**
   * Has the `update` function been called since last cycle?
   * `false` if not enough time has passed.
   * Prevents rendering when no update has occurred.
   * @type {boolean}
   */

  /**
  * Is the engine running or stopped?
  * Determines if the frame function should keep being called by
  `requestAnimationFrame`
  * @type {boolean}
  */

  /**
   * @typedef {object} EngineConfig
   * @property {function} update - Called before rendering
   * @property {function} render - Called after updating
   * @property {number} fps - Frames Per Second
   */

  /**
   *
   * @param {EngineConfig} config
   */
  function Engine(_ref) {
    var _this = this;

    var update = _ref.update,
        render = _ref.render,
        fps = _ref.fps;

    _classCallCheck(this, Engine);

    _classPrivateMethodInitSpec(this, _calculateAccumulatedTime);

    _classPrivateFieldInitSpec(this, _update, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _render, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _timeStep, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mostRecentTime, {
      writable: true,
      value: 0
    });

    _classPrivateFieldInitSpec(this, _lastFrameTime, {
      writable: true,
      value: window.performance.now()
    });

    _classPrivateFieldInitSpec(this, _accumulatedTime, {
      writable: true,
      value: 0
    });

    _classPrivateFieldInitSpec(this, _updated, {
      writable: true,
      value: false
    });

    _classPrivateFieldInitSpec(this, _isRunning, {
      writable: true,
      value: false
    });

    _classPrivateFieldInitSpec(this, _frame, {
      writable: true,
      value: function value() {
        if (!_classPrivateFieldGet(_this, _isRunning)) return;

        _classPrivateFieldSet(_this, _mostRecentTime, window.performance.now());

        _classPrivateFieldSet(_this, _accumulatedTime, _classPrivateFieldGet(_this, _accumulatedTime) + _classPrivateMethodGet(_this, _calculateAccumulatedTime, _calculateAccumulatedTime2).call(_this, _classPrivateFieldGet(_this, _mostRecentTime), _classPrivateFieldGet(_this, _lastFrameTime)));
        /*
        We only update and render when the browser is ready. To ensure the game runs
        at the same speed regardless of machine, we need to:
          * Only update game if enough time has elapsed.
          *  Keep updating the game if more than a time step's worth of time has
              elapsed
        */


        while (_classPrivateFieldGet(_this, _accumulatedTime) > _classPrivateFieldGet(_this, _timeStep)) {
          _classPrivateFieldSet(_this, _accumulatedTime, _classPrivateFieldGet(_this, _accumulatedTime) - _classPrivateFieldGet(_this, _timeStep));

          _classPrivateFieldGet(_this, _update).call(_this, _classPrivateFieldGet(_this, _timeStep));

          _classPrivateFieldSet(_this, _updated, true);
        } // Only render if the game has updated


        if (_classPrivateFieldGet(_this, _updated)) {
          _classPrivateFieldGet(_this, _render).call(_this, _classPrivateFieldGet(_this, _accumulatedTime));

          _classPrivateFieldSet(_this, _updated, false);
        }

        _classPrivateFieldSet(_this, _lastFrameTime, _classPrivateFieldGet(_this, _mostRecentTime));

        requestAnimationFrame(_classPrivateFieldGet(_this, _frame));
      }
    });

    _classPrivateFieldSet(this, _update, update);

    _classPrivateFieldSet(this, _render, render);

    _classPrivateFieldSet(this, _timeStep, 1 / fps);
  }
  /**
   * Start the game loop. Start calling update and render at set frequency
   */


  _createClass(Engine, [{
    key: "start",
    value: function start() {
      _classPrivateFieldSet(this, _isRunning, true);

      requestAnimationFrame(_classPrivateFieldGet(this, _frame));
    }
    /**
     * Stop the game loop. Update and render will no longer be called
     */

  }, {
    key: "stop",
    value: function stop() {
      _classPrivateFieldSet(this, _isRunning, false);
    }
    /**
     * Calculates the time between frames
     * It is capped at 1 second, in case the user switches tabs for a long time,
     * so that the update function isn't called over and over before rendering
     * @param {number} currentTime - In milliseconds
     * @param {number} previousTime - In milliseconds
     * @returns {number} Time in seconds between frames, capped at 1 second
     */

  }]);

  return Engine;
}();

function _calculateAccumulatedTime2(currentTime, previousTime) {
  var deltaInSeconds = (currentTime - previousTime) / 1000;
  var cappedDelta = Math.min(1, deltaInSeconds);
  return cappedDelta;
}