import Elements from '../experience/Elements'
import Lights from '../experience/Lights'

import Debug from '../experience/Debug'
import Tracking from '../experience/Tracking'
import Screen from '../experience/Screen'

const IS_DEBUG = false

export const initWorldPipelineModule = () => {
  const cameraTexture = new THREE.Texture()

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
    const intrinsics = data.processCpuResult?.reality?.intrinsics

    if (realityTexture && intrinsics) {
      const { renderer } = XR8.Threejs.xrScene()
      const texProps = renderer.properties.get(cameraTexture)
      texProps.__webglTexture = realityTexture
    }
  }

  const update = (data) => {
    processCpuResult(data)
    console.log({ data, cameraTexture })
    Screen?.update(cameraTexture)
  }

  return {
    name: 'init-world',

    onStart: () => init(),

    onUpdate: (data) => update(data),
  }
}
