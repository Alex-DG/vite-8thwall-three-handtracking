import { ShaderMaterial, Texture, Vector2 } from 'three'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

class FrameMaterial extends ShaderMaterial {
  constructor(texture) {
    super({
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: texture },
        uDistanceFromCenter: { value: 0.0 },
        uBendFactor: { value: 0.03 },
        uFrequency: { value: new Vector2(3, 1.5) },
      },
      //   transparent: true,
      //   depthWrite: true,
      vertexShader,
      fragmentShader,
    })
  }

  get time() {
    return this.uniforms.uTime.value
  }

  set time(value) {
    this.uniforms.uTime.value = value
  }
}

export default FrameMaterial
