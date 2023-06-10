/**
 * The JSON object returned by the `EXPLAIN` directive in MariaDB is different from MySQL.
 * ???
 */
export type DBMS = 'MariaDB' | 'MySQL'

export interface MariaDBData { }

export interface MySQLData {
  query_block: {
    select_id: string | number
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
    }
  }
}

type AnyNestedRecord<T> =
  T extends Record<string, any>
  ? Partial<T> | AnyNestedRecord<T[keyof T]>
  : Partial<T>

export type AdditionalData<T extends DBMS = 'MySQL'> = T extends 'MariaDB'
  ? MariaDBData
  : T extends 'MySQL'
  ? MySQLData
  : never

type Primitives = string | number | boolean

export class NodeData {
  constructor(
    public id: string,
    public displayName: string,
    public type: string,
    public additionalData: Exclude<AnyNestedRecord<AdditionalData>, Primitives> = Object.create(null)
  ) { }
}

export class Node {
  constructor(
    public data: NodeData,
    public parent: Node | BinaryTree | null = null,
    public left: Node | BinaryTree | null = null,
    public right: Node | BinaryTree | null = null,
    public parentId: string | null = parent?.parentId || null
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
    public parent: Node | BinaryTree | null = null,
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

  insertMultibranchNode(data: NodeData, children: BinaryTree[], parent: Node) {
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
