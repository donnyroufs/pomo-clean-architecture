import { UniqueId } from 'src/domain/common/unique-id.vo'
import { ISessionRepo } from '../../adapters/session-repo.adapter'
import { Session } from '../../domain/entities/session.entity'

export class SessionRepoImpl implements ISessionRepo {
  private readonly _sessions: Session[] = []

  save(session: Session): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  get(id: UniqueId): Promise<Session | null> {
    throw new Error('Method not implemented.')
  }
}
