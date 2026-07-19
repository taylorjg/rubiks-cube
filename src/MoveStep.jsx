import { useEffect, useState } from "react"
import { useThreeAppActions } from "./context"
import { StyledMoveStep } from "./MoveStep.styles"

const MoveStep = () => {
  const threeAppActions = useThreeAppActions()
  const [settings, setSettings] = useState(threeAppActions.getSettings)
  const [moveStep, setMoveStep] = useState(null)

  useEffect(() => {
    threeAppActions.addSettingsChangedListener(setSettings)
    threeAppActions.addMoveStepChangedListener(setMoveStep)
    return () => {
      threeAppActions.removeSettingsChangedListener(setSettings)
      threeAppActions.removeMoveStepChangedListener(setMoveStep)
    }
  }, [threeAppActions])

  if (!settings.showMoveLabels || !moveStep) {
    return null
  }

  return (
    <StyledMoveStep aria-live="polite">
      {`Step ${moveStep.step} of ${moveStep.total}: ${moveStep.notation}`}
    </StyledMoveStep>
  )
}

export default MoveStep
