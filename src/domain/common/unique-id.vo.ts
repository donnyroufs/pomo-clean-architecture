import crypto from 'crypto'

export class UniqueId {
  private static _ids: Set<string> = new Set()

  private constructor(public readonly value: string) {}

  static make(): UniqueId {
    const id = this.generateId()
    return new UniqueId(id)
  }

  private static generateId(): string {
    const id = crypto.randomBytes(16).toString('hex')

    if (this._ids.has(id)) {
      return this.generateId()
    }

    return id
  }
}
