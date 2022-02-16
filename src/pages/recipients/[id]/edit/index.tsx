import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import { Container, Box, SimpleGrid, Flex, Button } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import * as yup from 'yup'

import { ErrorMessage } from '~/components/ErrorMessage'
import { HeaderForm } from '~/components/Form/Header'
import { Input } from '~/components/Form/Input'
import { Head } from '~/components/Head'
import { Loading } from '~/components/Loading'
import { RecipientAddressForm } from '~/components/Recipients/Address/Form'
import { AddressList } from '~/components/Recipients/Address/List'
import { useRecipient } from '~/hooks/useRecipient'
import { appLayout } from '~/layouts/App'
import { api } from '~/services/apiClient'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'
import { RecipientAddressFormSchema } from '~/validators/recipientAddressFormSchema'
import { RecipientFormSchema } from '~/validators/recipientFormSchema'

type AddressAndRecipientFormData = {
  zip_code: string
  street: string
  number: string
  complement?: string
  city: string
  neighborhood: string
  state: string
  name: string
  contact: string
}

const EditRecipient: NextPageWithLayout = () => {
  const [editOrNewAddress, setEditOrNewAddress] = React.useState(false)
  const [addNewAddress, setAddNewAddress] = React.useState(false)

  const router = useRouter()
  const { id } = router.query
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useRecipient(id as string)

  const formDataSchemaWithoutAddress = yup
    .object({
      ...RecipientFormSchema,
    })
    .required()

  const formDataSchemaWithAddress = yup
    .object({
      ...RecipientFormSchema,
      ...RecipientAddressFormSchema,
    })
    .required()

  async function handleMutation(formData: AddressAndRecipientFormData) {
    const addressFormData = {
      zip_code: formData.zip_code,
      street: formData.street,
      number: formData.number,
      complement: formData.complement,
      city: formData.city,
      neighborhood: formData.neighborhood,
      state: formData.state,
    }

    const recipientFormData = {
      name: formData.name,
      contact: formData.contact,
    }

    try {
      if (addNewAddress) {
        const response = await api.post('/addresses', {
          address: {
            ...addressFormData,
            recipientId: id,
            created_at: new Date(),
            updated_at: new Date(),
          },
        })

        return response.data.address
      }

      const response = await api.patch(`/recipients/${id}`, {
        recipient: {
          ...recipientFormData,
          updated_at: new Date(),
        },
      })

      return response.data.recipient
    } catch (error) {
      queryClient.cancelMutations()
    }
  }

  const editRecipient = useMutation(handleMutation, {
    onSuccess: (data) => {
      if (addNewAddress) {
        queryClient.invalidateQueries(['recipient', id])
        setAddNewAddress(false)
      }
      queryClient.setQueryData(['recipient', id], {
        recipient: { ...data },
      })
      queryClient.invalidateQueries('recipients')
    },
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(
      editOrNewAddress
        ? formDataSchemaWithAddress
        : formDataSchemaWithoutAddress
    ),
  })

  const { errors, isSubmitting } = formState

  const handleUpdateRecipient: SubmitHandler<
    AddressAndRecipientFormData
  > = async (data) => {
    await editRecipient.mutateAsync(data)

    router.push('/recipients')
  }

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

      <Box
        as="form"
        mt="3.5"
        mb="5"
        onSubmit={handleSubmit(handleUpdateRecipient)}
      >
        <HeaderForm
          title="Edição de destinatário"
          linkBack="/recipients"
          isLoading={isSubmitting}
        />

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
              isDisabled={addNewAddress}
            />

            <Input
              {...register('contact')}
              id="contact"
              name="contact"
              label="Contato"
              placeholder="(xx) xxxxx-xxxx"
              defaultValue={data?.recipient.contact}
              error={errors.contact}
              isDisabled={addNewAddress}
            />
          </SimpleGrid>

          {editOrNewAddress && (
            <Box mt="4">
              <RecipientAddressForm register={register} errors={errors} />
            </Box>
          )}
        </Box>
      </Box>

      {!editOrNewAddress && (
        <SimpleGrid spacing={4} columns={3} mb="4">
          <AddressList addresses={data?.recipient.addresses} />
        </SimpleGrid>
      )}

      <Button
        borderRadius="base"
        colorScheme={!editOrNewAddress ? 'purple' : 'red'}
        fontSize="sm"
        height="9"
        size="md"
        type="button"
        textTransform="uppercase"
        variant="solid"
        onClick={() => {
          setEditOrNewAddress(!editOrNewAddress)
          setAddNewAddress(!addNewAddress)
        }}
      >
        {!editOrNewAddress ? 'Adicionar endereço' : 'Cancelar'}
      </Button>
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
