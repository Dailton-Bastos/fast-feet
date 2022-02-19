import * as yup from 'yup'

import { RecipientAddressFormSchema } from './recipientAddressFormSchema'
import { RecipientFormSchema } from './recipientFormSchema'

export const NewRecipientFormSchema = yup
  .object({
    ...RecipientFormSchema,
    ...RecipientAddressFormSchema,
  })
  .required()
