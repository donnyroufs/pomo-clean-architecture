import { StartSessionUseCase } from 'src/application/use-cases/start-session.use-case'
import { CLI } from './CLI'

export interface IMakeCliDeps {
  startSessionUseCase: StartSessionUseCase
}

export const MakeCLI = (deps: IMakeCliDeps) => new CLI(deps.startSessionUseCase)
