import mermaid from 'mermaid'
import ExplainedDataParser from './parser'

async function renderFlowchart(parser: ExplainedDataParser) {
  let renderingText = parser.buildMermaidContent()

  renderingText = `graph BT;\n${renderingText}`.trim()

  const rendered = await mermaid.mermaidAPI.render('mermaid', renderingText).catch((err) => {
    console.log(err)
    return { svg: '' }
  })

  return rendered.svg
}

export async function getAndParseContent(string: string) {
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
