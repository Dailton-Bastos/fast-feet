import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import { Container, Box, SimpleGrid, Flex } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import { ErrorMessage } from '~/components/ErrorMessage'
import { HeaderForm } from '~/components/Form/Header'
import { Input } from '~/components/Form/Input'
import { Head } from '~/components/Head'
import { Loading } from '~/components/Loading'
import { AddressList } from '~/components/Recipients/Address/List'
import { useRecipient } from '~/hooks/useRecipient'
import { appLayout } from '~/layouts/App'
import { api } from '~/services/apiClient'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'
import { RecipientFormSchema } from '~/validators/recipientFormSchema'

type EditRecipientFormData = {
  name: string
  contact: string
}

const EditRecipient: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useRecipient(id as string)

  const editRecipient = useMutation(
    async (recipient: EditRecipientFormData) => {
      const response = await api.patch(`/recipients/${id}`, {
        recipient: {
          ...recipient,
          updated_at: new Date(),
        },
      })

      return response.data.recipient
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['recipient', id], {
          recipient: { ...data },
        })
        queryClient.invalidateQueries('recipients')
      },
    }
  )

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(RecipientFormSchema),
  })

  const { errors, isSubmitting } = formState

  const handleUpdateRecipient: SubmitHandler<EditRecipientFormData> = async (
    data
  ) => {
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
    <Container as="section" maxW="container.lg">
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
            />

            <Input
              {...register('contact')}
              id="contact"
              name="contact"
              label="Contato"
              placeholder="(xx) xxxxx-xxxx"
              defaultValue={data?.recipient.contact}
              error={errors.contact}
            />
          </SimpleGrid>
        </Box>
      </Box>

      <SimpleGrid spacing={4} columns={3}>
        <AddressList addresses={data?.recipient.addresses} />
      </SimpleGrid>
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
