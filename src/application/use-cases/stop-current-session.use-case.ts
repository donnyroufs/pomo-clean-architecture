import { ISessionRepo } from 'src/adapters/session-repo.adapter'
import { IUseCase } from '../common/use-case.interface'
import { SessionDto } from '../dtos/session.dto'
import { StopCurrentSessionDto } from '../dtos/stop-current-session.dto'

export class StopCurrentSessionUseCase
  implements IUseCase<StopCurrentSessionDto, SessionDto> {
  constructor(private readonly _sessionRepo: ISessionRepo) {}

  async execute(input: StopCurrentSessionDto): Promise<SessionDto | Error> {
    const session = await this._sessionRepo.get(input.id)

    if (!session) {
      return new Error('Session does not exist.')
    }

    session.stop()

    return SessionDto.from(session)
  }
}
