/* eslint-disable max-classes-per-file */
import { Controller } from '@hotwired/stimulus'
import RhinoEditor from './rhino_editor'
// import { post } from '@rails/request.js'
import { AttachmentManager } from 'rhino-editor'

// rgbStyleToHex
// from https://stackoverflow.com/a/3627747/5433572
// and https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function rgbStyleToHex(color) {
  if (!color || color.indexOf('rgb') < 0) {
    return color
  }

  if (color.charAt(0) === '#') {
    return color
  }

  const nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color)
  const r = parseInt(nums[2], 10).toString(16)
  const g = parseInt(nums[3], 10).toString(16)
  const b = parseInt(nums[4], 10).toString(16)

  return (`#${(r.length === 1 ? `0${r}` : r) + (g.length === 1 ? `0${g}` : g) + (b.length === 1 ? `0${b}` : b)}`).toUpperCase()
}

export default class extends Controller {
  static targets = ['textColorInput', 'backgroundColorInput']

  static values = {
    resourceName: String,
    resourceId: String,
  }

  get editor() {
    return this.element.editor
  }

  get labelElement() {
    return this.element.closest('[data-field-type="rhino"]').querySelector('[data-slot="label"] label')
  }

  connect() {
    this.#initEditor()
  }

  disconnect() {
    this.labelElement.removeEventListener('click', this.#focusEditor.bind(this))
  }

  onRhinoBeforeInitialize() {}

  onRhinoInitialize() {
    document.querySelectorAll('.hidden-until-rhino-boots-up').forEach((element) => { element.classList.remove('hidden-until-rhino-boots-up') })
  }

  onRhinoChange() {
    // console.log('onRhinoChange')
  }

  onRhinoPaste() {}

  onRhinoSelectionChange() {
    this.#updateTextColorPicker()
    this.#updateBackgroundColorPicker()
  }

  onRhinoFocus() {}

  onRhinoBlur() {}

  onRhinoFileAccept() {}

  onRhinoAttachmentAdd() {}

  onRhinoAttachmentRemove() {}

  DEFAULT_TEXT_COLOR = '#000000'

  DEFAULT_BACKGROUND_COLOR = '#ffffff'

  setTextColor(event) {
    const color = event.target.value

    if (color) {
      this.editor.chain().focus().setColor(color).run()
    }
  }

  openTextColorPicker() {
    this.textColorInputTarget.click()
  }

  #updateTextColorPicker() {
    const { color } = this.editor.getAttributes('textStyle')

    if (color) {
      this.textColorInputTarget.value = rgbStyleToHex(color)
    } else {
      this.textColorInputTarget.value = this.DEFAULT_TEXT_COLOR
    }
  }

  // async openGallery() {
  //   post(`${window.Avo.configuration.root_path}/media-library`, {
  //     query: {
  //       resource_name: this.resourceNameValue,
  //       record_id: this.resourceIdValue,
  //       controller_selector: this.element.dataset.rhinoFieldUniqueSelectorValue,
  //       controller_name: this.identifier,
  //     },
  //     responseKind: 'turbo-stream',
  //   })
  // }

  // Invoked by the other controllers (media-library)
  insertAttachments(attachments, event) {
    console.log('insertAttachment<>', this, event)
    // const { blob, path } = event.params
    const editorAttachments = attachments.map((attachment) => {
      const { blob, path } = attachment

      return new AttachmentManager({
        src: path,
        width: blob.width,
        height: blob.height,
        filename: blob.filename,
        contentType: blob.content_type,
        previewable: true,
      })
    })

    this.editor?.chain().focus().setAttachment(editorAttachments).run();
  }

  setBackgroundColor(event) {
    const color = event.target.value

    if (color) {
      this.editor.chain().focus().setBgColor(color).run()
    }
  }

  openBackgroundColorPicker() {
    this.backgroundColorInputTarget.click()
  }

  #updateBackgroundColorPicker() {
    const { backgroundColor } = this.editor.getAttributes('textStyle')

    if (backgroundColor) {
      this.backgroundColorInputTarget.value = rgbStyleToHex(backgroundColor)
    } else {
      this.backgroundColorInputTarget.value = this.DEFAULT_TEXT_COLOR
    }
  }

  #initEditor() {
    RhinoEditor.define('avo-rhino-editor')

    // on label click focus the editor
    this.labelElement.addEventListener('click', this.#focusEditor.bind(this))
  }

  #focusEditor() {
    this.editor.commands.focus()
  }
}
