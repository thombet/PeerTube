import { SANITIZE_OPTIONS, TEXT_WITH_HTML_RULES } from '@shared/core-utils'

const sanitizeHtml = require('sanitize-html')
const markdownItEmoji = require('markdown-it-emoji/light')
const MarkdownItClass = require('markdown-it')
const markdownIt = new MarkdownItClass('default', { linkify: true, breaks: true, html: true })

markdownIt.enable(TEXT_WITH_HTML_RULES)
markdownIt.use(markdownItEmoji)

const toSafeHtml = text => {
  // Restore line feed
  const textWithLineFeed = text.replace(/<br.?\/?>/g, '\r\n')

  // Convert possible markdown (emojis, emphasis and lists) to html
  const html = markdownIt.render(textWithLineFeed)

  // Convert to safe Html
  return sanitizeHtml(html, SANITIZE_OPTIONS)
}

const mdToPlainText = text => {
  // Convert possible markdown (emojis, emphasis and lists) to html
  const html = markdownIt.render(text)

  // Convert to safe Html
  const safeHtml = sanitizeHtml(html, SANITIZE_OPTIONS)

  return safeHtml.replace(/<[^>]+>/g, '')
                 .replace(/\n$/, '')
                 .replace('\n', ', ')
}

// ---------------------------------------------------------------------------

export {
  toSafeHtml,
  mdToPlainText
}
