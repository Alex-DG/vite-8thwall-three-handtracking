class _Screen {
  init() {
    const { scene, camera } = XR8.Threejs.xrScene()

    this.instanceMaterial = new THREE.MeshStandardMaterial({
      color: 'white',
      side: THREE.DoubleSide,
    })

    this.instance = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 10, 32, 32),
      this.instanceMaterial
    )
    this.instance.rotateX((-Math.PI / 2) * 2)

    this.instance.position.z = camera.position.z * -4
    // scene.add(this.instance)
  }

  update(cameraTexture) {
    if (cameraTexture) {
      this.instanceMaterial.map = cameraTexture
      this.instanceMaterial.needsUpdate = true
    }
  }
}

const Screen = new _Screen()
export default Screen
