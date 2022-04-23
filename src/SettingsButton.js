import { useState } from "react"
import { Drawer } from "@mui/material"
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
      <StyledSettingsIcon onClick={openDrawer} />
      <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
        <SettingsPanel onClose={closeDrawer} />
      </Drawer>
    </>
  )
}

export default SettingsButton
