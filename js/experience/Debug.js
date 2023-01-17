import { Pane } from 'tweakpane'

class _Debug {
  init() {
    this.pane = new Pane()
    this.folders = []
  }

  createFolder(folderName, expanded = true) {
    try {
      const doesExist = this.folders.some(({ name }) => name === folderName)

      if (!doesExist) {
        const newFolder = this.pane.addFolder({
          title: folderName,
          expanded,
        })

        this.folders.push({
          name: folderName,
          folder: newFolder,
        })
      }
    } catch (error) {
      console.error('createFolder', { error })
    }
  }

  addSlider(obj, name, params = {}, folderName) {
    try {
      let f
      if (folderName) f = this.folders.find(({ name }) => name === folderName)

      if (f) {
        f.folder.addInput(obj, name, params)
      } else {
        this.pane.addInput(obj, name, params)
      }
    } catch (error) {
      console.error('addSlider', { error })
    }
  }

  addColorPicker(obj, name, params, callback, folderName) {
    try {
      let f
      if (folderName) f = this.folders.find(({ name }) => name === folderName)

      if (f) {
        f.folder.addInput(obj, name, params).on('change', ({ value }) => {
          callback(value)
        })
      } else {
        this.pane.addInput(obj, name, params).on('change', ({ value }) => {
          callback(value)
        })
      }
    } catch (error) {
      console.error('addSlider', { error })
    }
  }
}

const Debug = new _Debug()
export default Debug
