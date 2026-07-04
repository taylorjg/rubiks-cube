import React from "react"
import { createRoot } from "react-dom/client"
import { createTheme, ThemeProvider } from "@mui/material"
import { ThreeAppActionsProvider } from "./context"
import App from "./App"
import threeApp from "./three-app"

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
})

const main = async () => {
  const threeAppActions = threeApp()

  const root = createRoot(document.getElementById("react-container"))
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <ThreeAppActionsProvider threeAppActions={threeAppActions}>
          <App />
        </ThreeAppActionsProvider>
      </ThemeProvider>
    </React.StrictMode>
  )

  threeAppActions.init()
}

main()
