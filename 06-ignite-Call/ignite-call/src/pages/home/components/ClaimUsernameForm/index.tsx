import { TextInput, Button, Text } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"


const claimUsernameFormSchema = z.object({
  username: z.string()
    .min(3, { message: 'O usuário nescessita ter pelo menos 3 letras'})
    .regex(/^([a-z\\-]+)$/i, { message: ` somente letras é hifens`})
    .transform(username => username.toLowerCase())
})

type claimUsernameFormData = z.infer<typeof claimUsernameFormSchema> 

export function ClaimUsernameForm() {
  const { register, handleSubmit, formState:{ errors } } = useForm<claimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
    defaultValues: {
      username: ''
    }
  });

  async function handleClaimUsername(data:claimUsernameFormData) {
    console.log(data)
  }


  return (
    <>
    
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size={"sm"}
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register('username')}
        />

        <Button size="sm" type="submit">
          Reservar usuário 
          <ArrowRight />
        </Button>
    
      </Form>
      <FormAnnotation>
        <Text size='sm'>
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'
          }
        </Text>
      </FormAnnotation>
    </>
  )
}