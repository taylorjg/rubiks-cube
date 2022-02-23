import { useState } from 'react'

const parseBool = s => {

  if (!s) return false

  switch (s.toLowerCase()) {

    case '1':
    case 'true':
    case 'y':
    case 'yes':
    case 'on':
    case 'enable':
    case 'enabled':
      return true

    case '0':
    case 'false':
    case 'n':
    case 'no':
    case 'off':
    case 'disable':
    case 'disabled':
      return false

    default:
      return false
  }
}

const identity = value => value

export const useQueryParams = () => {

  const [searchParams] = useState(() => new URLSearchParams(window.location.search))

  const getParam = (name, transform = identity) => {
    const value = searchParams.get(name)
    return transform(value)
  }

  const getString = (name, defaultValue) => getParam(name) ?? defaultValue
  const getNumber = (name, defaultValue) => getParam(name, Number) ?? defaultValue
  const getBool = (name, defaultValue) => searchParams.has(name) ? getParam(name, parseBool) : defaultValue

  return {
    searchParams,
    getString,
    getNumber,
    getBool
  }
}
