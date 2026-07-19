import Typography from "@mui/material/Typography"
import packageJson from "../package.json"

const Version = () => {
  return (
    <Typography
      variant="caption"
      sx={{
        position: "fixed",
        bottom: "0.5rem",
        right: "0.5rem",
        fontStyle: "italic",
        color: "common.white",
        opacity: 0.5,
        "&:hover": {
          opacity: 1,
          transform: "scale(1.2) translate(-0.2rem, -0.2rem)"
        }
      }}
    >
      {`version: ${packageJson.version}`}
    </Typography>
  )
}

export default Version
