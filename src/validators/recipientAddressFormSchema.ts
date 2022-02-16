import * as yup from 'yup'

export const RecipientAddressFormSchema = {
  zip_code: yup
    .string()
    .required('CEP obrigatório*')
    .matches(/^[0-9]{5}[0-9]{3}$/, 'CEP inválido')
    .max(8, 'CEP inválido')
    .min(8, 'CEP inválido'),

  street: yup.string().required('Rua obrigatório*'),
  number: yup.string().required('Número obrigatório*'),
  neighborhood: yup.string().required('Bairro obrigatório*'),
  city: yup.string().required('Cidade obrigatório*'),
  state: yup.string().required('Estado obrigatório*'),
}
