import { useEffect } from 'react'
import { useQueryParams } from './useQueryParams'
import SettingsButton from './SettingsButton'
import Version from './Version'

const App = ({ threeAppActions }) => {

  const queryParams = useQueryParams()

  //   animationSpeed: queryParams.getNumber("animationSpeed", 750),
  //   autoRotate: queryParams.getBool("autoRotate", true),
  //   autoRotateSpeed: queryParams.getNumber("autoRotateSpeed", 1.0),
  //   axesEnabled: queryParams.getBool("axesEnabled", false)

  useEffect(() => {
    if (queryParams.has('cubeSize')) {
      // threeAppActions.setCubeSize(queryParams.getString('cubeSize'))
    }
  }, [threeAppActions, queryParams])

  return (
    <>
      <SettingsButton threeAppActions={threeAppActions} />
      <Version />
    </>
  )
}

export default App
