import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQueryClient, useMutation } from 'react-query'

import {
  Container,
  Box,
  VStack,
  Flex,
  Text,
  Input as ChakraInput,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { HeaderForm } from '~/components/Form/Header'
import { Input } from '~/components/Form/Input'
import { Head } from '~/components/Head'
import { appLayout } from '~/layouts/App'
import { api } from '~/services/apiClient'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'
import { NewDeliverymanFormSchema } from '~/validators/newDeliveryman'

import avatarIcon from '../../../public/images/avatar_icon.png'

type CreateDeliverymanFormData = {
  name: string
  contact: string
}

const NewDeliveryman: NextPageWithLayout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const createDeliveryman = useMutation(
    async (deliveryman: CreateDeliverymanFormData) => {
      const response = await api.post('/deliverymen', {
        deliveryman: {
          ...deliveryman,
          created_at: new Date(),
          updated_at: new Date(),
        },
      })

      return response.data.deliveryman
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('deliverymen')
      },
    }
  )

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(NewDeliverymanFormSchema),
  })

  const { errors, isSubmitting } = formState

  const handleCreateDeliveryman: SubmitHandler<
    CreateDeliverymanFormData
  > = async (values) => {
    await createDeliveryman.mutateAsync(values)

    router.push('/deliverymen')
  }

  return (
    <Container as="section" maxW="container.lg">
      <Head
        title="Novo entregador"
        description="Fastfeet - Adicionar novo entregador"
      />

      <Box
        as="form"
        mt="3.5"
        mb="10"
        onSubmit={handleSubmit(handleCreateDeliveryman)}
      >
        <HeaderForm
          title="Cadastro de entregadores"
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
          <Flex
            as="label"
            align="center"
            borderStyle="dashed"
            borderWidth="1px"
            borderColor="#ddd"
            borderRadius="50%"
            cursor="pointer"
            direction="column"
            htmlFor="avatar"
            height="40"
            justify="center"
            mx="auto"
            mb="6"
            width="40"
          >
            <Image height={39} src={avatarIcon} width={39} priority />
            <Text color="#ddd" fontWeight="semibold">
              Adicionar foto
            </Text>

            <ChakraInput type="file" name="avatar" id="avatar" display="none" />
          </Flex>

          <VStack spacing={'4'}>
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
    permissions: ['deliverymen.create'],
    roles: ['administrator'],
  }
)

NewDeliveryman.getLayout = appLayout

export default NewDeliveryman
