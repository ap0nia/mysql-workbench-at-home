import type { NodeData, AdditionalData } from '../parser/data'
import { getRandomString } from '$lib/utils/randomString'

export default class MermaidUtils {
  static ACCESS_TYPES: Record<string, string> = {
    SYSTEM: 'Single row: system constant',
    CONST: 'Single row: constant',
    EQ_REF: 'Unique Key Lookup',
    REF: 'Non-Unique Key Lookup',
    REF_OR_NULL: 'Key Lookup + Fetch NULL Values',
    INDEX_MERGE: 'Index Merge',
    FULLTEXT: 'Fulltext Index Search',
    UNIQUE_SUBQUERY: 'Unique Key Lookup into table of subquery',
    INDEX_SUBQUERY: 'Non-Unique Key Lookup into table of subquery',
    RANGE: 'Index Range Scan',
    INDEX: 'Full Index Scan',
    ALL: 'Full Table Scan',
    UNKNOWN: 'unknown',
  }

  static getBoxContent({ id, type, displayName, additionalData }: NodeData) {
    let content
    const style = MermaidUtils._getBoxStyle(type, id, additionalData)

    switch (type) {
      case 'table':
        content = `${id}["<b>${displayName}</b><br>${MermaidUtils._getTableAccessType(
          additionalData
        )}<br>${MermaidUtils._getPrefixCostContent(
          additionalData,
          'read_cost'
        )}<br>${MermaidUtils._getIndexContent(additionalData)}"]`
        break
      case 'nested_loop':
        content = `${id}{"<b>${displayName}</b>"}`
        break
      case 'query_block':
        content = `${id}[<b>${displayName}</b>${
          additionalData.cost_info
            ? `<br>${MermaidUtils._getPrefixCostContent(additionalData, 'query_cost')}<br>`
            : ''
        }]`
        break

      // case 'attached_subqueries':
      //   content = `${id}[<b>${displayName}</b>]`;
      //   break;
      //
      // case 'union':
      //   content = `${id}[<b>${displayName}</b>]`;
      //   break;

      case 'ordering':
      case 'duplicate_removals':
        content = `${id}(<b>${displayName}</b>)`
        break
      default:
        content = `${id}[<b>${displayName}</b>]`
    }

    return [content, style]
  }

  static _getBoxStyle(type: string, id: string, additionalData: AdditionalData = {}) {
    let style

    switch (type) {
      case 'nested_loop':
        style = `style ${id} fill:#fff, stroke:#b3b3b3, stroke-width:2px`
        break
      case 'query_block':
      case 'union':
        style = `style ${id} fill:#b3b3b3, stroke:#000, stroke-width:2px`
        break
      case 'attached_subqueries':
        style = `style ${id} fill:#fff, stroke:#000, stroke-width:2px, stroke-dasharray: 5 5`
        break
      case 'ordering':
        style = `style ${id} fill:#fff, stroke:#bf4040, stroke-width:2px`
        break
      case 'duplicate_removals':
        style = `style ${id} fill:#fff, stroke:#bbba06, stroke-width:2px`
        break
      case 'table':
        style = MermaidUtils._getTableStyle(id, additionalData)
        break
      default:
        style = ''
    }

    return style
  }

  /**
   * @Docs https://dev.mysql.com/doc/workbench/en/wb-performance-explain.html
   * @param id
   * @param accessType
   * @returns {string}
   * @private
   */
  static _getTableStyle(id, { access_type: accessType }) {
    let style

    switch (accessType.toUpperCase()) {
      case 'SYSTEM':
      case 'CONST':
        style = `style ${id} fill:#4080c0`
        break
      case 'EQ_REF':
      case 'REF':
      case 'REF_OR_NULL':
      case 'INDEX_MERGE':
        style = `style ${id} fill:#008000`
        break
      case 'FULLTEXT':
        style = `style ${id} fill:#bbba06`
        break
      case 'UNIQUE_SUBQUERY':
      case 'INDEX_SUBQUERY':
      case 'RANGE':
        style = `style ${id} fill:#b97301`
        break
      case 'INDEX':
      case 'ALL':
        style = `style ${id} fill:#b93236`
        break
      case 'UNKNOWN':
        style = `style ${id} fill:#000`
        break
      default:
    }
    style += ',stroke:#000,color:#fff'

    return style
  }

  static _getTableAccessType({ access_type: accessType }: AdditionalData) {
    return `<i>Access type:</i> <b>${MermaidUtils.ACCESS_TYPES[accessType.toUpperCase()]}</b>`
  }

  static _getPrefixCostContent(additionalData: AdditionalData, key = 'prefix_cost') {
    return `<i>Query cost:</i> ${additionalData?.cost_info?.[key]}`
  }

  static _getIndexContent(additionalData: AdditionalData) {
    return additionalData.key
      ? `<i>Index:</i> ${additionalData.key.replace('<', '').replace('>', '')}`
      : ''
  }

  static _getTotalRows(additionalData: AdditionalData) {
    return `<i>Total rows:</i> ${additionalData.rows_produced_per_join}`
  }

  static getQueryBlockIdentifier(idPrefix: string, selectId: number | string | null = null) {
    return {
      id: `${idPrefix}query_block${selectId ?? ''}-${getRandomString()}`,
      name: `Query Block ${selectId ? `#${selectId}` : ''}`,
    }
  }

  /**
   * @param {String} idPrefix
   * @returns
   */
  static getOrderingIdentifier(idPrefix: string) {
    return {
      id: `${idPrefix}ordering-${getRandomString()}`,
      name: `Ordering`,
    }
  }

  /**
   * @param {String} idPrefix
   * @returns
   */
  static getDuplicateRemovalsIdentifier(idPrefix: string) {
    return {
      id: `${idPrefix}duplicate_removals-${getRandomString()}`,
      name: `Ordering`,
    }
  }

  /**
   * @param {String} idPrefix
   * @returns
   */
  static getNestedLoopNodeIdentifier(idPrefix: string) {
    return {
      id: `${idPrefix}nested_loop-${getRandomString()}`,
      name: `Nested Loop`,
    }
  }

  static getTableIdentifier(idPrefix: string, tableName: string) {
    return {
      id: `${idPrefix}${tableName}-${getRandomString()}`,
      name: tableName,
    }
  }

  static getSubqueryIdentifier(id: string, selectId: string) {
    return {
      id,
      name: `Subquery ${selectId ? `#${selectId}` : ''}`,
    }
  }
}
