/* eslint-disable max-classes-per-file */
import { Controller } from '@hotwired/stimulus'
import { TipTapEditor } from 'rhino-editor/exports/elements/tip-tap-editor'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'

import { HexColor } from './rhino-extensions/hex_color'

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

  get editor() {
    return this.element.editor
  }

  connect() {
    this.#initEditor()
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
    class MyEditor extends TipTapEditor {
      constructor() {
        super()
        this.starterKitOptions = {
          ...this.starterKitOptions,
          heading: {
            levels: [1, 2, 3, 4, 5, 6],
          },
          rhinoGallery: true,
        }

        this.extensions = [
          ...this.extensions,
          Document,
          Paragraph,
          Text,
          TextStyle,
          HexColor,
        ]
      }
    }

    MyEditor.define('avo-rhino-editor')
  }
}
