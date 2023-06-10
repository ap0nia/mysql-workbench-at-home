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

export const extensions: Extension = [
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
]

export const state = EditorState.create({
  doc: JSON.stringify(
    {
      query_block: {
        select_id: 1,
        r_loops: 1,
        r_total_time_ms: 0.183283374,
        table: {
          table_name: 'Item',
          access_type: 'ALL',
          r_loops: 1,
          rows: 719,
          r_rows: 719,
          r_table_time_ms: 0.136826829,
          r_other_time_ms: 0.036546113,
          filtered: 100,
          r_filtered: 100,
        },
      },
    },
    null,
    2
  ),
  extensions,
})
