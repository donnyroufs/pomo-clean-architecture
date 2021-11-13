import { StartSessionUseCase } from 'src/application/use-cases/start-session.use-case'
import { Pomodoro } from 'src/domain/entities/pomodoro.entity'
import { PomodoroType } from 'src/domain/enums/pomodoro.enum'

import { formatDuration, intervalToDuration } from 'date-fns'

export class CLI {
  public constructor(
    private readonly _startSessionUseCase: StartSessionUseCase
  ) {}

  async run() {
    let elapsed = 0

    const session = await this._startSessionUseCase.execute((ms, pomodoro) => {
      const time = Math.abs(ms) - elapsed
      const pomoTime = pomodoro.time.getValue()
      const pomoType = this.getPomodoroType(pomodoro)
      const duration = this.getDurationAndFormat(time, pomoTime)

      if (time === pomoTime) {
        elapsed += pomoTime
      }

      this.print(duration, pomoType)
    })

    if (session instanceof Error) {
      return console.error(session.message)
    }
  }

  private print(duration: string, type: string) {
    console.clear()
    console.log(`current pomodoro: ${type} - [${duration}]`)
  }

  private getPomodoroType(pomodoro: Pomodoro) {
    return PomodoroType[pomodoro.getType()].toLowerCase()
  }

  private getDurationAndFormat(time: number, pomoTime: number) {
    const duration = intervalToDuration({
      start: time,
      end: pomoTime,
    })

    return formatDuration(duration)
  }
}
