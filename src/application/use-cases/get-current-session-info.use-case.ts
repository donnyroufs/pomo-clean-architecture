import { UniqueId } from 'src/domain/common/unique-id.vo'
import { ISessionRepo } from '../../adapters/session-repo.adapter'
import { IUseCase } from '../common/use-case.interface'
import { GetCurrentSessionInfoDto } from '../dtos/get-current-session-info.dto'
import { SessionDto } from '../dtos/session.dto'

export class GetCurrentSessionInfoUseCase
  implements IUseCase<GetCurrentSessionInfoDto, SessionDto> {
  constructor(private readonly _sessionRepo: ISessionRepo) {}

  async execute(input: GetCurrentSessionInfoDto): Promise<SessionDto | Error> {
    const session = await this._sessionRepo.get(input.id)

    if (!session) {
      return new Error('Session does not exist.')
    }

    return SessionDto.from(session)
  }
}
