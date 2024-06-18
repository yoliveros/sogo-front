type FNode = {
  id: string
  parent_id?: string
  name: string
  children: FNode[]
}

export default class FileTree {
  root: FNode
  constructor() {
    this.root = {
      id: 'root',
      parent_id: undefined,
      name: 'root',
      children: []
    }
  }
}
