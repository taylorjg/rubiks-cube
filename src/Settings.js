import { useEffect, useState } from 'react'
import { Drawer } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import styled from '@emotion/styled'
import SettingsContent from './SettingsContent'
import { useQueryParams } from './useQueryParams'

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

const Settings = ({ threeAppActions }) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const queryParams = useQueryParams()

  const [settings, setSettings] = useState({
    cubeSize: 3,
    autoRotate: true,
    axesEnabled: false
  })

  useEffect(() => {
    const cubeSize = queryParams.getNumber('cubeSize', 3)
    const autoRotate = queryParams.getBool('autoRotate', true)
    const axesEnabled = queryParams.getBool('axesEnabled', false)
    setSettings({ cubeSize, axesEnabled, autoRotate })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    threeAppActions.setCubeSize(settings.cubeSize)
    threeAppActions.setAxesEnabled(settings.axesEnabled)
    threeAppActions.setAutoRotate(settings.autoRotate)
  }, [settings, threeAppActions])

  const openDrawer = () => {
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  const onOK = (settings) => {
    setIsDrawerOpen(false)
    setSettings(settings)
  }

  const onCancel = () => {
    setIsDrawerOpen(false)
  }

  return (
    <>
      <StyledSettingsIcon onClick={openDrawer} />
      <Drawer anchor='left' open={isDrawerOpen} onClose={closeDrawer}>
        <SettingsContent initialValues={settings} onOK={onOK} onCancel={onCancel} />
      </Drawer>
    </>
  )
}

export default Settings
