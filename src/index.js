import React from "react"
import ReactDOM from "react-dom"
import { injectGlobal } from "@emotion/css"
import { createTheme, ThemeProvider } from "@mui/material"
import Settings from "./Settings"
import Version from "./Version"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import threeApp from "./three-app"

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
})

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000;
  }
  #container {
    width: 100%;
    height: 100%;
  }
`

const threeAppActions = threeApp()

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <Settings threeAppActions={threeAppActions} />
      <Version />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("container")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister()
serviceWorkerRegistration.register()

threeAppActions.init()
