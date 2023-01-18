import * as handTrack from 'handtrackjs'
import Gallery from './Gallery'

const TRIGGER_VALUE = 40

const defaultParams = {
  flipHorizontal: false,
  outputStride: 16,
  imageScaleFactor: 1,
  maxNumBoxes: 20,
  iouThreshold: 0.2,
  scoreThreshold: 0.6,
  modelType: 'ssd640fpnlite',
  modelSize: 'large',
  bboxLineWidth: '2',
  fontSize: 17,
}

class _Tracking {
  updateLayout() {
    this.label.innerText = this.score
      ? `${this.hand} / ${this.score}`
      : `${this.hand}`
  }

  async detectImage() {
    try {
      const predictions = await this.model.detect(this.renderer.domElement)
      // console.log('->', { predictions })

      if (predictions.length > 0) {
        const prediction = predictions[predictions.length - 1]
        this.hand = prediction.label
        this.score = prediction.score
      } else {
        this.hand = ''
        this.score = null
      }

      this.updateLayout()

      Gallery.navigation(this.hand)

      // console.log('👋', 'predictions-loaded', { predictions })
    } catch (error) {
      console.error('❌', 'predictions-error', { error })
    }

    this.trigger = 0
    this.detecting = false
  }
  async loadModel() {
    try {
      const model = await handTrack.load(defaultParams)

      this.model = model
      this.ready = true
    } catch (error) {
      console.error('❌', 'tracking-error', { error })
    }
  }

  init() {
    const { renderer, scene, camera } = XR8.Threejs.xrScene()
    this.renderer = renderer
    this.scene = scene
    this.camera = camera

    this.ready = false
    this.detecting = false
    this.trigger = 0
    this.score = null
    this.hand = ''

    this.label = document.getElementById('hand-gesture')

    this.loadModel()
  }

  update() {
    if (!this.ready) return

    this.trigger += 1

    if (!this.detecting && this.trigger === TRIGGER_VALUE) {
      this.detectImage()
    }
  }
}

const Tracking = new _Tracking()
export default Tracking
