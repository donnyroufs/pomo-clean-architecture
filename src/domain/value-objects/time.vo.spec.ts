import { TimeVo } from './time.vo'

describe('time-vo', () => {
  test('is defined', () => {
    const time = TimeVo.make(10)

    expect(time).toBeDefined()
  })

  test('gets time in ms', () => {
    const time = TimeVo.make(10)
    const expectedTimeInMs = 600_000

    expect(time.getValue()).toBe(expectedTimeInMs)
  })
})
