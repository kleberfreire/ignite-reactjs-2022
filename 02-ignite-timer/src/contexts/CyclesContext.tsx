import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  ActionsTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentAsCycleFinishedAction,
} from '../reducers/cycles/actions'
import { cyclesReducer } from '../reducers/cycles/reduces'

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}
interface INewCycleFormData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  activeCycle: ICycle | undefined
  cycles: ICycle[]
  activeCycleId: string | null
  markCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: INewCycleFormData) => void
  InterruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface ICyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: ICyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-time:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((c) => c.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-time:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function markCycleAsFinished() {
    dispatch(markCurrentAsCycleFinishedAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: INewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function InterruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        InterruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
