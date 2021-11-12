import { Timer } from './timer'

describe('timer', () => {
  let sut: Timer

  beforeEach(() => {
    sut = new Timer()
  })

  test('is defined', () => {
    expect(sut).toBeDefined()
  })

  test('starts the timer', () => {
    const timestamp = sut.start(() => null)

    expect(timestamp).toEqual(expect.any(Number))
  })

  test('stops the timer', () => {
    sut.start(() => null)
    const result = sut.stop()

    expect(result).toBeTruthy()
  })

  afterEach(() => {
    sut.stop()
  })
})
