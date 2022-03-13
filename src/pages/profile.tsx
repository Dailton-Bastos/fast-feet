import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query'

import {
  Container,
  Box,
  VStack,
  Flex,
  Avatar,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import { HeaderForm } from '~/components/Form/Header'
import { Input } from '~/components/Form/Input'
import { Head } from '~/components/Head'
import { useAuthContext } from '~/contexts/AuthContext'
import { updateUserProfile } from '~/hooks/useUser'
import { appLayout } from '~/layouts/App'
import { NextPageWithLayout, UserProfile } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'
import { ProfileFormSchema } from '~/validators/profileFormSchema'

const UserProfile: NextPageWithLayout = () => {
  const router = useRouter()
  const { user } = useAuthContext()
  const toast = useToast()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(ProfileFormSchema),
  })

  const { errors, isSubmitting } = formState

  const editUserProfile = useMutation(
    async (user: UserProfile) => {
      await updateUserProfile(user)
    },
    {
      onSuccess: () => {
        toast({
          description: 'Atualizado com sucesso!',
          position: 'bottom-left',
          status: 'success',
          isClosable: true,
        })
      },
      onError: () => {
        toast({
          title: 'Ocorreu um erro!',
          description: 'Tente novamente!',
          position: 'bottom-left',
          status: 'error',
          isClosable: true,
        })
      },
    }
  )

  const handleSubmitForm: SubmitHandler<UserProfile> = async (formData) => {
    await editUserProfile.mutateAsync({
      ...formData,
      id: user?.id as string,
    })

    router.push('/dashboard')
  }

  if (!user) return null

  return (
    <Container as="section" maxW="container.lg">
      <Head title={user.name} description="Fastfeet - Editar perfil" />

      <Box as="form" mt="3.5" mb="10" onSubmit={handleSubmit(handleSubmitForm)}>
        <HeaderForm title="Edição de perfil" isLoading={isSubmitting} />

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
            <Avatar name={user.name} src={user.avatar} size="2xl" />
          </Flex>

          <VStack spacing={'4'}>
            <Input
              isDisabled
              id="Email"
              name="email"
              label="E-mail"
              defaultValue={user.email}
            />

            <Input
              {...register('name')}
              id="name"
              name="name"
              label="Nome"
              placeholder="John Doe"
              defaultValue={user.name}
              error={errors.name}
            />
          </VStack>
        </Box>
      </Box>
    </Container>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  }
})

UserProfile.getLayout = appLayout

export default UserProfile
