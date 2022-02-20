import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQueryClient, useMutation } from 'react-query'

import { Container, Box, VStack, Flex, Avatar } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import { ErrorMessage } from '~/components/ErrorMessage'
import { HeaderForm } from '~/components/Form/Header'
import { Input } from '~/components/Form/Input'
import { Head } from '~/components/Head'
import { Loading } from '~/components/Loading'
import { updateDeliveryman, useDeliveryman } from '~/hooks/useDeliveryman'
import { appLayout } from '~/layouts/App'
import { Deliveryman, NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'
import { DeliverymanFormSchema } from '~/validators/deliverymanFormSchema'

const EditDeliveryman: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useDeliveryman(String(id))

  const editDeliveryman = useMutation(
    async (deliveryman: Deliveryman) => {
      await updateDeliveryman(deliveryman, String(id))
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['deliveryman', id])
        queryClient.invalidateQueries('deliverymen')
        queryClient.invalidateQueries('rankDeliverymen')
      },
    }
  )

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(DeliverymanFormSchema),
  })

  const { errors, isSubmitting } = formState

  const handleSubmitForm: SubmitHandler<Deliveryman> = async (formData) => {
    await editDeliveryman.mutateAsync(formData)

    router.push('/deliverymen')
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
        <ErrorMessage message="Erro ao carregar informações do entregador" />
      </Flex>
    )
  }

  return (
    <Container as="section" maxW="container.lg">
      <Head
        title={data?.deliveryman.name || ''}
        description="Fastfeet - Editar entregador"
      />

      <Box as="form" mt="3.5" mb="10" onSubmit={handleSubmit(handleSubmitForm)}>
        <HeaderForm title="Edição de entregadores" isLoading={isSubmitting} />

        <Box
          bg="white"
          borderRadius={4}
          boxShadow="sm"
          flex="1"
          py="10"
          px="8"
          mt="5"
        >
          <Flex align="center" justify="center" mx="auto" mb="6">
            <Avatar
              name={data?.deliveryman.name}
              src={data?.deliveryman.avatar}
              size="2xl"
            />
          </Flex>

          <VStack spacing={'4'}>
            <Input
              {...register('name')}
              id="name"
              name="name"
              label="Nome completo"
              placeholder="John Doe"
              defaultValue={data?.deliveryman.name}
              error={errors.name}
            />

            <Input
              {...register('contact')}
              id="contact"
              name="contact"
              label="Contato"
              placeholder="(xx) xxxxx-xxxx"
              defaultValue={data?.deliveryman.contact}
              error={errors.contact}
            />
          </VStack>
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
    permissions: ['deliverymen.edit'],
    roles: ['administrator'],
  }
)

EditDeliveryman.getLayout = appLayout

export default EditDeliveryman
