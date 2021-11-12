import { BaseEntity } from '../common/base.entity'
import { UniqueId } from '../common/unique-id.vo'
import { PomodoroType } from '../enums/pomodoro.enum'
import { Timer } from '../timer'
import { Pomodoro } from './pomodoro.entity'

export type Callback = (timeLeftInMs: number, currentPomodoro: Pomodoro) => void

export class Session extends BaseEntity {
  public finished = false
  private readonly _pomodoros: Pomodoro[] = []

  private constructor(private readonly _timer: Timer) {
    super()
  }

  public start(callback: Callback) {
    this.createPomodoros()

    let total = this._pomodoros.reduce(
      (acc, curr) => acc + curr.time.getValue(),
      0
    )

    let index = 0
    let lastIndex = 0

    this._timer.start((elapsed) => {
      const pomoTimeTable = this._pomodoros.map((p) => p.time.getValue())
      let sum = 0

      const timeLeftInMs = sum - elapsed

      callback(timeLeftInMs, this._pomodoros[index])

      pomoTimeTable.some((time, i) => {
        if (sum + time > elapsed) {
          if (lastIndex !== i) {
            index += 1
            lastIndex = i
          }
          return true
        }

        sum += time
      })

      elapsed += 1000

      if (elapsed >= total) {
        this.next()

        total = this._pomodoros.reduce(
          (acc, curr) => acc + curr.time.getValue(),
          0
        )
      }
    })
  }

  public stop() {
    this._timer.stop()
    this.finished = true
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

  static make(timer: Timer): Session {
    return new Session(timer)
  }
}
