import { useState } from "react"
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch, Typography } from '@mui/material'
import styled from '@emotion/styled'

const StyledContent = styled.div`
  height: 100%;
  min-width: 15rem;
  padding: 1rem;
`

const StyledControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > * {
    margin-bottom: 2rem;
  }
`

const StyledButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`

const SettingsContent = ({ initialValues, onOK, onCancel }) => {

  const [settings, setSettings] = useState({ ...initialValues })

  const handleChangeCubeSize = event => {
    const cubeSize = Number(event.target.value)
    setSettings(currentValues => ({ ...currentValues, cubeSize }))
  }

  const handleChangeAutoRotate = event => {
    const autoRotate = event.target.checked
    setSettings(currentValues => ({ ...currentValues, autoRotate }))
  }

  const handleChangeAxesEnabled = event => {
    const axesEnabled = event.target.checked
    setSettings(currentValues => ({ ...currentValues, axesEnabled }))
  }

  return (
    <StyledContent>
      <Typography variant="subtitle1" component="div" gutterBottom>
        Settings
      </Typography>
      <StyledControls>
        <div>
          <FormControl sx={{ mt: '2rem' }}>
            <FormLabel id="cube-size-label">Cube Size</FormLabel>
            <RadioGroup
              row
              aria-labelledby="cube-size-label"
              name="cube-size-group"
              value={settings.cubeSize}
              onChange={handleChangeCubeSize}
            >
              <FormControlLabel value="2" control={<Radio size="small" />} label="2" />
              <FormControlLabel value="3" control={<Radio size="small" />} label="3" />
              <FormControlLabel value="4" control={<Radio size="small" />} label="4" />
              <FormControlLabel value="5" control={<Radio size="small" />} label="5" />
            </RadioGroup>
          </FormControl>
        </div>

        <div>
          <FormControlLabel
            control={
              <Switch
                checked={settings.autoRotate}
                size="small"
                onClick={handleChangeAutoRotate}
              />
            }
            label="Auto Rotate"
          />
        </div>

        <div>
          <FormControlLabel
            control={
              <Switch
                checked={settings.axesEnabled}
                size="small"
                onClick={handleChangeAxesEnabled}
              />
            }
            label="Show Axes"
          />
        </div>
      </StyledControls>
      <StyledButtons>
        <Button size="small" onClick={onCancel} style={{ marginRight: ".5rem" }}>Cancel</Button>
        <Button variant="contained" size="small" onClick={() => onOK(settings)}>OK</Button>
      </StyledButtons>
    </StyledContent>
  )
}

export default SettingsContent
