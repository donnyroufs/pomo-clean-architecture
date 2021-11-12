/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PomodoroType } from './pomodoro.entity'
import { Session } from './session.entity'

describe('session.entity', () => {
  test('is defined', () => {
    const session = Session.make()

    expect(session).toBeDefined()
  })

  test('starts a new session', () => {
    const session = Session.make()
    const beforePomos = [...session.getPomodoros()]

    session.start()

    const afterPomos = session.getPomodoros()

    expect(beforePomos.length).toBe(0)
    expect(afterPomos.length).toBe(2)

    const lastPomo = afterPomos.at(-1)!
    expect(lastPomo.getType()).toBe(PomodoroType.SHORT_BREAK)
  })

  test('creates a long break', () => {
    const session = Session.make()

    session.start()
    session.next()
    session.next()
    session.next()

    const pomos = session.getPomodoros()

    const lastPomo = pomos.at(-1)!

    expect(lastPomo.getType()).toBe(PomodoroType.LONG_BREAK)
  })

  test.todo('cannot call next when current pomo is not done')
  test.todo('cannot start when already started')
})
