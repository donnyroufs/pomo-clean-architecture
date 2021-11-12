import { BaseEntity } from '../common/base.entity'
import { PomodoroType } from '../enums/pomodoro.enum'
import { TimeVo } from '../value-objects/time.vo'

export class Pomodoro extends BaseEntity {
  public time: TimeVo

  protected constructor(public readonly _type: PomodoroType) {
    super()

    this.time = TimeVo.make(this.getTimeByType(_type))
  }

  public getType(): PomodoroType {
    return this._type
  }

  private getTimeByType(type: PomodoroType) {
    if (type === PomodoroType.SHORT_BREAK) {
      return 5
    }

    if (type === PomodoroType.LONG_BREAK) {
      return 15
    }

    return 25
  }

  public static make(type: PomodoroType = PomodoroType.WORK): Pomodoro {
    return new Pomodoro(type)
  }
}
