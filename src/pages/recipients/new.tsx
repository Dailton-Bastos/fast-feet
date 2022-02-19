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
import { createAddressMutation } from '~/hooks/useAddress'
import { createRecipientMutation } from '~/hooks/useRecipient'
import { appLayout } from '~/layouts/App'
import {
  CreateRecipientAndAddressFormData,
  NextPageWithLayout,
} from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'
import { NewRecipientFormSchema } from '~/validators/newRecipientFormSchema'

const NewRecipient: NextPageWithLayout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const createRecipient = useMutation(createRecipientMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipients')
    },
    onError: () => queryClient.cancelMutations(),
  })

  const createAddress = useMutation(createAddressMutation)

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(NewRecipientFormSchema),
  })

  const { errors, isSubmitting } = formState

  const handleCreateRecipient: SubmitHandler<
    CreateRecipientAndAddressFormData
  > = async (formData) => {
    const {
      name,
      contact,
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
    } = formData

    const recipient = await createRecipient.mutateAsync({ name, contact })

    await createAddress.mutateAsync({
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      recipientId: recipient.id,
    })

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
