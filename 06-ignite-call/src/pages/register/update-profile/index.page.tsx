/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSession } from "next-auth/next"

import { Avatar, Button, Heading, MultiStep, Text, TextArea, TextInput } from '@ignite-ui/react'

import { ArrowRight } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'


import { Container, Header, FormError } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { buildNextAuthOptions } from "@/pages/api/auth/[...nextauth].api"
import { useSession } from "next-auth/react"
import { api } from "@/lib/axios"
import { useRouter } from "next/router"

const UpdateProfileSchema = z.object({
  bio: z.string()
})

type UpdateProfileData = z.infer<typeof UpdateProfileSchema>
// @ts-ignore
export default function UpdateProfile(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileSchema),
  })

  const session = useSession()
  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/update-profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Foto de perfil</Text>
          <Avatar src={session.data?.user.avatar_url} alt={session.data?.user.name} />
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  
  const session = await getServerSession(req, res, buildNextAuthOptions(req, res))
  return {
    props: {
      session
    }
  }
}