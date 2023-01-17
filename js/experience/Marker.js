import Debug from './Debug'

class _Marker {
  hitTestHandler(e) {
    console.log('[ hitTestHandler ]')
    const x = e.touches[0].clientX / window.innerWidth
    const y = e.touches[0].clientY / window.innerHeight
    const hitTestResults = XR8.XrController.hitTest(x, y, ['FEATURE_POINT'])
    console.log({ hitTestResults })
  }

  placeObjectTouchHandler(e) {
    // Call XrController.recenter() when the canvas is tapped with two fingers. This resets the
    // AR camera to the position specified by XrController.updateCameraProjectionMatrix() above.
    if (e.touches.length === 2) {
      XR8.XrController.recenter()
    }
    if (e.touches.length > 2) {
      return
    }

    // If the canvas is tapped with one finger and hits the "surface", spawn an object.
    const { camera } = XR8.Threejs.xrScene()

    // calculate tap position in normalized device coordinates (-1 to +1) for both components.
    this.tapPosition.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
    this.tapPosition.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1

    // Update the picking ray with the camera and tap position.
    this.raycaster.setFromCamera(this.tapPosition, camera)

    // Raycast against the "surface" object.
    const intersects = this.raycaster.intersectObject(this.instance)

    if (intersects.length === 1 && intersects[0].object.name === 'marker') {
      //   placeObject(intersects[0].point.x, intersects[0].point.z)
      const intersect = intersects[0]
      const point = intersect.point
      const face = intersect.face

      const clone = this.dummy.clone()
      this.scene.add(clone)

      // Position
      clone.position.copy(point)

      // Rotation
      //   clone.rotation.setFromQuaternion(this.camera.quaternion)

      //   clone.rotation.y = this.camera.rotation.y
      //   clone.rotation.z = this.camera.rotation.z
      //   clone.rotation.x = this.camera.rotation.x
      //   clone.rotation.z = -this.camera.rotation.z
      //   clone.rotation.z = -this.camera.rotation.z

      // clone.quaternion.setFromUnitVectors(
      //   new THREE.Vector3(0, 1, 0),
      //   face.normal.normalize()
      // )

      const hitTestResults = XR8.XrController.hitTest(
        this.tapPosition.x,
        this.tapPosition.y,
        ['FEATURE_POINT']
      )
      console.log({ intersect, hitTestResults })
    }
  }

  ////////////////////////////////////////////////////////////

  setMarker() {
    // Create 'hit' marker
    const markerMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    })
    const markerGeometry = new THREE.PlaneGeometry(0.5, 0.5, 32)

    this.instance = new THREE.Mesh(markerGeometry, markerMaterial)
    this.instance.position.z = -4
    this.instance.name = 'marker'

    this.camera.add(this.instance)

    // Create ring
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 'white',
      transparent: true,
      opacity: 0.6,
    })
    const ringGeometry = new THREE.RingGeometry(0.15, 0.2, 32)
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.position.z += 0.01
    this.instance.add(ring)

    // Add touch event
    window.addEventListener('touchstart', this.placeObjectTouchHandler)
  }

  setDummy() {
    this.dummy = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshNormalMaterial()
    )
    this.dummy.scale.multiplyScalar(0.5)
    this.scene.add(this.dummy)
  }

  //////////////////////////////

  bind() {
    this.placeObjectTouchHandler = this.placeObjectTouchHandler.bind(this)
  }

  init() {
    const { camera, scene } = XR8.Threejs.xrScene()
    this.camera = camera
    this.scene = scene

    this.raycaster = new THREE.Raycaster()
    this.tapPosition = new THREE.Vector2()

    this.bind()
    this.setMarker()
    this.setDummy()
  }

  //////////////////////////////

  update() {
    this.instance.rotation.x = this.camera.rotation.x
  }
}

const Marker = new _Marker()
export default Marker
