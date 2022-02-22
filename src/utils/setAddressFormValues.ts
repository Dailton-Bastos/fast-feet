import { FieldValues, UseFormSetValue } from 'react-hook-form'

import { Address } from './types'

type SetValue = UseFormSetValue<FieldValues>

export function setAddressFormValues(
  address: Partial<Address>,
  setValue: SetValue
) {
  setValue('zip_code', address?.zip_code)
  setValue('street', address?.street)
  setValue('number', address?.number)
  setValue('complement', address?.complement)
  setValue('neighborhood', address?.neighborhood)
  setValue('city', address?.city)
  setValue('state', address?.state)
}
