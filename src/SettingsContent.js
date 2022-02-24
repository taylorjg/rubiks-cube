import { useState } from "react"
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, Typography } from '@mui/material'
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
    margin-bottom: 1rem;
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
          <FormControl variant="standard" size="small" sx={{ minWidth: '10rem', my: '1rem' }}>
            <InputLabel id="cube-size-label">Cube Size</InputLabel>
            <Select
              labelId="cube-size-label"
              id="cube-size"
              value={settings.cubeSize}
              label="Cube Size"
              onChange={handleChangeCubeSize}
            >
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
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
