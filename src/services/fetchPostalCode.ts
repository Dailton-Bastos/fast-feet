import axios from 'axios'

import { Address } from '~/utils/types'

type GetPostalCodeResponse = Partial<Address>

export const getPostalCode = async (
  postalCode: string
): Promise<GetPostalCodeResponse> => {
  const baseURL = `https://viacep.com.br/ws/${postalCode}/json/`

  try {
    const { data } = await axios.get(baseURL)

    if (!data.error) {
      const address = {
        zip_code: data.cep,
        street: data.logradouro,
        complement: data.complemento,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      }

      return address
    }

    return data
  } catch (error) {
    throw new Error('Error')
  }
}
