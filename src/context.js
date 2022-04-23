import { createContext, useContext } from "react"

const ThreeAppActionsContext = createContext({})

export const ThreeAppActionsProvider = ({ threeAppActions, children }) => {
  return (
    <ThreeAppActionsContext.Provider value={threeAppActions}>
      {children}
    </ThreeAppActionsContext.Provider>
  )
}

export const useThreeAppActions = () => {
  return useContext(ThreeAppActionsContext)
}
