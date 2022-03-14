import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query'

import {
  Container,
  Box,
  Flex,
  Stack,
  SimpleGrid,
  RadioGroup,
  Radio,
  Text,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import { ErrorMessage } from '~/components/ErrorMessage'
import { HeaderForm } from '~/components/Form/Header'
import { Input } from '~/components/Form/Input'
import { Select } from '~/components/Form/Select'
import { Head } from '~/components/Head'
import { Loading } from '~/components/Loading'
import { updateDelivery, useDelivery } from '~/hooks/useDelivery'
import { useDeliverymen } from '~/hooks/useDeliverymen'
import { useRecipients } from '~/hooks/useRecipients'
import { appLayout } from '~/layouts/App'
import { queryClient } from '~/services/queryClient'
import { Delivery, NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'
import { DeliveryFormSchema } from '~/validators/deliveryFormSchema'

type StatusType = 'pending' | 'shipped' | 'delivered' | 'cancelled'

const EditDeliveryman: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading, isError } = useDelivery(String(id))

  const { data: dataDeliverymen } = useDeliverymen(1, 1000)
  const { data: dataRecipients } = useRecipients(1, 1000)

  const [deliverymanId, setDeliverymanId] = React.useState('')
  const [recipientId, setRecipientId] = React.useState('')

  const [deliveryStatus, setDeliveryStatus] =
    React.useState<StatusType>('pending')

  const toast = useToast()

  const editDelivery = useMutation(
    async (delivery: Delivery) => {
      await updateDelivery(delivery, String(id))
    },
    {
      onSuccess: () => {
        toast({
          description: 'Atualizado com sucesso!',
          position: 'bottom-left',
          status: 'success',
          isClosable: true,
        })
        queryClient.invalidateQueries(['delivery', id])
        queryClient.invalidateQueries('recentDeliveries')
        queryClient.invalidateQueries('deliveries')
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

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(DeliveryFormSchema),
  })

  const { errors, isSubmitting } = formState

  const handleSubmitForm: SubmitHandler<Delivery> = async (formData) => {
    const data = {
      ...formData,
      status: deliveryStatus,
      shipped_at: deliveryStatus === 'shipped' ? new Date() : '',
      cancelled_at: deliveryStatus === 'cancelled' ? new Date() : '',
      delivered_at: deliveryStatus === 'delivered' ? new Date() : '',
    }

    await editDelivery.mutateAsync(data)

    router.push('/deliveries')
  }

  const updateDeliveryStatus = React.useCallback((value: StatusType) => {
    return setDeliveryStatus(value)
  }, [])

  React.useEffect(() => {
    if (!data?.delivery) return

    const { delivery } = data

    const status = delivery.status || 'pending'
    setDeliveryStatus(status)

    setDeliverymanId(String(delivery?.deliveryman?.id))
    setRecipientId(String(delivery?.recipient?.id))
  }, [data])

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
        <ErrorMessage message="Erro ao carregar informações da encomenda" />
      </Flex>
    )
  }

  if (!data?.delivery) return null

  return (
    <Container as="section" maxW="container.lg">
      <Head
        title={data.delivery.productName || ''}
        description="Fastfeet - Editar entrega"
      />

      <Box as="form" mt="3.5" mb="10" onSubmit={handleSubmit(handleSubmitForm)}>
        <HeaderForm title="Edição de encomenda" isLoading={isSubmitting} />

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
            <SimpleGrid spacing={4} columns={[1, 2]}>
              {dataDeliverymen && deliverymanId && (
                <Select
                  register={register}
                  id="deliveryman"
                  name="deliveryman"
                  label="Entregador"
                  defaultValue={deliverymanId}
                  setValue={setDeliverymanId}
                  options={dataDeliverymen.deliverymen}
                  error={errors.deliveryman}
                />
              )}

              {dataRecipients && recipientId && (
                <Select
                  register={register}
                  name="recipient"
                  id="recipient"
                  label="Destinatário"
                  defaultValue={recipientId}
                  setValue={setRecipientId}
                  options={dataRecipients.recipients}
                  error={errors.recipient}
                />
              )}
            </SimpleGrid>

            <Text fontSize="md" fontWeight="bold">
              Status da encomenda:
            </Text>

            <RadioGroup
              defaultValue={data.delivery.status}
              onChange={updateDeliveryStatus}
              name="status"
            >
              <Stack spacing={4} direction={['column', 'row']}>
                <Radio value="shipped" colorScheme="blue">
                  Retirada
                </Radio>
                <Radio value="delivered" colorScheme="green">
                  Entregue
                </Radio>
                <Radio value="pending" colorScheme="yellow">
                  Pendente
                </Radio>
                <Radio value="cancelled" colorScheme="red">
                  Cancelada
                </Radio>
              </Stack>
            </RadioGroup>

            <Input
              {...register('productName')}
              id="productName"
              name="productName"
              label="Nome do produto"
              placeholder="iPhone XR"
              defaultValue={data.delivery.productName}
              error={errors.productName}
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
    permissions: ['deliveries.edit'],
    roles: ['administrator'],
  }
)

EditDeliveryman.getLayout = appLayout

export default EditDeliveryman
