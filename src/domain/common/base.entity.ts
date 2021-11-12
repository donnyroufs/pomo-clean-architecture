import { UniqueId } from './unique-id.vo'

export abstract class BaseEntity {
  public readonly id: UniqueId = UniqueId.make()
}
