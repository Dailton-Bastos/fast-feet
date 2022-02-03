import { AppSchema } from '../auth/types'

export const statistics = (schema: AppSchema) => {
  const deliverymen = schema.all('deliveryman').length
  const recipients = schema.all('recipient').length
  const problems = schema.all('problem').length
  const deliveries = schema.all('delivery').length

  return { deliverymen, recipients, problems, deliveries }
}
