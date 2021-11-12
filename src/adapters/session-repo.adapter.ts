import { Session } from '../domain/entities/session.entity'

export interface ISessionRepo {
  save(session: Session): Promise<boolean>
  get(id: Session['id']['value']): Promise<Session | null>
}
