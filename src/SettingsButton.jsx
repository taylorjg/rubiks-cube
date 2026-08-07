import { useState } from "react"
import { Settings as SettingsIcon } from "@mui/icons-material"
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
      <StyledSettingsIcon onClick={openDrawer}>
        <SettingsIcon />
      </StyledSettingsIcon>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={closeDrawer}
        slotProps={{
          paper: {
            sx: { width: 320 }
          }
        }}
      >
        <SettingsPanel onClose={closeDrawer} />
      </Drawer>
    </>
  )
}

export default SettingsButton
