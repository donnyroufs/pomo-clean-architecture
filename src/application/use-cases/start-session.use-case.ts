/* eslint-disable @typescript-eslint/no-empty-interface */
import { Session } from '../../domain/entities/session.entity'
import { ISessionRepo } from '../../adapters/session-repo.adapter'
import { IUseCase } from '../common/use-case.interface'

export class StartSessionOutput {
  private constructor(public readonly id: Session['id']['value']) {}

  static from(session: Session) {
    return new StartSessionOutput(session.id.value)
  }
}

export class StartSessionUseCase
  implements IUseCase<never, StartSessionOutput> {
  constructor(private readonly _sessionRepo: ISessionRepo) {}

  async execute(): Promise<StartSessionOutput> {
    const session = Session.make()

    const isSaved = await this._sessionRepo.save(session)

    if (!isSaved) {
      throw new Error('failed to save session.')
    }

    const foundSession = await this._sessionRepo.get(session.id)

    if (foundSession == null) {
      throw new Error('failed to save session.')
    }

    return StartSessionOutput.from(foundSession)
  }
}
