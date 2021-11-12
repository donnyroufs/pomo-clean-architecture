import { mock, mockReset } from 'jest-mock-extended'
import { ISessionRepo } from '../../adapters/session-repo.adapter'
import { Session } from '../../domain/entities/session.entity'
import { GetCurrentSessionInfoDto } from '../dtos/get-current-session-info.dto'
import { SessionDto } from '../dtos/session.dto'
import { GetCurrentSessionInfoUseCase } from './get-current-session-info.use-case'

const mockedSessionRepo = mock<ISessionRepo>()
const mockedSession = mock<Session>()

describe('get-current-session-info.use-case', () => {
  let sut: GetCurrentSessionInfoUseCase

  beforeEach(() => {
    sut = new GetCurrentSessionInfoUseCase(mockedSessionRepo)
  })

  afterEach(() => {
    mockReset(mockedSessionRepo)
  })

  test('is defined', () => {
    expect(sut).toBeDefined()
  })

  test('returns the current session', async () => {
    mockedSessionRepo.get.mockResolvedValue(mockedSession)

    const input = GetCurrentSessionInfoDto.from({
      id: 'some-id',
    })

    const sessionInfo = await sut.execute(input)

    expect(sessionInfo).toBeInstanceOf(SessionDto)
  })

  test('returns an error when failed', async () => {
    mockedSessionRepo.get.mockResolvedValue(null)

    const input = GetCurrentSessionInfoDto.from({
      id: 'some-id',
    })

    const sessionInfo = await sut.execute(input)

    expect(sessionInfo).toBeInstanceOf(Error)
  })
})
