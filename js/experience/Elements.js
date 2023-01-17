import Tracking from './Tracking'

class _Elements {
  create() {
    for (let i = 0; i < this.count; i++) {
      const size = Math.random() + 0.2

      let element = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size, 12, 12, 12),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.3,
        })
      )

      const randomPosition = new THREE.Vector3(
        Math.random() * THREE.MathUtils.randInt(-50, 50),
        Math.random() * THREE.MathUtils.randInt(-2, 10),
        Math.random() - 10
      )
      element.position.copy(randomPosition)
      this.positions.push(randomPosition)

      const randomAngle = -Math.PI / Math.random()
      element.rotateX(randomAngle)
      element.rotateZ(randomAngle)

      // box.lookAt(this.camera.position)

      this.instances.push(element)
    }

    this.group.add(...this.instances)
  }

  init() {
    const { scene, camera } = XR8.Threejs.xrScene()
    this.camera = camera
    this.scene = scene

    this.group = new THREE.Group()
    this.group.position.copy(camera.position)
    this.scene.add(this.group)

    this.count = 100

    this.instances = []
    this.positions = []

    this.create()
  }

  update(time) {
    if (Tracking.ready) {
      const hand = Tracking.hand

      switch (hand) {
        case 'point':
          this.instances.forEach((child, i) => {
            child.rotation.y += 0.001 * i
            child.rotation.y += 0.001 * i
            child.rotation.z += 0.0001 * i
          })
          break
        case 'open':
          this.instances.forEach((child, i) => {
            child.position.y += Math.sin(time * (i / 10)) * 0.1
          })
          break
        // case 'closed':
        //   this.instances.forEach((child, i) => {
        //     child.position.lerp(this.camera.position, 0.025)
        //   })
        //   break
        default:
          this.instances.forEach((child, i) => {
            child.position.lerp(this.positions[i], 0.05)
          })
          break
      }
    }
  }
}

const Elements = new _Elements()
export default Elements
