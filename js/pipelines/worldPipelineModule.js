import Elements from '../experience/Elements'
import Lights from '../experience/Lights'

import Debug from '../experience/Debug'
import Tracking from '../experience/Tracking'
import Screen from '../experience/Screen'

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

    setupTexture()

    Lights.init()
    Screen.init()
    Tracking.init()
    Elements.init()

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

    processCpuResult(data)
    Screen?.update(cameraTexture)

    Elements?.update(time)
    Tracking?.update()
  }

  return {
    name: 'init-world',

    onStart: () => init(),

    onUpdate: (data) => update(data),
  }
}
