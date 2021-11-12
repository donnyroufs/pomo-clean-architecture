export class TimeVo {
  private constructor(private readonly _value: number) {}

  getValue(): number {
    return this._value
  }

  static make(minutes: number): TimeVo {
    const timeInMs = minutes * 60 * 1000

    return new TimeVo(10_000)
  }
}
