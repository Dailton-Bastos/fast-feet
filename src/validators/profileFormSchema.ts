import * as yup from 'yup'

export const ProfileFormSchema = yup
  .object({
    name: yup
      .string()
      .required('Nome obrigatório*')
      .min(6, 'No mínimo 6 caracteres*'),
  })
  .required()
