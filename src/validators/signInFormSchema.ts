import * as yup from 'yup'

export const SignInFormSchema = yup
  .object({
    email: yup
      .string()
      .required('E-mail obrigatório*')
      .email('E-mail inválido*'),
    password: yup.string().required('Senha obrigatória*'),
  })
  .required()
