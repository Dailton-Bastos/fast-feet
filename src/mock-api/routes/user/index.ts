import { Server } from 'miragejs'

import { getAllUsers } from './list.routes'
import { getUser } from './me.routes'

export function registerUserRoutes(context: Server) {
  return {
    getAllUsers: getAllUsers(context),
    getUser: getUser(context),
  }
}
