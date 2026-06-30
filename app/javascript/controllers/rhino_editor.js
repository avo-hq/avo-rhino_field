import { TipTapEditor } from 'rhino-editor'
import { Attachment, PreviewableAttachment } from 'rhino-editor/exports/extensions/attachment.js'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { HexColor } from './rhino-extensions/hex_color'

// Fix duplicated image after save -> edit (AVO-1415 #6): scope the
// `figure[data-trix-attachment]` parse rule to its <figcaption> so the inner
// <img> isn't re-parsed alongside the figure's regenerated one.
const scopeAttachmentContentToCaption = {
  parseHTML() {
    return (this.parent?.() ?? []).map((rule) => (
      rule.tag === 'figure[data-trix-attachment]'
        ? { ...rule, contentElement: 'figcaption' }
        : rule
    ))
  },
}

const PatchedAttachment = Attachment.extend(scopeAttachmentContentToCaption)
const PatchedPreviewableAttachment = PreviewableAttachment.extend(scopeAttachmentContentToCaption)

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
      PatchedAttachment,
      PatchedPreviewableAttachment,
    ]
  }
}
