import { HandPalm, Play } from 'phosphor-react'

import { differenceInSeconds } from 'date-fns'

import {
  // CountdownContainer,
  // FormContainer,
  HomeContainer,
  // Separator,
  StartCountdownButton,
  // MinutesAmountInput,
  // TaskInput,
  StopCountdownButton,
} from './styles'
import { useEffect, useState } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

// const newCycleValidadeSchema = zod.object({
//   task: zod.string().min(1, 'Informe a tarefa'),
//   minutesAmount: zod
//     .number()
//     .min(5, 'O intervalo precisa ser no mínimo e de 5 minutos')
//     .max(60, 'O intervalo precisa ser no máximo e de 60 minutos'),
// })

// type NewCycleFormData = zod.infer<typeof newCycleValidadeSchema>

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((c) => c.id === activeCycleId)

  // const totalSeconds = activeCycle ? activeCycle?.minutesAmount * 60 : 0

  // useEffect(() => {
  //   let interval: number
  //   if (activeCycle) {
  //     interval = setInterval(() => {
  //       const secondsDifference = differenceInSeconds(
  //         new Date(),
  //         activeCycle.startDate,
  //       )
  //       if (secondsDifference >= totalSeconds) {
  //         setCycles((state) =>
  //           state.map((cycle) => {
  //             if (cycle.id === activeCycleId) {
  //               return { ...cycle, finishedDate: new Date() }
  //             } else {
  //               return cycle
  //             }
  //           }),
  //         )

  //         clearInterval(interval)
  //       } else {
  //         setAmountSecondsPassed(secondsDifference)
  //       }
  //     }, 1000)
  //   }

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [activeCycle, totalSeconds, activeCycleId])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmintDisable = !task

  console.log(new Date(613281))

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm />
        <Countdown
          activeCycle={activeCycle}
          setCycles={setCycles}
          activeCycleId={activeCycleId}
        />

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} /> Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmintDisable} type="submit">
            <Play size={24} /> Começar
          </StartCountdownButton>
        )}

        {/* <StartCountdownButton disabled={isSubmintDisable} type="submit">
          <Play /> Começar
        </StartCountdownButton> */}
      </form>
    </HomeContainer>
  )
}
