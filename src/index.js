import React from "react"
import { createRoot } from "react-dom/client"
import { injectGlobal } from "@emotion/css"
import { createTheme, ThemeProvider } from "@mui/material"
import { ThreeAppActionsProvider } from "./context"
import App from "./App"
import threeApp from "./three-app"

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
})

injectGlobal`
  html, body, #visualisation-container {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000;
  }
`

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
