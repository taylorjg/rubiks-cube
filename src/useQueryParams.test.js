import { renderHook } from "@testing-library/react-hooks"
import { useQueryParams } from "./useQueryParams"

describe("useQueryParams", () => {

  describe("getString", () => {
    it("when param is not present returns default value", () => {
      const { result } = renderHook(() => useQueryParams())
      const queryParams = result.current
      const color = queryParams.getString("color", "default-color-value")
      expect(color).toBe("default-color-value")
    })

    it("when param is present returns its value", () => {
      const { result } = renderHook(() => useQueryParams("?color=blue"))
      const queryParams = result.current
      const color = queryParams.getString("color")
      expect(color).toBe("blue")
    })
  })

  describe("getNumber", () => {
    it("when param is not present returns default value", () => {
      const { result } = renderHook(() => useQueryParams())
      const queryParams = result.current
      const count = queryParams.getNumber("count", 42)
      expect(count).toBe(42)
    })

    it("when param is present returns its value", () => {
      const { result } = renderHook(() => useQueryParams("?count=10"))
      const queryParams = result.current
      const count = queryParams.getNumber("count")
      expect(count).toBe(10)
    })
  })

  describe("getBool", () => {
    it("when param is not present returns default value", () => {
      const { result } = renderHook(() => useQueryParams())
      const queryParams = result.current
      const flag = queryParams.getBool("flag", false)
      expect(flag).toBe(false)
    })

    it("when param is present with no value returns true", () => {
      const { result } = renderHook(() => useQueryParams("?flag"))
      const queryParams = result.current
      const flag = queryParams.getBool("flag")
      expect(flag).toBe(true)
    })

    it("when param is present and true returns true", () => {
      const { result } = renderHook(() => useQueryParams("?flag=y"))
      const queryParams = result.current
      const flag = queryParams.getBool("flag")
      expect(flag).toBe(true)
    })

    it("when param is present and false returns false", () => {
      const { result } = renderHook(() => useQueryParams("?flag=no"))
      const queryParams = result.current
      const flag = queryParams.getBool("flag")
      expect(flag).toBe(false)
    })
  })

  describe("getStrings", () => {
    it("when no params are present returns default value", () => {
      const { result } = renderHook(() => useQueryParams())
      const queryParams = result.current
      const colors = queryParams.getStrings("color", ["yellow", "purple"])
      expect(colors).toEqual(["yellow", "purple"])
    })

    it("when params are present returns their values", () => {
      const { result } = renderHook(() => useQueryParams("?color=red&color=green"))
      const queryParams = result.current
      const colors = queryParams.getStrings("color")
      expect(colors).toEqual(["red", "green"])
    })
  })

  describe("getNumbers", () => {
    it("when no params are present returns default value", () => {
      const { result } = renderHook(() => useQueryParams())
      const queryParams = result.current
      const counts = queryParams.getNumbers("count", [10, 20])
      expect(counts).toEqual([10, 20])
    })

    it("when params are present returns their values", () => {
      const { result } = renderHook(() => useQueryParams("?count=1&count=2&count=3"))
      const queryParams = result.current
      const counts = queryParams.getNumbers("count")
      expect(counts).toEqual([1, 2, 3])
    })
  })

  describe("getBools", () => {
    it("when no params are present returns default value", () => {
      const { result } = renderHook(() => useQueryParams())
      const queryParams = result.current
      const flags = queryParams.getBools("flag", [true])
      expect(flags).toEqual([true])
    })

    it("when params are present returns their values", () => {
      const { result } = renderHook(() => useQueryParams("?flag=1&flag=0&flag=yes&flag=no&flag"))
      const queryParams = result.current
      const flags = queryParams.getBools("flag")
      expect(flags).toEqual([true, false, true, false, true])
    })
  })

  it("mixture of params", () => {
    const { result } = renderHook(() => useQueryParams("?color=red&lang=en&count=99&flag=1"))
    const queryParams = result.current
    const color = queryParams.getString("color")
    const lang = queryParams.getString("lang")
    const count = queryParams.getNumber("count")
    const flag = queryParams.getBool("flag")
    expect(color).toBe("red")
    expect(lang).toBe("en")
    expect(count).toBe(99)
    expect(flag).toBe(true)
  })
})
