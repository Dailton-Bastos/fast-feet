import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import {
  Container,
  Box,
  SimpleGrid,
  Flex,
  Button,
  useToast,
} from '@chakra-ui/react'
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
  const [showListAddresses, setShowListAddresses] = React.useState(true)
  const [isNewAddress, setIsNewAddress] = React.useState(false)
  const [isEditAddress, setIsEditAddress] = React.useState(false)
  const [showPostalCodeInput, setShowPostalCodeInput] = React.useState(false)
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

  const toast = useToast()

  const updateRecipientMutation = useMutation(
    (recipient: Partial<Recipient>) => {
      return updateRecipient(recipient, String(recipientId))
    },

    {
      onSuccess: () => {
        toast({
          description: 'Atualizado com sucesso!',
          position: 'bottom-left',
          status: 'success',
          isClosable: true,
        })
        queryClient.invalidateQueries(['recipient', recipientId])
        queryClient.invalidateQueries('recipients')
      },
      onError: () => {
        toast({
          title: 'Ocorreu um erro!',
          description: 'Tente novamente!',
          position: 'bottom-left',
          status: 'error',
          isClosable: true,
        })
        queryClient.cancelMutations()
      },
    }
  )

  const createAddressMutation = useMutation(createAddress, {
    onSuccess: () => {
      toast({
        title: 'Novo endereço!',
        description: 'Novo endereço adicionado!',
        position: 'bottom-left',
        status: 'success',
        isClosable: true,
      })
      queryClient.invalidateQueries(['recipient', recipientId])
    },
    onError: () => {
      toast({
        title: 'Ocorreu um erro!',
        description: 'Tente novamente!',
        position: 'bottom-left',
        status: 'error',
        isClosable: true,
      })
      queryClient.cancelMutations()
    },
  })

  const updateAddressMutation = useMutation(
    (address: Partial<Address>) => {
      return updateAddress(address, Number(currentAddressId))
    },
    {
      onSuccess: () => {
        toast({
          description: 'Atualizado com sucesso!',
          position: 'bottom-left',
          status: 'success',
          isClosable: true,
        })
        queryClient.invalidateQueries(['recipient', recipientId])
      },
      onError: () => {
        toast({
          title: 'Ocorreu um erro!',
          description: 'Tente novamente!',
          position: 'bottom-left',
          status: 'error',
          isClosable: true,
        })
        queryClient.cancelMutations()
      },
    }
  )

  const onUpdateAndNewAddressStateMutation = React.useCallback(() => {
    setIsEditAddress(false)
    setIsNewAddress(false)
    setShowFullAddressForm(false)
    setShowPostalCodeInput(false)
    setShowListAddresses(true)
    setPostalCode('')
  }, [])

  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue,
    setFocus,
    clearErrors,
    setError,
  } = useForm({
    resolver: yupResolver(
      isEditAddress || isNewAddress
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
      zipCode: formData.zip_code,
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

    if (isNewAddress) {
      await createAddressMutation.mutateAsync(
        { ...address },
        {
          onSuccess: () => onUpdateAndNewAddressStateMutation(),
        }
      )

      return
    }

    if (isEditAddress) {
      await updateAddressMutation.mutateAsync(
        { ...address },
        {
          onSuccess: () => onUpdateAndNewAddressStateMutation(),
        }
      )

      return
    }

    await updateRecipientMutation.mutateAsync(recipient)
  }

  React.useEffect(() => {
    if (dataPostalCode?.zip_code) {
      setAddressFormValues(dataPostalCode, setValue)
      setShowPostalCodeInput(false)
      setShowFullAddressForm(true)
    }
  }, [dataPostalCode, setValue])

  React.useEffect(() => {
    if (showFullAddressForm && dataPostalCode?.zip_code) {
      setFocus('number')
      clearErrors()
    }
  }, [setFocus, showFullAddressForm, dataPostalCode, clearErrors])

  React.useEffect(() => {
    if (dataPostalCode && !dataPostalCode.zip_code) {
      setShowFullAddressForm(false)
      setShowPostalCodeInput(true)
      setPostalCode('')
      setValue('zip_code', '')

      setError(
        'zip_code',
        {
          type: 'manual',
          message: 'CEP não encontrado.',
        },
        {
          shouldFocus: true,
        }
      )
    }
  }, [dataPostalCode, setError, setPostalCode, setValue])

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
          <SimpleGrid spacing={4} columns={[1, 2]}>
            <Input
              {...register('name')}
              id="name"
              name="name"
              label="Nome completo"
              placeholder="John Doe"
              defaultValue={data?.recipient.name}
              error={errors.name}
              isDisabled={isNewAddress || isEditAddress}
            />

            <Input
              {...register('contact')}
              id="contact"
              name="contact"
              label="Contato"
              placeholder="(xx) xxxxx-xxxx"
              defaultValue={data?.recipient.contact}
              error={errors.contact}
              isDisabled={isNewAddress || isEditAddress}
            />
          </SimpleGrid>

          <Box mt="4">
            <RecipientAddressForm
              register={register}
              errors={errors}
              setError={setError}
              showPostalCodeInput={showPostalCodeInput}
              handleChangePostalCode={setPostalCode}
              isLoading={isLoadingPostalCode}
              showFullAddressForm={showFullAddressForm}
            />
          </Box>
        </Box>
      </Box>

      {showListAddresses && (
        <SimpleGrid spacing={4} columns={[1, 3]} mb="4">
          <AddressList
            setFormValues={setValue}
            addresses={data?.recipient.addresses}
            setCurrentAddressId={setCurrentAddressId}
            handleClickStates={() => {
              setShowListAddresses(false)
              setIsEditAddress(true)
              setShowFullAddressForm(true)
            }}
          />
        </SimpleGrid>
      )}

      {showListAddresses ? (
        <Button
          borderRadius="base"
          colorScheme="purple"
          fontSize="sm"
          height="9"
          size="md"
          type="button"
          textTransform="uppercase"
          variant="solid"
          w={['100%', 'auto']}
          onClick={() => {
            setShowListAddresses(false)
            setIsNewAddress(true)
            setShowPostalCodeInput(true)
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
          w={['100%', 'auto']}
          onClick={() => {
            clearErrors()
            reset()
            setShowListAddresses(true)
            setIsNewAddress(false)
            setIsEditAddress(false)
            setShowPostalCodeInput(false)
            setShowFullAddressForm(false)
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
