import 'dotenv/config'
import { Session } from './domain/entities/session.entity'

export function bootstrap() {
  const session = Session.make()

  session.start()
  const pomos = session.getPomodoros()

  console.log({
    init: pomos,
  })
}

bootstrap()
