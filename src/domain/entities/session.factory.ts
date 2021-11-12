import { Timer } from '../timer'
import { Session } from './session.entity'

export class SessionFactory {
  public make() {
    return Session.make(new Timer())
  }
}
