import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import { Container, Box, SimpleGrid, Flex, Button } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import { ErrorMessage } from '~/components/ErrorMessage'
import { HeaderForm } from '~/components/Form/Header'
import { Input } from '~/components/Form/Input'
import { Head } from '~/components/Head'
import { Loading } from '~/components/Loading'
import { RecipientAddressForm } from '~/components/Recipients/Address/Form'
import { AddressList } from '~/components/Recipients/Address/List'
import { createAddress, updateAddress, usePostalCode } from '~/hooks/useAddress'
import { updateRecipient, useRecipient } from '~/hooks/useRecipient'
import { appLayout } from '~/layouts/App'
import { queryClient } from '~/services/queryClient'
import { setAddressFormValues } from '~/utils/setAddressFormValues'
import {
  Address,
  RecipientAndAddressFormData,
  NextPageWithLayout,
  Recipient,
} from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'
import {
  NewRecipientFormSchema,
  NewRecipientWithAddressFormSchema,
} from '~/validators/newRecipientFormSchema'

const EditRecipient: NextPageWithLayout = () => {
  const [editAddress, setEditAddress] = React.useState(false)
  const [addNewAddress, setAddNewAddress] = React.useState(false)
  const [showAddressForm, setShowAddressForm] = React.useState(false)
  const [currentAddressId, setCurrentAddressId] = React.useState<
    number | undefined
  >()
  const [postalCode, setPostalCode] = React.useState('')
  const [showFullAddressForm, setShowFullAddressForm] = React.useState(false)

  const router = useRouter()
  const { id: recipientId } = router.query

  const { data, isLoading, isError } = useRecipient(String(recipientId))

  const { data: dataPostalCode, isLoading: isLoadingPostalCode } =
    usePostalCode(postalCode, postalCode ? true : false)

  const updateRecipientMutation = useMutation(
    (recipient: Partial<Recipient>) => {
      return updateRecipient(recipient, String(recipientId))
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['recipient', recipientId])
        queryClient.invalidateQueries('recipients')
      },
      onError: () => queryClient.cancelMutations(),
    }
  )

  const createAddressMutation = useMutation(createAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(['recipient', recipientId])

      setAddNewAddress(false)
      setShowAddressForm(false)
    },
    onError: () => queryClient.cancelMutations(),
  })

  const updateAddressMutation = useMutation(
    (address: Partial<Address>) => {
      return updateAddress(address, Number(currentAddressId))
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['recipient', recipientId])

        setEditAddress(false)
        setShowAddressForm(false)
      },
      onError: () => queryClient.cancelMutations(),
    }
  )

  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue,
    setFocus,
    clearErrors,
  } = useForm({
    resolver: yupResolver(
      editAddress || addNewAddress
        ? NewRecipientWithAddressFormSchema
        : NewRecipientFormSchema
    ),
    mode: 'all',
    reValidateMode: 'onSubmit',
  })

  const { errors, isSubmitting } = formState

  const handleSubmitForm: SubmitHandler<RecipientAndAddressFormData> = async (
    formData
  ) => {
    const address = {
      zip_code: formData.zip_code,
      street: formData.street,
      number: formData.number,
      complement: formData.complement,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state,
      recipientId: String(recipientId),
    }

    const recipient = {
      name: formData.name,
      contact: formData.contact,
    }

    if (addNewAddress) {
      await createAddressMutation.mutateAsync({ ...address })
    }

    if (editAddress) {
      await updateAddressMutation.mutateAsync({ ...address })
    }

    await updateRecipientMutation.mutateAsync(recipient)
  }

  React.useEffect(() => {
    if (dataPostalCode) {
      setAddressFormValues(dataPostalCode, setValue)
      setShowFullAddressForm(true)
    }
  }, [dataPostalCode, setValue])

  React.useEffect(() => {
    if (showFullAddressForm && dataPostalCode) {
      setFocus('number')
    }
  }, [setFocus, showFullAddressForm, dataPostalCode])

  if (isLoading) {
    return (
      <Flex align="center" justify="center" mt="8">
        <Loading size="xl" color="purple.500" />
      </Flex>
    )
  }

  if (isError) {
    return (
      <Flex align="center" justify="center" mt="8">
        <ErrorMessage message="Erro ao carregar informações do destinatário" />
      </Flex>
    )
  }

  return (
    <Container as="section" maxW="container.lg" pb="8">
      <Head
        title={data?.recipient.name || ''}
        description="Fastfeet - Editar destinatário"
      />

      <Box as="form" mt="3.5" mb="5" onSubmit={handleSubmit(handleSubmitForm)}>
        <HeaderForm title="Edição de destinatário" isLoading={isSubmitting} />

        <Box bg="white" borderRadius={4} boxShadow="sm" py="10" px="8" mt="5">
          <SimpleGrid spacing={4} columns={2}>
            <Input
              {...register('name')}
              id="name"
              name="name"
              label="Nome completo"
              placeholder="John Doe"
              defaultValue={data?.recipient.name}
              error={errors.name}
              isDisabled={addNewAddress || editAddress}
            />

            <Input
              {...register('contact')}
              id="contact"
              name="contact"
              label="Contato"
              placeholder="(xx) xxxxx-xxxx"
              defaultValue={data?.recipient.contact}
              error={errors.contact}
              isDisabled={addNewAddress || editAddress}
            />
          </SimpleGrid>

          <Box mt="4">
            {showAddressForm && editAddress && (
              <RecipientAddressForm
                register={register}
                errors={errors}
                handleChangePostalCode={setPostalCode}
                showFullAddressForm={true}
                isLoading={isLoadingPostalCode}
              />
            )}

            {showAddressForm && addNewAddress && (
              <RecipientAddressForm
                register={register}
                errors={errors}
                handleChangePostalCode={setPostalCode}
                showFullAddressForm={showFullAddressForm}
                isLoading={isLoadingPostalCode}
              />
            )}
          </Box>
        </Box>
      </Box>

      {!showAddressForm && (
        <SimpleGrid spacing={4} columns={3} mb="4">
          <AddressList
            setFormValues={setValue}
            addresses={data?.recipient.addresses}
            setCurrentAddressId={setCurrentAddressId}
            handleClick={() => {
              setAddNewAddress(false)
              setShowAddressForm(true)
              setEditAddress(true)
            }}
          />
        </SimpleGrid>
      )}

      {!showAddressForm ? (
        <Button
          borderRadius="base"
          colorScheme="purple"
          fontSize="sm"
          height="9"
          size="md"
          type="button"
          textTransform="uppercase"
          variant="solid"
          onClick={() => {
            setAddNewAddress(true)
            setShowAddressForm(true)
            setShowFullAddressForm(false)
            setEditAddress(false)
          }}
        >
          Adicionar endereço
        </Button>
      ) : (
        <Button
          borderRadius="base"
          colorScheme="red"
          fontSize="sm"
          height="9"
          size="md"
          type="button"
          textTransform="uppercase"
          variant="solid"
          onClick={() => {
            clearErrors()
            setAddNewAddress(false)
            setShowAddressForm(false)
            setEditAddress(false)
            reset()
          }}
        >
          Cancelar
        </Button>
      )}
    </Container>
  )
}

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    }
  },
  {
    permissions: ['recipients.edit'],
    roles: ['administrator'],
  }
)

EditRecipient.getLayout = appLayout

export default EditRecipient
