/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { mock, mockReset } from 'jest-mock-extended'
import { PomodoroType } from '../enums/pomodoro.enum'
import { Timer } from '../timer'
import { Session } from './session.entity'

const mockedTimer = mock<Timer>()

describe('session.entity', () => {
  let sut: Session

  beforeEach(() => {
    sut = Session.make(mockedTimer)
  })

  afterEach(() => {
    mockReset(mockedTimer)
  })

  test('is defined', () => {
    expect(sut).toBeDefined()
  })

  test('starts a new session', () => {
    const beforePomos = [...sut.getPomodoros()]

    sut.start(jest.fn())

    const afterPomos = sut.getPomodoros()

    expect(beforePomos.length).toBe(0)
    expect(afterPomos.length).toBe(2)

    const lastPomo = afterPomos.at(-1)!
    expect(lastPomo.getType()).toBe(PomodoroType.SHORT_BREAK)
  })

  test('creates a long break', () => {
    sut.start(jest.fn())
    sut.next()
    sut.next()
    sut.next()

    const pomos = sut.getPomodoros()

    const lastPomo = pomos.at(-1)!

    expect(lastPomo.getType()).toBe(PomodoroType.LONG_BREAK)
  })

  test('sets finished to true when stopped', () => {
    sut.start(jest.fn())

    expect(sut.finished).toBeFalsy()

    sut.stop()

    expect(sut.finished).toBeTruthy()
  })
})
