export type CallbackFn = (ms: number) => void

export class Timer {
  private _timeId: NodeJS.Timer | null
  private _elapsedMS = 0

  public start(callback: CallbackFn): number {
    this._timeId = setInterval(() => {
      callback(this._elapsedMS)
      this._elapsedMS += 1000
    }, 1000)

    return new Date().getTime()
  }

  public stop(): boolean {
    if (!this._timeId) return false

    clearInterval(this._timeId)

    return true
  }
}
