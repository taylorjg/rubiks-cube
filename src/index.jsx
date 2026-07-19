import React from "react"
import { createRoot } from "react-dom/client"
import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { ThreeAppActionsProvider } from "./context"
import App from "./App"
import threeApp from "./three-app"

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  },
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  }
})

const main = async () => {
  const threeAppActions = threeApp()

  const root = createRoot(document.getElementById("react-container"))
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ThreeAppActionsProvider threeAppActions={threeAppActions}>
          <App />
        </ThreeAppActionsProvider>
      </ThemeProvider>
    </React.StrictMode>
  )

  threeAppActions.init()
}

main()
