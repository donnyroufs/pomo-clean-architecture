import { ISessionRepo } from '../../adapters/session-repo.adapter'
import { IUseCase } from '../common/use-case.interface'
import { SessionFactory } from '../../domain/entities/session.factory'
import { SessionDto } from '../dtos/session.dto'
import { Callback } from 'src/domain/entities/session.entity'

export class StartSessionUseCase
  implements IUseCase<Callback, SessionDto, Error> {
  constructor(
    private readonly _sessionRepo: ISessionRepo,
    private readonly _sessionFactory: SessionFactory
  ) {}

  async execute(input: Callback): Promise<SessionDto | Error> {
    const session = this._sessionFactory.make()

    const isSaved = await this._sessionRepo.save(session)

    if (!isSaved) {
      return new Error('Failed to save session.')
    }

    const foundSession = await this._sessionRepo.get(session.id.value)

    if (foundSession == null) {
      return new Error('Failed to save session.')
    }

    foundSession.start(input)

    return SessionDto.from(foundSession)
  }
}
