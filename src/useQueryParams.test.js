import { renderHook } from '@testing-library/react-hooks'
import { useQueryParams } from './useQueryParams'

describe('useQueryParams', () => {

  describe('getString', () => {
    test('when param is not present', () => {
      const { result } = renderHook(() => useQueryParams())
      const queryParams = result.current
      const color = queryParams.getString('color', 'default-color-value')
      expect(color).toBe('default-color-value')
    })

    test('when param is present', () => {
      const { result } = renderHook(() => useQueryParams('?color=blue'))
      const queryParams = result.current
      const color = queryParams.getString('color')
      expect(color).toBe('blue')
    })
  })

  describe('getNumber', () => {
    test('when param is not present', () => {
      const { result } = renderHook(() => useQueryParams())
      const queryParams = result.current
      const count = queryParams.getNumber('count', 42)
      expect(count).toBe(42)
    })

    test('when param is present', () => {
      const { result } = renderHook(() => useQueryParams('?count=10'))
      const queryParams = result.current
      const count = queryParams.getNumber('count')
      expect(count).toBe(10)
    })
  })

  describe('getBool', () => {
    test('when param is not present', () => {
      const { result } = renderHook(() => useQueryParams())
      const queryParams = result.current
      const flag = queryParams.getBool('flag', false)
      expect(flag).toBe(false)
    })

    test('when param is present and true', () => {
      const { result } = renderHook(() => useQueryParams('?flag=y'))
      const queryParams = result.current
      const flag = queryParams.getBool('flag')
      expect(flag).toBe(true)
    })

    test('when param is present and false', () => {
      const { result } = renderHook(() => useQueryParams('?flag=no'))
      const queryParams = result.current
      const flag = queryParams.getBool('flag')
      expect(flag).toBe(false)
    })
  })

  it('multiple params', () => {
    const { result } = renderHook(() => useQueryParams('?color=red&lang=en&count=99&flag=1'))
    const queryParams = result.current
    const color = queryParams.getString('color')
    const lang = queryParams.getString('lang')
    const count = queryParams.getNumber('count')
    const flag = queryParams.getBool('flag')
    expect(color).toBe('red')
    expect(lang).toBe('en')
    expect(count).toBe(99)
    expect(flag).toBe(true)
  })

  it('getStrings', () => {
    const { result } = renderHook(() => useQueryParams('?color=red&color=green'))
    const queryParams = result.current
    const colors = queryParams.getStrings('color')
    expect(colors).toEqual(['red', 'green'])
  })

  it('getNumbers', () => {
    const { result } = renderHook(() => useQueryParams('?count=1&count=2&count=3'))
    const queryParams = result.current
    const counts = queryParams.getNumbers('count')
    expect(counts).toEqual([1, 2, 3])
  })
})
