import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Header } from '../styles'

import { FormError, IntervalBox, IntervalContainer, IntervalDay, IntervalInputs, IntervalItem } from './styles'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { getWeekDays } from '@/ultis/get-week-days'
import { convertTimeStringToMinutes } from '@/ultis/convert-time-string-to-minutes'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'



const timeIntervalsFormSchema = z.object({
  intervals: z.array(z.object({
    weekDay: z.number().min(0).max(6),
    enabled: z.boolean(),
    startTime: z.string(),
    endTime: z.string()
  })
  )
    .length(7)
    .transform(intervals => intervals.filter(interval => interval.enabled))
    .refine(intervals => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia semana!'
    })
    .transform(intervals => intervals.map(interval => {
      return {
        weekDay: interval.weekDay,
        startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
        endTimeInMinutes: convertTimeStringToMinutes(interval.endTime)
      }
    }))
    .refine(intervals => {
      return intervals
        .every((interval) => interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes)
    }, {
      message: 'O Horário de término tem que ser no mínimo 1h de diferença!'
    })
})


type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>


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
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        {weekDay: 0,enabled: false, startTime: '08:00', endTime: '18:00'},
        {weekDay: 1,enabled: true, startTime: '08:00', endTime: '18:00'},
        {weekDay: 2,enabled: true, startTime: '08:00', endTime: '18:00'},
        {weekDay: 3,enabled: true, startTime: '08:00', endTime: '18:00'},
        {weekDay: 4,enabled: true, startTime: '08:00', endTime: '18:00'},
        {weekDay: 5,enabled: true, startTime: '08:00', endTime: '18:00'},
        {weekDay: 6,enabled: false, startTime: '08:00', endTime: '18:00'},
       ]
     }
  })
  
  const weekdays = getWeekDays()
  const router = useRouter()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function handleSetTimeIntervals(data: any) {
    const { intervals } = data as TimeIntervalsFormOutput
    try {
      const response = await api.post('/users/time-intervals', {
        intervals
      })
      await router.push('/register/update-profile')
    } catch (err) { 
      console.log(err)
    }
  


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
                    
                  >{weekdays[field.weekDay]}</Text>
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
        {errors?.intervals && (
          <FormError size='sm'>{errors?.intervals?.message}</FormError>
        )}
        <Button type='submit'>Próximo passo<ArrowRight /></Button>
        
      </IntervalBox>
    </Container>
  )
}
