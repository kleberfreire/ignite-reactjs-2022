import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";

import { ArrowRight } from "phosphor-react";

import { Container, Header } from "../styles";

export default function ConnectCalendar() {



  return (
    <Container>
      <Header>
        <Heading>Bem-vindo ao Ignite Call!</Heading>
        <Text>Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2}/>
      </Header>
        <Button type="submit" >
          Próximo passo 
          <ArrowRight />
        </Button>
    </Container>
  )
}