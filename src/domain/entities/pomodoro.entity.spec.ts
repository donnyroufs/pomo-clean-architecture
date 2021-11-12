import { PomodoroType } from '../enums/pomodoro.enum'
import { Pomodoro } from './pomodoro.entity'

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

  test('sets time based on type', () => {
    const shortPomo = Pomodoro.make(PomodoroType.SHORT_BREAK)
    const expectedShortPomoTime = 5 * 60 * 1000

    const longPomo = Pomodoro.make(PomodoroType.LONG_BREAK)
    const expectedLongPomoTime = 15 * 60 * 1000

    const workPomo = Pomodoro.make(PomodoroType.WORK)
    const expectedWorkPromoTime = 25 * 60 * 1000

    expect(shortPomo.time.getValue()).toBe(expectedShortPomoTime)
    expect(longPomo.time.getValue()).toBe(expectedLongPomoTime)
    expect(workPomo.time.getValue()).toBe(expectedWorkPromoTime)
  })
})
