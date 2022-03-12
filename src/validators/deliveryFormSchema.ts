import * as yup from 'yup'

export const DeliveryFormSchema = yup
  .object({
    productName: yup.string().required('Nome do produto obrigatório*'),
    deliveryman: yup.string().required('Entregador obrigatório*'),
    recipient: yup.string().required('Destinatário obrigatório*'),
  })
  .required()
