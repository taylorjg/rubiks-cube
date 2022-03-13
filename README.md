# Description

A [three.js](https://threejs.org/) visualisation of solving a Rubik's cube.

# Status

Currently, I have not implemented the solving part. Instead, I am cheating
by using a reversed list of opposite moves as the solution.

# Query Params

The following query params can be added:

| Query Param | Description | Values | Default |
| ----------- | ----------- | ------ | ------- |
| cubeSize        | The size of the cube | 2-5 | 3 |
| animationSpeed  | How quickly to animate the moves | 100-5000 ms | 750 ms |
| autoRotate      | Auto rotate the cube as it is solving | bool | true |
| autoRotateSpeed | Speed of auto rotatation (if enabled) | 0-10000 ms | 1000 ms |
| axesEnabled     | Draw the X, Y and Z axes | bool | false |

## Examples

* https://taylorjg.github.io/rubiks-cube?animationSpeed=250
* https://taylorjg.github.io/rubiks-cube?animationSpeed=250&cubeSize=2
* https://taylorjg.github.io/rubiks-cube?animationSpeed=250&cubeSize=4
* https://taylorjg.github.io/rubiks-cube?animationSpeed=250&cubeSize=4&axesEnabled

# TODO

* ~~Improve the look of the cube pieces~~
* ~~Add a slide-out panel to configure the size, speed etc~~
* Implement an algorithm to solve the cube properly

# Links

* [Rubik's Cube - Wikipedia](https://en.wikipedia.org/wiki/Rubik%27s_Cube)
* [three.js documentation](https://threejs.org/docs/index.html)
* [Some examples of how to manually create AnimationClips](https://threejs.org/examples/js/animation/AnimationClipCreator.js)
    * this link came from [the three.js documentation for KeyframeTrack](https://threejs.org/docs/index.html#api/animation/KeyframeTrack)
* [Rubik's Cube Notation - How to read the rotation letters](https://ruwix.com/the-rubiks-cube/notation/)
* [Advanced Rubik's Cube Notation](https://ruwix.com/the-rubiks-cube/notation/advanced/)
