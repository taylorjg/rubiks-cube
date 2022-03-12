import styled from "@emotion/styled"

export const StyledSettingsPanel = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
`

export const StyledSettingsPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: .5rem .5rem .5rem 1rem;
  svg {
    cursor: pointer;
  }
`

export const StyledSettingsPanelBody = styled.div`
  margin: 0rem 1rem;
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 1.5rem;
  }
`
