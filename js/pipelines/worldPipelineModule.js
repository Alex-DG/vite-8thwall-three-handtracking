import Elements from '../experience/Elements'
import Lights from '../experience/Lights'

import Debug from '../experience/Debug'
import Tracking from '../experience/Tracking'
import Screen from '../experience/Screen'
import Gallery from '../experience/Gallery'

const IS_DEBUG = false

export const initWorldPipelineModule = () => {
  const cameraTexture = new THREE.Texture()
  const clock = new THREE.Clock()

  const setupTexture = () => {
    cameraTexture.encoding = THREE.sRGBEncoding
    cameraTexture.minFilter = THREE.LinearFilter
    cameraTexture.magFilter = THREE.LinearFilter
    cameraTexture.format = THREE.RGBFormat
  }

  const init = () => {
    IS_DEBUG && Debug.init()

    Lights.init()
    Tracking.init()

    // > Images Gallery
    Gallery.init()

    // > Camera live strean
    // setupTexture()
    // Screen.init()

    // > Cubes
    // Elements.init()

    console.log('✨', 'World ready')
  }

  const processCpuResult = (data) => {
    const realityTexture = data.processCpuResult?.reality?.realityTexture

    if (realityTexture) {
      const { renderer } = XR8.Threejs.xrScene()
      const texProps = renderer.properties.get(cameraTexture)
      texProps.__webglTexture = realityTexture
    }
  }

  const update = (data) => {
    const time = clock.getElapsedTime()
    Gallery?.update(time)

    // > Camera live strean
    // processCpuResult(data)
    // Screen?.update(cameraTexture)

    // > Cubes
    // Elements?.update(time)

    // > Hand tracking

    Tracking?.update()
  }

  return {
    name: 'init-world',

    onStart: () => init(),

    onUpdate: (data) => update(data),
  }
}
