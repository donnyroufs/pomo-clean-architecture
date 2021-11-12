import 'dotenv/config'
import { StartSessionUseCase } from './application/use-cases/start-session.use-case'
import { SessionFactory } from './domain/entities/session.factory'

import { MakeCLI } from './infra/implementations/drivers/cli'
import { SessionRepoImpl } from './infra/implementations/session-repo.impl'

export async function bootstrap() {
  const sessionRepo = new SessionRepoImpl()
  const sessionFactory = new SessionFactory()
  const startSessionUseCase = new StartSessionUseCase(
    sessionRepo,
    sessionFactory
  )

  const CLI = MakeCLI({
    startSessionUseCase,
  })

  await CLI.run()
}

bootstrap()
