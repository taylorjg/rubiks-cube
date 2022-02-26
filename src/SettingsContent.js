import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, Switch, Typography } from '@mui/material'
import styled from '@emotion/styled'

const StyledContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 2rem;
  }
`

const SettingsContent = ({ initialValues, saveSettings, threeAppActions }) => {

  const handleChangeCubeSize = event => {
    const cubeSize = Number(event.target.value)
    saveSettings({ ...initialValues, cubeSize })
    threeAppActions.setCubeSize(cubeSize)
  }

  const handleChangeAutoRotate = event => {
    const autoRotate = event.target.checked
    saveSettings({ ...initialValues, autoRotate })
    threeAppActions.setAutoRotate(autoRotate)
  }

  const handleChangeAutoRotateSpeed = event => {
    const autoRotateSpeed = event.target.value
    saveSettings({ ...initialValues, autoRotateSpeed })
    threeAppActions.setAutoRotateSpeed(autoRotateSpeed)
  }

  const handleChangeAxesEnabled = event => {
    const axesEnabled = event.target.checked
    saveSettings({ ...initialValues, axesEnabled })
    threeAppActions.setAxesEnabled(axesEnabled)
  }

  const CubeSizeSetting = () => {
    return (
      <div>
        <FormControl sx={{ mt: '2rem' }}>
          <FormLabel id="cube-size-label">Cube Size</FormLabel>
          <RadioGroup
            row
            aria-labelledby="cube-size-label"
            name="cube-size-group"
            value={initialValues.cubeSize}
            onChange={handleChangeCubeSize}
          >
            <FormControlLabel value="2" control={<Radio size="small" />} label="2" />
            <FormControlLabel value="3" control={<Radio size="small" />} label="3" />
            <FormControlLabel value="4" control={<Radio size="small" />} label="4" />
            <FormControlLabel value="5" control={<Radio size="small" />} label="5" />
          </RadioGroup>
        </FormControl>
      </div>
    )
  }

  const AutoRotateSetting = () => {
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={initialValues.autoRotate}
              size="small"
              onClick={handleChangeAutoRotate}
            />
          }
          label="Auto Rotate"
        />
      </div>
    )
  }

  const AxesEnabledSetting = () => {
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={initialValues.axesEnabled}
              size="small"
              onClick={handleChangeAxesEnabled}
            />
          }
          label="Show Axes"
        />
      </div>
    )
  }

  return (
    <StyledContent>
      <Typography variant="subtitle1" gutterBottom>Settings</Typography>
      <CubeSizeSetting />
      <AutoRotateSetting />
      <div>
        <FormControl sx={{ width: '100%' }}>
          <FormLabel id="auto-rotate-speed-label">Auto Rotate Speed</FormLabel>
          <Slider
            aria-labelledby="auto-rotate-speed-label"
            size="small"
            min={0.0}
            max={10.0}
            step={0.1}
            value={initialValues.autoRotateSpeed}
            onChange={handleChangeAutoRotateSpeed}
            valueLabelDisplay="auto"
          />
        </FormControl>
      </div>
      <AxesEnabledSetting />
    </StyledContent>
  )
}

export default SettingsContent
