import { Session } from '../../domain/entities/session.entity'

export class GetCurrentSessionInfoDto {
  private constructor(public readonly id: Session['id']['value']) {}

  public static from(raw: any) {
    return new GetCurrentSessionInfoDto(raw.id)
  }
}
