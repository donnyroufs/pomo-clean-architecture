import { Session } from '../../domain/entities/session.entity'

export class SessionDto {
  private constructor(public readonly id: Session['id']['value']) {}

  public static from(session: Session) {
    return new SessionDto(session.id.value)
  }
}
