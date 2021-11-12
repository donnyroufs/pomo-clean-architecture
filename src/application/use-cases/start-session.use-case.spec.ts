import { mock, mockReset } from 'jest-mock-extended'

import {
  StartSessionOutput,
  StartSessionUseCase,
} from './start-session.use-case'
import { ISessionRepo } from '../../adapters/session-repo.adapter'
import { Session } from '../../domain/entities/session.entity'

const mockedSessionRepo = mock<ISessionRepo>()

describe('start-session.usecase', () => {
  let sut: StartSessionUseCase

  beforeEach(() => {
    sut = new StartSessionUseCase(mockedSessionRepo)
  })

  afterEach(() => {
    mockReset(mockedSessionRepo)
  })

  test('is defined', () => {
    expect(sut).toBeDefined()
  })

  test('returns the session when started', async () => {
    const session = Session.make()
    StartSessionOutput.from(session)

    mockedSessionRepo.save.mockResolvedValue(true)
    mockedSessionRepo.get.mockResolvedValue(session)

    const sessionInfo = await sut.execute()

    expect(sessionInfo).toBeInstanceOf(StartSessionOutput)
  })
})
