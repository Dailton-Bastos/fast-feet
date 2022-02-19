import * as yup from 'yup'

import { RecipientAddressFormSchema } from './recipientAddressFormSchema'
import { RecipientFormSchema } from './recipientFormSchema'

export const NewRecipientFormSchema = yup
  .object({
    ...RecipientFormSchema,
  })
  .required()

export const NewRecipientWithAddressFormSchema = yup
  .object({
    ...RecipientFormSchema,
    ...RecipientAddressFormSchema,
  })
  .required()
