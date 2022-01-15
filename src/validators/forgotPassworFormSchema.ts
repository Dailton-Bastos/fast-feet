import * as yup from 'yup'

export const ForgotPasswordFormSchema = yup
  .object({
    email: yup
      .string()
      .required('E-mail obrigatório*')
      .email('E-mail inválido*'),
  })
  .required()
