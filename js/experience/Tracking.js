import * as handTrack from 'handtrackjs'

class _Tracking {
  async load() {
    try {
      const model = await handTrack.load()

      this.ready = true

      console.log('⚡️', 'tracking-loaded', { model })
    } catch (error) {
      console.error('❌', 'tracking-error', { error })
    }
  }

  init() {
    this.ready = false
    this.load()
  }

  update() {}
}

const Tracking = new _Tracking()
export default Tracking
