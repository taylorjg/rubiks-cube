import { useState } from "react"
import { Drawer } from "@mui/material"
import SettingsIcon from "@mui/icons-material/esm/Settings.js"
import SettingsPanel from "./SettingsPanel"
import { StyledSettingsIcon } from "./SettingsButton.styles"

const SettingsButton = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = () => {
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <>
      <StyledSettingsIcon onClick={openDrawer}>
        <SettingsIcon />
      </StyledSettingsIcon>
      <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
        <SettingsPanel onClose={closeDrawer} />
      </Drawer>
    </>
  )
}

export default SettingsButton
