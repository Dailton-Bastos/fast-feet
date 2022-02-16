import * as yup from 'yup'

export const RecipientFormSchema = {
  name: yup
    .string()
    .required('Nome obrigatório*')
    .min(6, 'No mínimo 6 caracteres*'),
  contact: yup.string().required('Contato obrigatório*'),
}
