import { useEffect, useState } from "react"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import { StyledFullscreenIcon } from "./FullscreenButton.styles"
import { toggleFullscreen } from "./fullscreen"

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <StyledFullscreenIcon
      type="button"
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </StyledFullscreenIcon>
  )
}

export default FullscreenButton
