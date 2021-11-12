export class StopCurrentSessionDto {
  private constructor(public readonly id: string) {}

  static from(body: any) {
    return new StopCurrentSessionDto(body.id)
  }
}
