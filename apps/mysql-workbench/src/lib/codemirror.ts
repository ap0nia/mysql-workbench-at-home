import { writable } from 'svelte/store'
import { lintKeymap } from '@codemirror/lint'
import { json } from '@codemirror/lang-json'
import { EditorState, type Extension } from '@codemirror/state'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search'
import {
  autocompletion,
  completionKeymap,
  closeBrackets,
  closeBracketsKeymap,
} from '@codemirror/autocomplete'
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  indentOnInput,
  bracketMatching,
  foldGutter,
  foldKeymap,
} from '@codemirror/language'
import {
  keymap,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  lineNumbers,
  highlightActiveLineGutter,
  EditorView,
} from '@codemirror/view'

export const value = writable('')

export const extensions = [
  json(),
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  EditorView.lineWrapping,
  EditorView.updateListener.of((v) => {
    const json = v.state.doc.toJSON().join('')
    value.set(json)
  }),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
  ]),
] satisfies Extension

export function createState(extensions: Extension = []) {
  return EditorState.create({
    doc: JSON.stringify(
      {
        query_block: {
          select_id: 1,
          cost_info: {
            query_cost: '72.90',
          },
          table: {
            table_name: 'Item',
            access_type: 'ALL',
            rows_examined_per_scan: 719,
            rows_produced_per_join: 719,
            filtered: '100.00',
            cost_info: {
              read_cost: '1.00',
              eval_cost: '71.90',
              prefix_cost: '72.90',
              data_read_per_join: '202K',
            },
            used_columns: ['sku', 'iname'],
          },
        },
      },
      null,
      2
    ),
    extensions,
  })
}

export const state = createState(extensions)
