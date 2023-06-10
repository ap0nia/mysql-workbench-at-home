import mermaid from 'mermaid'
import ExplainedDataParser from './parser'

/**
 * @param {ExplainedDataParser} parser
 * @param {HTMLElement} node
 */
async function renderFlowchart(parser) {
  const { default: $ } = await import('jquery')
  const bootstrap = await import('bootstrap')

  let renderingText = parser.buildMermaidContent()
  renderingText = `graph BT;\n${renderingText}`.trim()

  const rendered = await mermaid.mermaidAPI.render('mermaid', renderingText)

  setTimeout(() => {
    $('.node').each((_, element) => {
      const keys = $(element).attr('id').split('-')
      const newKeys = keys.splice(1, keys.length - 2)
      const key = newKeys.join('-')
      const explainContent = parser.getExplainContentById(key)

      if (explainContent) {
        $(element).attr('data-bs-toggle', 'popover')
        $(element).attr('data-bs-content', explainContent)
        $(element).attr('data-bs-html', 'true')
      }
    })
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
    )
    popoverList
  }, 1000)

  return rendered.svg
}

/**
 * @param {string} string
 */
export async function getAndParseContent(string) {
  try {
    const data = JSON.parse(string)
    const parser = new ExplainedDataParser(data)
    parser.build()
    const content = await renderFlowchart(parser)
    return content
  } catch (err) {
    console.log(err)
    console.log('Failed to decode')
    return ''
  }
}
