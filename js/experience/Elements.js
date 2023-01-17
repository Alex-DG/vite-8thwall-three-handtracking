import { getRandomSpherePoint } from './utils/math'

class _Elements {
  create() {
    for (let i = 0; i < this.count; i++) {
      const size = Math.random() + 0.2

      const box = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3 })
      )

      const pos = getRandomSpherePoint(box.position, 4)
      box.position.copy(pos)
      box.position.y = 0

      this.array.push(box)
    }

    this.scene.add(...this.array)
  }

  init() {
    const { scene } = XR8.Threejs.xrScene()

    this.scene = scene
    this.count = 25

    this.array = []
    this.create()
  }

  update() {}
}

const Elements = new _Elements()
export default Elements
