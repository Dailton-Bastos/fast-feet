import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQueryClient, useMutation } from 'react-query'

import {
  Container,
  Box,
  VStack,
  Flex,
  Avatar,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import { HeaderForm } from '~/components/Form/Header'
import { Input } from '~/components/Form/Input'
import { Head } from '~/components/Head'
import { useDeliveryman } from '~/hooks/useDeliveryman'
import { appLayout } from '~/layouts/App'
import { api } from '~/services/apiClient'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'
import { NewDeliverymanFormSchema } from '~/validators/newDeliveryman'

type EditDeliverymanFormData = {
  name: string
  contact: string
}

const EditDeliveryman: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useDeliveryman(id as string)

  const editDeliveryman = useMutation(
    async (deliveryman: EditDeliverymanFormData) => {
      const response = await api.patch(`/deliverymen/${id}`, {
        deliveryman: {
          ...deliveryman,
          updated_at: new Date(),
        },
      })

      return response.data.deliveryman
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['deliveryman', id], {
          deliveryman: { ...data },
        })
        queryClient.invalidateQueries('deliverymen')
      },
    }
  )

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(NewDeliverymanFormSchema),
  })

  const { errors, isSubmitting } = formState

  const handleUpdateDeliveryman: SubmitHandler<
    EditDeliverymanFormData
  > = async (values) => {
    await editDeliveryman.mutateAsync(values)

    router.push('/deliverymen')
  }

  if (isLoading) {
    return (
      <Flex align="center" justify="center">
        <Spinner size="lg" color="purple.500" />
      </Flex>
    )
  }

  if (isError) {
    return (
      <Flex align="center" justify="center">
        <Text fontSize="sm" fontWeight="semibold" color="red.500" mt="6">
          Erro ao carregar informações do entregador
        </Text>
      </Flex>
    )
  }

  return (
    <Container as="section" maxW="container.lg">
      <Head
        title={data?.deliveryman.name || ''}
        description="Fastfeet - Editar entregador"
      />

      <Box
        as="form"
        mt="3.5"
        mb="10"
        onSubmit={handleSubmit(handleUpdateDeliveryman)}
      >
        <HeaderForm
          title="Edição de entregadores"
          linkBack="/deliverymen"
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
