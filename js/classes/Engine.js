export class Engine {
  // Game update function to call before rendering each frame
  #update
  // Render function to call each frame
  #render
  // Fixed time step in seconds. The game is updated / rendered at this frequency
  #timeStep
  // Most recent time the cycle was run
  #mostRecentTime = 0
  // Time the last frame was rendered
  #lastFrameTime
  // Time elapsed between frames in seconds
  #accumulatedTime
  // Has the update function been called since last cycle
  #updated

  #isRunning

  constructor({ update, render, fps }) {
    this.#update = update
    this.#render = render
    this.#timeStep = 1 / fps

    // Initialize values
    this.#accumulatedTime = 0
    this.#lastFrameTime = window.performance.now()
    this.#updated = false
    this.#isRunning = false
  }

  start() {
    this.#isRunning = true
    requestAnimationFrame(this.#frame)
  }
  stop() {
    this.#isRunning = false
  }

  // Capped at 1 second, in case user switches tabs for a long time
  #calculateAccumulatedTime(currentTime, previousTime) {
    const deltaInSeconds = (currentTime - previousTime) / 1000
    const cappedDelta = Math.min(1, deltaInSeconds)
    return cappedDelta
  }

  // One cycle of the game loop. Callback to requestAnimationFrame
  #frame = () => {
    if (!this.#isRunning) return

    this.#mostRecentTime = window.performance.now()
    this.#accumulatedTime =
      this.#accumulatedTime +
      this.#calculateAccumulatedTime(this.#mostRecentTime, this.#lastFrameTime)

    /*
    We only update and render when the browser is ready. To ensure the game runs
    at the same speed regardless of machine, we need to:
      * Only update game if enough time has elapsed.
      *  Keep updating the game if more than a time step's worth of time has
          elapsed
    */
    while (this.#accumulatedTime > this.#timeStep) {
      this.#accumulatedTime -= this.#timeStep
      this.#update(this.#timeStep)
      this.#updated = true
    }

    // Only render if the game has updated
    if (this.#updated) {
      this.#render(this.#accumulatedTime)
      this.#updated = false
    }

    this.#lastFrameTime = this.#mostRecentTime
    requestAnimationFrame(this.#frame)
  }
}
