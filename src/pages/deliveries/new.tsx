import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import { Box, Container, SimpleGrid, Stack, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import { HeaderForm } from '~/components/Form/Header'
import { Input } from '~/components/Form/Input'
import { Select } from '~/components/Form/Select'
import { Head } from '~/components/Head'
import { createDelivery } from '~/hooks/useDeliveries'
import { useDeliverymen } from '~/hooks/useDeliverymen'
import { useRecipients } from '~/hooks/useRecipients'
import { appLayout } from '~/layouts/App'
import { queryClient } from '~/services/queryClient'
import { Delivery, NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'
import { DeliveryFormSchema } from '~/validators/deliveryFormSchema'

const NewDelivery: NextPageWithLayout = () => {
  const { data: dataDeliverymen } = useDeliverymen(1, 1000)
  const { data: dataRecipients } = useRecipients(1, 1000)

  const [deliverymanId, setDeliverymanId] = React.useState('')
  const [recipientId, setRecipientId] = React.useState('')

  const router = useRouter()
  const toast = useToast()

  const createDeliveryMutation = useMutation(createDelivery, {
    onSuccess: () => {
      toast({
        title: 'Nova encomenda!',
        description: 'Criada com sucesso!',
        position: 'bottom-left',
        status: 'success',
        isClosable: true,
      })

      queryClient.invalidateQueries('deliveries')
    },
    onError: () => {
      toast({
        title: 'Nova encomenda!',
        description: 'Erro ao criar encomenda!',
        position: 'bottom-left',
        status: 'error',
        isClosable: true,
      })
    },
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(DeliveryFormSchema),
  })

  const { errors, isSubmitting } = formState

  const handleSubmitForm: SubmitHandler<Partial<Delivery>> = async (
    formData
  ) => {
    await createDeliveryMutation.mutateAsync(formData)

    router.push('/deliveries')
  }

  return (
    <Container as="section" maxW="container.lg">
      <Head
        title="Nova encomenda"
        description="Fastfeet - Cadastrar encomenda"
      />

      <Box as="form" mt="3.5" mb="10" onSubmit={handleSubmit(handleSubmitForm)}>
        <HeaderForm title="Cadastro de encomendas" isLoading={isSubmitting} />

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
              {dataDeliverymen && (
                <Select
                  register={register}
                  id="deliveryman"
                  name="deliveryman"
                  label="Entregador"
                  value={deliverymanId}
                  setValue={setDeliverymanId}
                  options={dataDeliverymen.deliverymen}
                  error={errors.deliveryman}
                />
              )}

              {dataRecipients && (
                <Select
                  register={register}
                  name="recipient"
                  id="recipient"
                  label="Destinatário"
                  value={recipientId}
                  setValue={setRecipientId}
                  options={dataRecipients.recipients}
                  error={errors.recipient}
                />
              )}
            </SimpleGrid>

            <Input
              {...register('productName')}
              id="productName"
              name="productName"
              label="Nome do produto"
              placeholder="iPhone XR"
              error={errors.name}
            />
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
    permissions: ['deliveries.create'],
    roles: ['administrator'],
  }
)

NewDelivery.getLayout = appLayout

export default NewDelivery
