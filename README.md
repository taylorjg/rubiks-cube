# Description

A [three.js](https://threejs.org/) visualisation of solving a Rubik's cube.

# Status

Currently, I have not implemented the solving part. Instead, I am cheating
by using a reversed list of opposite moves as the solution.

# Query Params

The following query params can be added:

| Query Param | Description | Values | Default |
| ----------- | ----------- | ------ | ------- |
| size        | The size of the cube | 2-5 | 3 |
| speed       | How quickly to animate the moves | 100-1000 ms | 750 |
| moves       | The number of random moves used to shuffle the cube | 10-100 | 25 |
| delay       | Length of delay before starting to 'solve' the cube | 0-5000 ms | 1000 |
| axes        | Draw the X, Y and Z axes | present = on<br />absent = off | off |

## Examples

* https://taylorjg.github.io/rubiks-cube?speed=250
* https://taylorjg.github.io/rubiks-cube?speed=250&moves=10&size=2
* https://taylorjg.github.io/rubiks-cube?speed=250&size=4
* https://taylorjg.github.io/rubiks-cube?speed=250&size=4&axes

# TODO

* ~~Improve the look of the cube pieces~~
* Add a slide-out panel to configure the size, speed etc
  * Currently, these values can only be set via query string parameters
* Implement an algorithm to solve the cube properly

# Links

* [Rubik's Cube - Wikipedia](https://en.wikipedia.org/wiki/Rubik%27s_Cube)
* [three.js documentation](https://threejs.org/docs/index.html)
* [Some examples of how to manually create AnimationClips](https://threejs.org/examples/js/animation/AnimationClipCreator.js)
    * this link came from [the three.js documentation for KeyframeTrack](https://threejs.org/docs/index.html#api/animation/KeyframeTrack)
* [Rubik's Cube Notation - How to read the rotation letters](https://ruwix.com/the-rubiks-cube/notation/)
* [Advanced Rubik's Cube Notation](https://ruwix.com/the-rubiks-cube/notation/advanced/)
