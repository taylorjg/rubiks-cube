import { useEffect, useState } from "react"
import Typography from "@mui/material/Typography"
import { useThreeAppActions } from "./context"

const formatMoveStepLabel = moveStep => {
  const scramblePart = moveStep.scrambleTotal
    ? ` (${moveStep.scrambleTotal} scramble)`
    : ""

  return `Step ${moveStep.step} of ${moveStep.total}${scramblePart}: ${moveStep.notation}`
}

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
    <Typography
      variant="subtitle1"
      aria-live="polite"
      sx={{
        position: "fixed",
        bottom: "0.5rem",
        left: "0.5rem",
        fontWeight: 500,
        letterSpacing: "0.05em",
        pointerEvents: "none",
        userSelect: "none",
        color: "common.white"
      }}
    >
      {formatMoveStepLabel(moveStep)}
    </Typography>
  )
}

export default MoveStep
