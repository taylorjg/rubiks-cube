import { useEffect, useState } from "react"
import { Drawer } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import styled from "@emotion/styled"
import SettingsPanel from "./SettingsPanel"
import { useQueryParams } from "./useQueryParams"

const StyledSettingsIcon = styled(SettingsIcon)`
  color: #ffffff;
  opacity: .5;
  position: fixed;
  top: .5rem;
  left: .5rem;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
`

const SettingsButton = ({ threeAppActions }) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const queryParams = useQueryParams()

  const [settings, setSettings] = useState(() => ({
    cubeSize: queryParams.getNumber("cubeSize", 3),
    animationSpeed: queryParams.getNumber("animationSpeed", 750),
    autoRotate: queryParams.getBool("autoRotate", true),
    autoRotateSpeed: queryParams.getNumber("autoRotateSpeed", 1.0),
    axesEnabled: queryParams.getBool("axesEnabled", false)
  }))

  const [previousSettings, setPreviousSettings] = useState(() => {
    const keys = Object.keys(settings)
    return Object.fromEntries(keys.map(key => [key, undefined]))
  })

  useEffect(() => {
    if (settings.cubeSize !== previousSettings.cubeSize) {
      threeAppActions.setCubeSize(settings.cubeSize)
    }
    if (settings.animationSpeed !== previousSettings.animationSpeed) {
      threeAppActions.setAnimationSpeed(settings.animationSpeed)
    }
    if (settings.autoRotate !== previousSettings.autoRotate) {
      threeAppActions.setAutoRotate(settings.autoRotate)
    }
    if (settings.autoRotateSpeed !== previousSettings.autoRotateSpeed) {
      threeAppActions.setAutoRotateSpeed(settings.autoRotateSpeed)
    }
    if (settings.axesEnabled !== previousSettings.axesEnabled) {
      threeAppActions.setAxesEnabled(settings.axesEnabled)
    }
    setPreviousSettings(settings)
  }, [settings, previousSettings]) // eslint-disable-line react-hooks/exhaustive-deps

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
        <SettingsPanel settings={settings} setSettings={setSettings} onClose={closeDrawer} />
      </Drawer>
    </>
  )
}

export default SettingsButton
