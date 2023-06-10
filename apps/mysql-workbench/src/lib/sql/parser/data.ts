/**
 * The JSON object returned by the `EXPLAIN` directive in MariaDB is different from MySQL???
 */
export type DBMS = 'MariaDB' | 'MySQL'

/**
 * JSON output of the `EXPLAIN` directive in MariaDB.
 */
export interface MariaDBExplainOutput {
  query_block: {
    select_id: string | number,
    r_loops: number,
    r_total_time_ms: number,
    table: {
      table_name: string,
      access_type: string,
      r_loops: number,
      rows: number,
      r_rows: number,
      r_table_time_ms: number,
      r_other_time_ms: number,
      filtered: number,
      r_filtered: number
    },
  },
}

/**
 * JSON output of the `EXPLAIN` directive in MySQL.
 */
export interface MySQLExplainOutput {
  query_block: {
    select_id: string
    cost_info: {
      query_cost: string
    }
    table: {
      table_name: string
      access_type: string
      rows_examined_per_scan: number
      rows_produced_per_join: number
      filtered: string
      cost_info: {
        read_cost: string
        eval_cost: string
        prefix_cost: string
        data_read_per_join: string
      }
      used_columns: string[]
      ordering_operation: {
        using_filesort: string
      }
      nested_loop: { 
        table: Omit<MySQLExplainOutput['query_block']['table'], 'nested_loop'>
      }[]
      duplicates_removal: {
        using_temporary_table: string
        using_filesort: string
      }
      union_result: {
        query_specifications: string[]
      }
    }
  }
  attached_subqueries: Omit<MySQLExplainOutput, 'attached_subqueries'>[]
}

/**
 * The object can be from any level of a defined interface.
 */
export type AnyNestedRecord<T> = T extends Record<string, any>
  ? Exclude<Partial<T>, Primitives> | Exclude<AnyNestedRecord<T[keyof T]>, Primitives>
  : Exclude<Partial<T>, Primitives>

/**
 * Any nested record of a DBMS's data interface.
 */
export type DBMSRecord<T extends DBMS = 'MySQL'> = T extends 'MariaDB'
  ? MariaDBExplainOutput
  : T extends 'MySQL'
  ? MySQLExplainOutput
  : never

export type Primitives = string | number | boolean

/**
 * Additional data that a DBMS node can have.
 */
export type AdditionalData<T extends DBMS = 'MySQL'> = Exclude<AnyNestedRecord<DBMSRecord<T>>, Primitives>

export class NodeData {
  constructor(
    public id: string,
    public displayName: string,
    public type: string,
    public additionalData: AdditionalData = Object.create(null)
  ) { 
    'table' in additionalData && additionalData.table
  }
}

export class Node {
  constructor(
    public data: NodeData,
    public parent: Node | MultibranchNode | BinaryTree | null = null,
    public left: Node | BinaryTree | null = null,
    public right: Node | BinaryTree | null = null,
    public parentId: string | null = (parent && 'data' in parent && parent.data.id) ||
      parent?.parentId ||
      null
  ) { }

  setLeft(leftNode: Node | BinaryTree) {
    this.left = leftNode
  }

  setRight(rightNode: Node | BinaryTree) {
    this.right = rightNode
  }
}

export class MultibranchNode {
  constructor(
    public data: NodeData,
    public children: BinaryTree[] = [],
    public parent: Node | BinaryTree | MultibranchNode | null = null,
    public parentId: string | null = parent?.parentId || null
  ) { }
}

export class BinaryTree {
  root: Node | BinaryTree | null

  nodesMap: Record<string, Node | MultibranchNode | BinaryTree>

  parentId: string | null

  constructor(public nodeData: NodeData) {
    this.root = null
    this.nodesMap = {}
    this.parentId = null
  }

  setRoot(rootData: NodeData) {
    this.root = new Node(rootData)
    this.setMap(this.root)
    return this.root
  }

  insert(data: NodeData, parent: Node, direction: string) {
    const newNode = new Node(data, parent)

    this.setMap(newNode)

    parent[direction === 'left' ? 'setLeft' : 'setRight'](newNode)

    return newNode
  }

  insertTree(tree: BinaryTree, parent: Node, direction: string) {
    tree.parentId = parent.data.id

    this.setMap(tree)

    parent[direction === 'left' ? 'setLeft' : 'setRight'](tree)

    return tree
  }

  insertMultibranchNode(data: NodeData, children: BinaryTree[], parent: Node | MultibranchNode) {
    const newNode = new MultibranchNode(data, children, parent)

    this.setMap(newNode)

    return newNode
  }

  setMap(node: Node | MultibranchNode | BinaryTree) {
    this.nodesMap['nodeData' in node ? node.nodeData.id : node.data.id] = node
  }

  getNodes() {
    return Object.values(this.nodesMap)
  }

  getNodeById(id: string) {
    return this.nodesMap[id]
  }

  getNodeData() {
    return this.nodeData
  }
}
