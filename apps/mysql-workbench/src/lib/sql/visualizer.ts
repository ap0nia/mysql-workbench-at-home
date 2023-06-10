import mermaid from 'mermaid'
import ExplainedDataParser from './parser'

/**
 * @param {ExplainedDataParser} parser
 * @param {HTMLElement} node
 */
async function renderFlowchart(parser) {
  let renderingText = parser.buildMermaidContent()

  renderingText = `graph BT;\n${renderingText}`.trim()

  const rendered = await mermaid.mermaidAPI.render('mermaid', renderingText).catch((err) => {
    console.log(err)
    return { svg: '' }
  })

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
