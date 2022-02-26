import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, Switch, Typography } from '@mui/material'
import styled from '@emotion/styled'

const CubeSizeSetting = ({ value, setValue }) => {

  const handleChange = event => {
    setValue(Number(event.target.value))
  }

  return (
    <div>
      <FormControl sx={{ mt: '2rem' }}>
        <FormLabel id="cube-size-label">Cube Size</FormLabel>
        <RadioGroup
          row
          aria-labelledby="cube-size-label"
          name="cube-size-group"
          value={value}
          onChange={handleChange}
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

const AnimationSpeedSetting = ({ value, setValue }) => {

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <FormLabel id="animation-speed-label">Animation Speed</FormLabel>
        <Slider
          aria-labelledby="animation-speed-label-speed-label"
          size="small"
          min={100}
          max={5000}
          step={25}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </FormControl>
    </div>
  )
}

const AutoRotateSetting = ({ value, setValue }) => {

  const handleChange = event => {
    setValue(event.target.checked)
  }

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={value}
            size="small"
            onClick={handleChange}
          />
        }
        label="Auto Rotate"
      />
    </div>
  )
}

const AutoRotateSpeedSetting = ({ value, setValue }) => {

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <FormLabel id="auto-rotate-speed-label">Auto Rotate Speed</FormLabel>
        <Slider
          aria-labelledby="auto-rotate-speed-label"
          size="small"
          min={0.0}
          max={10.0}
          step={0.1}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </FormControl>
    </div>
  )
}

const AxesEnabledSetting = ({ value, setValue }) => {

  const handleChange = event => {
    setValue(event.target.checked)
  }

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={value}
            size="small"
            onClick={handleChange}
          />
        }
        label="Show Axes"
      />
    </div>
  )
}

const StyledContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 2rem;
  }
`

const SettingsContent = ({ settings, setSettings }) => {

  const createProps = fieldName => {
    return {
      value: settings[fieldName],
      setValue: value => setSettings(settings => ({
        ...settings,
        [fieldName]: value
      }))
    }
  }

  return (
    <StyledContent>
      <Typography variant="subtitle1" gutterBottom>Settings</Typography>
      <CubeSizeSetting {...createProps('cubeSize')} />
      <AnimationSpeedSetting {...createProps('animationSpeed')} />
      <AutoRotateSetting {...createProps('autoRotate')} />
      <AutoRotateSpeedSetting {...createProps('autoRotateSpeed')} />
      <AxesEnabledSetting {...createProps('axesEnabled')} />
    </StyledContent>
  )
}

export default SettingsContent
