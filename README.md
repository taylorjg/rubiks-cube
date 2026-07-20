[![CI/CD](https://github.com/taylorjg/rubiks-cube/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/taylorjg/rubiks-cube/actions/workflows/ci-cd.yml)

# Description

A [three.js](https://threejs.org/) visualisation of solving a Rubik's cube. The app scrambles a cube, computes a solution, and animates each move.

# Solving

| Cube size | Scramble                                                | Solution                                                                                                  |
| --------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **3×3**   | WCA-style face turns ([Singmaster notation](#notation)) | [Kociemba two-phase algorithm](#algorithm) via [rubik-solver](https://www.npmjs.com/package/rubik-solver) |
| **2×2**   | Random slice moves                                      | Reverse of the scramble (cheat)                                                                           |

For 3×3, the solver replays the scramble on an internal cube model, runs Kociemba search, and returns a move sequence (typically 20–22 face turns). Scrambles and solutions are logged to the browser console in Singmaster notation (e.g. `R U R' U'`).

If the solver fails, the app falls back to reversing the scramble.

# Notation

Moves use **Singmaster notation** — the standard letter system for cube algorithms:

| Face          | Turn                  |
| ------------- | --------------------- |
| **U** / **D** | Up / Down (y-axis)    |
| **L** / **R** | Left / Right (x-axis) |
| **F** / **B** | Front / Back (z-axis) |

A letter on its own is a 90° clockwise turn viewed from outside that face. **`'`** is counter-clockwise; **`2`** is a half turn (180°).

3×3 scrambles follow WCA conventions: face turns only (no slice moves), with no consecutive turns on the same or opposite face.

# Algorithm

3×3 solving uses [Herbert Kociemba's two-phase algorithm](https://kociemba.org/cube.htm):

1. **Phase 1** — bring the cube to a subset of states (oriented edges/corners).
2. **Phase 2** — complete the solve using only moves that preserve that subset.

The implementation is provided by [rubik-solver](https://www.npmjs.com/package/rubik-solver), a TypeScript port of the classic Kociemba search. Table initialisation takes about 1–2 seconds on first use; individual solves usually complete in under a second.

# Query Params

The following query params can be added:

| Query Param     | Description                             | Values      | Default |
| --------------- | --------------------------------------- | ----------- | ------- |
| cubeSize        | The size of the cube                    | 2–3         | 3       |
| animationSpeed  | How quickly to animate the moves        | 100–1000 ms | 400 ms  |
| scrambleMoves   | Number of scramble moves                | 10–100      | 75      |
| beforeDelay     | Pause after scramble before solving     | 0–5000 ms   | 2000 ms |
| afterDelay      | Pause after solve before next scramble  | 0–5000 ms   | 2000 ms |
| autoRotate      | Auto-rotate the cube while solving      | bool        | true    |
| autoRotateSpeed | Camera orbit speed (see below)          | 0–10        | 1       |
| axesEnabled     | Draw the X, Y and Z axes                | bool        | false   |
| showMoveLabels  | Show current move in the corner overlay | bool        | true    |

### autoRotateSpeed

This is a dimensionless multiplier passed to Three.js [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) — not radians or degrees per second. It controls how fast the camera orbits the cube when `autoRotate` is enabled.

Approximate time for one full 360° orbit:

| Value | Orbit period |
| ----- | ------------ |
| 1 (default) | ~60 s |
| 2 | ~30 s |
| 5 | ~12 s |
| 10 | ~6 s |

In general: **orbit period (seconds) ≈ 60 ÷ value**

Keyboard shortcuts: **`2`** / **`3`** switch cube size; **`a`** toggles axes; **`r`** toggles auto-rotate; **`m`** toggles move labels.

## Examples

* https://taylorjg.github.io/rubiks-cube?animationSpeed=250
* https://taylorjg.github.io/rubiks-cube?animationSpeed=250&cubeSize=2
* https://taylorjg.github.io/rubiks-cube?showMoveLabels=true&scrambleMoves=50

# Links

## Cube & notation

* [Rubik's Cube — Wikipedia](https://en.wikipedia.org/wiki/Rubik%27s_Cube)
* [Singmaster notation (WCA)](https://www.worldcubeassociation.org/regulations/#article-12-notation)
* [Rubik's Cube notation — Ruwix](https://ruwix.com/the-rubiks-cube/notation/)
* [Advanced Rubik's Cube notation — Ruwix](https://ruwix.com/the-rubiks-cube/notation/advanced/)

## Algorithms & solvers

* [Kociemba's two-phase algorithm](https://kociemba.org/cube.htm)
* [rubik-solver (npm)](https://www.npmjs.com/package/rubik-solver) — solver used by this project

## Visualisation

* [three.js documentation](https://threejs.org/docs/index.html)
* [KeyframeTrack docs](https://threejs.org/docs/index.html#api/animation/KeyframeTrack)
* [AnimationClipCreator](https://github.com/mrdoob/three.js/blob/master/examples/jsm/animation/AnimationClipCreator.js)
