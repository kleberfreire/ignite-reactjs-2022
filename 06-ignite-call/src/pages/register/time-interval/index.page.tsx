import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Header } from '../styles'

import { IntervalBox, IntervalContainer, IntervalDay, IntervalInputs, IntervalItem } from './styles'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { getWeekDays } from '@/ultis/get-week-days'



const timeIntervalsFormSchema = z.object({
  intervals: z.array(z.object({
    weekday: z.number().min(0).max(6),
    enabled: z.boolean(),
    startTime: z.string(),
    endTime: z.string()
  }))
})


// const timeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>


// @ts-ignore
export default function TimeInterval(props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        {weekday: 0,enabled: false, startTime: '08:00', endTime: '18:00'},
        {weekday: 1,enabled: true, startTime: '08:00', endTime: '18:00'},
        {weekday: 2,enabled: true, startTime: '08:00', endTime: '18:00'},
        {weekday: 3,enabled: true, startTime: '08:00', endTime: '18:00'},
        {weekday: 4,enabled: true, startTime: '08:00', endTime: '18:00'},
        {weekday: 5,enabled: true, startTime: '08:00', endTime: '18:00'},
        {weekday: 6,enabled: false, startTime: '08:00', endTime: '18:00'},
       ]
     }
  })
  
  const weekdays = getWeekDays()


  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function handleSetTimeIntervals() {
    
  }
  
  const intervals = watch('intervals')

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as='form' onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    control={control}
                    name={`intervals.${index}.enabled`}
                    render={({ field }) => (
                      <Checkbox
                        onCheckedChange={(checked: any) => {
                          field.onChange(checked === true);
                        }}
                        checked={field.value}
                      />
                    )}
                  />
                  
                  <Text
                    
                  >{weekdays[field.weekday]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  {/* @ts-ignore */}
                  <TextInput
                    size="sm" type="time" step={60} 
                    {...register(`intervals.${index}.startTime`)} 
                    disabled={intervals[index].enabled === false}
                  />
                  {/* @ts-ignore */}
                  <TextInput
                    size="sm" type="time" step={60}
                    {...register(`intervals.${index}.endTime`)} 
                    disabled={intervals[index].enabled === false}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        
        </IntervalContainer>
        <Button type='submit'>Próximo passo<ArrowRight /></Button>
        
      </IntervalBox>
    </Container>
  )
}
