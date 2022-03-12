import packageJson from "../package.json"
import { StyledVersion } from "./Version.styles"

const Version = () => {
  return (
    <StyledVersion>version: {packageJson.version}</StyledVersion>
  )
}

export default Version
