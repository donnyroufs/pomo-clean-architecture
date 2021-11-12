import { BaseEntity } from '../common/base.entity'
import { Pomodoro, PomodoroType } from './pomodoro.entity'

export class Session extends BaseEntity {
  private _timerId: NodeJS.Timer
  private _elapsedMS = 0
  private _currentCycle = 0

  private readonly _pomodoros: Pomodoro[] = []

  private constructor() {
    super()
  }

  public start() {
    const totalTime = 0
    let index = 0

    this._timerId = setInterval(() => {
      console.clear()
      console.log(this._elapsedMS)

      // What is the current pomodoroIndex
      const pomoTimeTable = this._pomodoros.map((p) => p.time.getValue())

      // [10_000, 10_000]
      // beginning index: 0
      //
      // 10_000, index 1

      let sum = 0

      pomoTimeTable.forEach((p, i) => {
        sum += p

        if (this._elapsedMS > sum) {
          index += 1
          return
        }
      })

      console.log(sum, index)

      this._elapsedMS += 1000
    }, 1000)

    this.createPomodoros()
  }

  public getPomodoros() {
    return this._pomodoros
  }

  public next() {
    this.createPomodoros()
  }

  private createPomodoros() {
    if (this.isWorkingPomodoro()) {
      const pomodoro = Pomodoro.make()
      this.addPomodoro(pomodoro)

      const breakType = this.isLongBreak()
        ? PomodoroType.LONG_BREAK
        : PomodoroType.SHORT_BREAK

      const pomodoroBreak = Pomodoro.make(breakType)
      this.addPomodoro(pomodoroBreak)
    }
  }

  private addPomodoro(pomo: Pomodoro) {
    this._pomodoros.push(pomo)
  }

  private isLongBreak(): boolean {
    return this.isLastPomodoroOfCycle()
  }

  private isWorkingPomodoro() {
    return this._pomodoros.length % 2 === 0
  }

  private getWorkingPomodoros(): Pomodoro[] {
    return this._pomodoros.filter(
      (pomo) => pomo.getType() === PomodoroType.WORK
    )
  }

  private isLastPomodoroOfCycle() {
    const pomos = this.getWorkingPomodoros()
    const currentLength = pomos.length

    return currentLength % 4 === 0
  }

  static make(): Session {
    return new Session()
  }
}
