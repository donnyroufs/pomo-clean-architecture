import { mock, mockReset } from 'jest-mock-extended'
import { Session } from '../../domain/entities/session.entity'
import { ISessionRepo } from '../../adapters/session-repo.adapter'
import { StopCurrentSessionUseCase } from './stop-current-session.use-case'
import { StopCurrentSessionDto } from '../dtos/stop-current-session.dto'
import { SessionDto } from '../dtos/session.dto'

const mockedSessionRepo = mock<ISessionRepo>()
const mockedSession = mock<Session>()

describe('stop-current-session.use-case', () => {
  let sut: StopCurrentSessionUseCase

  beforeEach(() => {
    sut = new StopCurrentSessionUseCase(mockedSessionRepo)
  })

  afterEach(() => {
    mockReset(mockedSessionRepo)
  })

  test('is defined', () => {
    expect(sut).toBeDefined()
  })

  test('stops the current session', async () => {
    mockedSessionRepo.get.mockResolvedValue(mockedSession)

    const input = StopCurrentSessionDto.from({
      id: 'some-id',
    })

    await sut.execute(input)

    expect(mockedSession.stop).toHaveBeenCalledTimes(1)
  })

  test('returns the stopped session', async () => {
    mockedSessionRepo.get.mockResolvedValue(mockedSession)

    const input = StopCurrentSessionDto.from({
      id: 'some-id',
    })

    const session = await sut.execute(input)

    expect(session).toBeInstanceOf(SessionDto)
  })
})
