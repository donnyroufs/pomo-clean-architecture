import { UniqueId } from 'src/domain/common/unique-id.vo'
import { ISessionRepo } from '../../adapters/session-repo.adapter'
import { Session } from '../../domain/entities/session.entity'

export class SessionRepoImpl implements ISessionRepo {
  private readonly _sessions: Session[] = []

  async save(session: Session): Promise<boolean> {
    const exists = this._sessions.find((s) => s.id.value === session.id.value)

    if (exists) {
      return false
    }

    this._sessions.push(session)

    return true
  }

  async get(id: string): Promise<Session | null> {
    const foundSession = this._sessions.find((s) => s.id.value === id)

    if (!foundSession) {
      return null
    }

    return foundSession
  }
}
