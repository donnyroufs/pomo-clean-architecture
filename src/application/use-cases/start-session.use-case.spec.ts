import { mock, mockDeep, mockReset } from 'jest-mock-extended'

import { Session } from '../../domain/entities/session.entity'
import { Timer } from '../../domain/timer'
import { SessionFactory } from '../../domain/entities/session.factory'
import { StartSessionUseCase } from './start-session.use-case'
import { ISessionRepo } from '../../adapters/session-repo.adapter'
import { SessionDto } from '../dtos/session.dto'

const mockedSessionRepo = mock<ISessionRepo>()
const mockedSessionFactory = mockDeep<SessionFactory>()
const mockedTimer = mock<Timer>()

describe('start-session.usecase', () => {
  let sut: StartSessionUseCase

  beforeEach(() => {
    sut = new StartSessionUseCase(mockedSessionRepo, mockedSessionFactory)
  })

  afterEach(() => {
    mockReset(mockedSessionRepo)
    mockReset(mockedTimer)
    mockReset(mockedSessionFactory)
  })

  test('is defined', () => {
    expect(sut).toBeDefined()
  })

  test('returns the session when started', async () => {
    mockedSessionFactory.make.mockReturnValue(Session.make(mockedTimer))
    const session = Session.make(mockedTimer)
    SessionDto.from(session)

    mockedSessionRepo.save.mockResolvedValue(true)
    mockedSessionRepo.get.mockResolvedValue(session)

    const sessionInfo = await sut.execute(jest.fn())

    expect(sessionInfo).toBeInstanceOf(SessionDto)
  })

  test.todo('starts the session')
})
