import * as yup from 'yup'

import { RecipientAddressFormSchema } from './recipientAddressFormSchema'

export const RecipientFormSchema = yup
  .object({
    name: yup
      .string()
      .required('Nome obrigatório*')
      .min(6, 'No mínimo 6 caracteres*'),
    contact: yup.string().required('Contato obrigatório*'),

    ...RecipientAddressFormSchema,
  })
  .required()
