import { BaseEntity } from '../common/base.entity'
import { TimeVo } from '../value-objects/time.vo'

export enum PomodoroType {
  WORK = 1,
  SHORT_BREAK,
  LONG_BREAK,
}

export class Pomodoro extends BaseEntity {
  public time: TimeVo

  protected constructor(public readonly _type: PomodoroType) {
    super()

    this.start()
  }

  public start(): TimeVo {
    this.time = TimeVo.make(5)

    return this.time
  }

  public getType(): PomodoroType {
    return this._type
  }

  public static make(type: PomodoroType = PomodoroType.WORK): Pomodoro {
    return new Pomodoro(type)
  }
}
