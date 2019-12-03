export const range = n => Array.from(Array(n).keys())
export const flatten = xss => [].concat(...xss)
export const closeTo = (a, b) => Math.abs(a - b) <= 1e-12
