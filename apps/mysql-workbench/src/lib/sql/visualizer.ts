import mermaid from 'mermaid'
import { popup, type PopupSettings } from '@skeletonlabs/skeleton'
import ExplainedDataParser from './parser'
import { autoPlacement } from '@floating-ui/dom'

const popupOptions: PopupSettings = {
  event: 'click',
  target: 'popupClick',
  placement: 'right',
  middleware: [autoPlacement()]
}

async function renderFlowchart(parser: ExplainedDataParser) {
  const bootstrap = await import('bootstrap')

  let renderingText = parser.buildMermaidContent()

  renderingText = `graph BT;\n${renderingText}`.trim()

  const rendered = await mermaid.mermaidAPI.render('mermaid', renderingText).catch((err) => {
    console.log(err)
    return { svg: '' }
  })

  setTimeout(() => {
    document.querySelectorAll<HTMLElement>('.node').forEach(element => {
      const keys = element.id.split('-') ?? [];
      const newKeys = keys.splice(1, keys.length - 2);
      const target = newKeys.join('-');
      const explainContent = parser.getExplainContentById(target);

      if (explainContent) {
        const content = document.createElement('div')
        content.className = 'card p-4 variant-filled-primary'
        content.innerHTML = explainContent

        content.setAttribute('data-popup', target)
        document.body.appendChild(content)

        popup(element, { ...popupOptions, target })

      }
    })

    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(element => {
      new bootstrap.Popover(element)
    })
  }, 1000);

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
