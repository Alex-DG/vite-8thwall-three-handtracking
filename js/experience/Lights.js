class _Lights {
  init() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)

    const { scene, camera } = XR8.Threejs.xrScene()

    directionalLight.position.copy(camera.position)

    scene.add(ambientLight)
    scene.add(directionalLight)
  }
}

const Lights = new _Lights()
export default Lights
