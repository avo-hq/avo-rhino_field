import { TipTapEditor } from 'rhino-editor'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { HexColor } from './rhino-extensions/hex_color'

export default class RhinoEditor extends TipTapEditor {
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
