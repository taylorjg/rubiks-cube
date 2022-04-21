import { useState } from "react"

const parseBool = s => {

  if (s === '') return true
  if (!s) return false

  switch (s.toLowerCase()) {

    case "1":
    case "true":
    case "y":
    case "yes":
    case "on":
    case "enable":
    case "enabled":
      return true

    case "0":
    case "false":
    case "n":
    case "no":
    case "off":
    case "disable":
    case "disabled":
      return false

    default:
      return false
  }
}

const identity = value => value

export const useQueryParams = search => {

  const [searchParams] = useState(() => new URLSearchParams(search ?? window.location.search))

  const getParam = (name, defaultValue, transform = identity) => {
    return searchParams.has(name)
      ? transform(searchParams.get(name))
      : defaultValue
  }

  const getParams = (name, defaultValue, transform = identity) => {
    return searchParams.has(name)
      ? searchParams.getAll(name).map(transform)
      : defaultValue
  }

  const has = name => searchParams.has(name)

  const getString = (name, defaultValue) => getParam(name, defaultValue)
  const getNumber = (name, defaultValue) => getParam(name, defaultValue, Number)
  const getBool = (name, defaultValue) => getParam(name, defaultValue, parseBool)

  const getStrings = (name, defaultValue) => getParams(name, defaultValue)
  const getNumbers = (name, defaultValue) => getParams(name, defaultValue, Number)
  const getBools = (name, defaultValue) => getParams(name, defaultValue, parseBool)

  return {
    has,
    getString,
    getNumber,
    getBool,
    getStrings,
    getNumbers,
    getBools
  }
}
