import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQueryClient, useMutation } from 'react-query'

import { Container, Box, SimpleGrid, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import { HeaderForm } from '~/components/Form/Header'
import { Input } from '~/components/Form/Input'
import { Head } from '~/components/Head'
import { RecipientAddressForm } from '~/components/Recipients/Address/Form'
import { appLayout } from '~/layouts/App'
import { api } from '~/services/apiClient'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'
import { RecipientFormSchema } from '~/validators/recipientFormSchema'

type CreateAddressAndRecipientFormData = {
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

const NewRecipient: NextPageWithLayout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  async function handleMutation(formData: CreateAddressAndRecipientFormData) {
    const addressIds = []

    try {
      const addressResponse = await api.post('/addresses', {
        address: {
          zip_code: formData.zip_code,
          street: formData.street,
          number: formData.number,
          complement: formData.complement,
          city: formData.city,
          neighborhood: formData.neighborhood,
          state: formData.state,
          created_at: new Date(),
          updated_at: new Date(),
        },
      })

      addressIds.push(addressResponse.data.address.id)

      const recipientResponse = await api.post('/recipients', {
        recipient: {
          name: formData.name,
          contact: formData.contact,
          addressIds,
          created_at: new Date(),
          updated_at: new Date(),
        },
      })

      return recipientResponse.data.recipient
    } catch (error) {
      queryClient.cancelMutations()
    }
  }

  const createRecipient = useMutation(handleMutation, {
    onSuccess: () => queryClient.invalidateQueries('recipients'),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(RecipientFormSchema),
  })

  const { errors, isSubmitting } = formState

  const handleCreateRecipient: SubmitHandler<
    CreateAddressAndRecipientFormData
  > = async (formData) => {
    await createRecipient.mutateAsync(formData)

    router.push('/recipients')
  }

  return (
    <Container as="section" maxW="container.lg">
      <Head
        title="Novo destinatário"
        description="Fastfeet - Adicionar novo destinatário"
      />

      <Box
        as="form"
        mt="3.5"
        mb="10"
        onSubmit={handleSubmit(handleCreateRecipient)}
      >
        <HeaderForm
          title="Cadastro de destinatário"
          linkBack="/recipients"
          isLoading={isSubmitting}
        />

        <Box
          bg="white"
          borderRadius={4}
          boxShadow="sm"
          flex="1"
          py="10"
          px="8"
          mt="5"
        >
          <Stack spacing={4}>
            <SimpleGrid spacing={4} columns={2}>
              <Input
                {...register('name')}
                id="name"
                name="name"
                label="Nome completo"
                placeholder="John Doe"
                error={errors.name}
              />

              <Input
                {...register('contact')}
                id="contact"
                name="contact"
                label="Contato"
                placeholder="(xx) xxxxx-xxxx"
                error={errors.contact}
              />
            </SimpleGrid>

            <RecipientAddressForm register={register} errors={errors} />
          </Stack>
        </Box>
      </Box>
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
    permissions: ['recipients.create'],
    roles: ['administrator'],
  }
)

NewRecipient.getLayout = appLayout

export default NewRecipient
