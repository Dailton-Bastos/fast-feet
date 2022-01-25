import { createServer } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    routes() {
      this.namespace = '/mock-api'
      this.timing = 750

      this.namespace = ''
      this.passthrough()
    },
  })

  return server
}
