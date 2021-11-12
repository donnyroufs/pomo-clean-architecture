export class TimeVo {
  private constructor(private readonly _value: number) {}

  getValue(): number {
    return this._value
  }

  static make(minutes: number): TimeVo {
    return new TimeVo(this.minutesToMs(minutes))
  }

  private static minutesToMs(minutes: number) {
    return minutes * 60 * 1000
  }
}
