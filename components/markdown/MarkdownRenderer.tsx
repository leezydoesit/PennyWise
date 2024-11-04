import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import sanitizeHtml from 'sanitize-html'

// Function to sanitize HTML content
export const sanitizeHtmlContent = (dirty: string) => {
  return sanitizeHtml(dirty, {
    allowedTags: [
      'b',
      'i',
      'em',
      'strong',
      'p',
      'h1',
      'h2',
      'h3',
      'ul',
      'ol',
      'li',
    ],
    allowedAttributes: {}, // No attributes allowed
    allowedSchemes: [], // No URL schemes allowed
    disallowedTagsMode: 'discard',
    enforceHtmlBoundary: true,
    parseStyleAttributes: false, // Do not parse style attributes
  })
}

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const sanitizedContent = sanitizeHtmlContent(content)

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {sanitizedContent}
    </ReactMarkdown>
  )
}

export default MarkdownRenderer
