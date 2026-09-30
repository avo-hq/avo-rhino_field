import { TipTapEditor } from 'rhino-editor'
import { Attachment, PreviewableAttachment } from 'rhino-editor/exports/extensions/attachment.js'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { HexColor } from './rhino-extensions/hex_color'

// Fixes for rhino-editor's attachment figure extensions (AVO-1415).
const attachmentFixes = {
  // #6 — duplicated image after save -> edit: scope the
  // `figure[data-trix-attachment]` parse rule to its <figcaption> so the inner
  // <img> isn't re-parsed alongside the figure's regenerated one.
  parseHTML() {
    return (this.parent?.() ?? []).map((rule) => (
      rule.tag === 'figure[data-trix-attachment]'
        ? { ...rule, contentElement: 'figcaption' }
        : rule
    ))
  },

  // Image sometimes "expands" to a cover instead of being deleted: rhino's
  // removeFigure does `tr.delete(pos, pos + 1)` — a fixed size-1 range that can
  // leave the figure partially in the doc (e.g. lifted out of its gallery, then
  // re-rendered full width). Override it to delete the whole node by its real
  // nodeSize. Wrap the parent node view so rendering is otherwise untouched.
  addNodeView() {
    const parentAddNodeView = this.parent?.()
    if (!parentAddNodeView) return undefined

    return (props) => {
      const nodeView = parentAddNodeView(props)
      const { editor, getPos } = props
      const attachmentEditor = nodeView?.dom?.querySelector?.('rhino-attachment-editor')

      if (attachmentEditor) {
        attachmentEditor.removeFigure = () => {
          if (typeof getPos !== 'function') return
          const pos = getPos()
          if (pos == null) return
          const node = editor.state.doc.nodeAt(pos)
          if (!node) return
          editor.view.dispatch(editor.state.tr.delete(pos, pos + node.nodeSize))
        }
      }

      return nodeView
    }
  },
}

const PatchedAttachment = Attachment.extend(attachmentFixes)
const PatchedPreviewableAttachment = PreviewableAttachment.extend(attachmentFixes)

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
