import { TimeVo } from '../value-objects/time.vo'
import { Pomodoro, PomodoroType } from './pomodoro.entity'

describe('pomodoro.entity', () => {
  test('is defined', () => {
    const pomodoro = Pomodoro.make()

    expect(pomodoro).toBeDefined()
  })

  test('get the pomodoro type', () => {
    const pomodoro = Pomodoro.make()
    const pomodoroTwo = Pomodoro.make(PomodoroType.SHORT_BREAK)

    expect(pomodoro.getType()).toBe(PomodoroType.WORK)
    expect(pomodoroTwo.getType()).toBe(PomodoroType.SHORT_BREAK)
  })

  test('start pomodoro', () => {
    const pomo = Pomodoro.make()

    const timer = pomo.start()

    expect(timer).toBeInstanceOf(TimeVo)
  })
})
