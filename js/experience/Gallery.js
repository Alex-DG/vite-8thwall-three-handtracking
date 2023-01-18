import img1Src from '../../assets/photos/1.png'
import img2Src from '../../assets/photos/2.png'
import img3Src from '../../assets/photos/3.png'
import img4Src from '../../assets/photos/4.png'
import img5Src from '../../assets/photos/5.png'
import img6Src from '../../assets/photos/6.png'
import img7Src from '../../assets/photos/7.png'

import FrameMaterial from './FrameMaterial'

import { gsap } from 'gsap'

class _Gallery {
  next() {
    const { width, offset } = this.settings

    // const frame1 = this.frames[0]
    // const frame2 = this.frames[1]
    // const frame3 = this.frames[2]
    // const frame4 = this.frames[3]

    // frame1.position.x -= 5 + 1
    // frame2.position.x -= 5 + 1
    // frame3.position.x -= 5 + 1
    // frame4.position.x -= 5 + 1

    this.frames.forEach((frame, index) => {
      //   frame.position.x -= width + offset
      //   (width + offset) * index
      gsap.to(frame.position, {
        x: `-= ${width + offset + 0.1}`,
        // x: `-= ${width} + ${offset}`,
        duration: 1,
        ease: 'power3.out',
      })
    })
  }

  previous() {
    console.log('PREVIOUS')
  }

  navigation(value) {
    // if gestures >= 2 clear
    if (this.gestures.length >= 2) this.gestures = [] // clear every 2 gestures recorded

    // if no gestures and value is `open` add
    if (!this.gestures.length && value === 'open') {
      this.gestures.push(value)
    }

    // if 1 gesture and value is `` add and go next
    if (this.gestures.length === 1 && value === '') {
      this.gestures.push(value)
      this.next()
    }

    // this.gestures.push(value)

    // const gesture1 = this.gestures[0]
    // const gesture2 = this.gestures[1]

    // console.log({ gestures: this.gestures })

    // // NEXT
    // if (gesture1 === 'open' && gesture2 === '') {
    //   this.next()
    // }

    // PREVIOUS
    // if (gesture1 === 'closed' && gesture2 !== 'closed') {
    //   this.previous()
    // }
  }

  planeCurve(g, z) {
    let p = g.parameters
    let hw = p.width * 0.5

    let a = new THREE.Vector2(-hw, 0)
    let b = new THREE.Vector2(0, z)
    let c = new THREE.Vector2(hw, 0)

    let ab = new THREE.Vector2().subVectors(a, b)
    let bc = new THREE.Vector2().subVectors(b, c)
    let ac = new THREE.Vector2().subVectors(a, c)

    let r =
      (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)))

    let center = new THREE.Vector2(0, z - r)
    let baseV = new THREE.Vector2().subVectors(a, center)
    let baseAngle = baseV.angle() - Math.PI * 0.5
    let arc = baseAngle * 2

    let uv = g.attributes.uv
    let pos = g.attributes.position
    let mainV = new THREE.Vector2()
    for (let i = 0; i < uv.count; i++) {
      let uvRatio = 1 - uv.getX(i)
      let y = pos.getY(i)
      mainV.copy(c).rotateAround(center, arc * uvRatio)
      pos.setXYZ(i, mainV.x, y, -mainV.y)
    }
  }

  createFrames() {
    const { width, height, offset } = this.settings

    const frameGeometry = new THREE.PlaneGeometry(width, height, 64, 64)
    this.planeCurve(frameGeometry, 0.5)

    this.textures.forEach((texture, index) => {
      //   const frameMaterial = new THREE.MeshStandardMaterial({
      //     map: texture,
      //   })

      const frameMaterial = new FrameMaterial(texture)
      const frame = new THREE.Mesh(frameGeometry, frameMaterial)
      frame.position.x += (width + offset) * index

      this.frames.push(frame)
      this.scene.add(frame)
    })

    this.ready = true
  }

  async load() {
    try {
      const loader = new THREE.TextureLoader()

      const images = await Promise.all([
        loader.loadAsync(img1Src),
        loader.loadAsync(img2Src),
        loader.loadAsync(img3Src),
        loader.loadAsync(img4Src),
        loader.loadAsync(img5Src),
        loader.loadAsync(img6Src),
        loader.loadAsync(img7Src),
      ])

      this.textures = images

      this.createFrames()
    } catch (error) {
      console.error('❌', 'load-images-error', { error })
    }
  }

  init() {
    this.textures = []
    this.frames = []
    this.gestures = []

    this.ready = false

    this.settings = {
      width: 5,
      height: 3,
      offset: 1,
    }

    const { scene } = XR8.Threejs.xrScene()
    this.scene = scene

    this.load()
  }

  update(time) {
    if (!this.ready) return

    this.frames.forEach((f, i) => {
      //   const index = i === 0 ? -1 : i
      //   f.position.y += Math.sin(time * index) * 0.0025
      f.material.uniforms.uTime.value = time
    })
  }
}

const Gallery = new _Gallery()
export default Gallery
