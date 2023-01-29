import { differenceInSeconds } from "date-fns";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  ActionTypes,
  addCycleAction,
  finishCycleAction,
  stopCycleAction,
} from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CyclesContextData {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  finishCycle: () => void;
  addCycle: (data: CycleFormData) => void;
  stopCycle: () => void;
}

interface CycleFormData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextData);

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedCyclesState = localStorage.getItem(
        "@timer:cycles-state-1.0.0"
      );

      if (storedCyclesState) {
        return JSON.parse(storedCyclesState);
      }
    }
  );
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startedAt));
    }

    return 0;
  });

  const setSecondsPassed = (seconds: number) => setAmountSecondsPassed(seconds);

  const finishCycle = () => dispatch(finishCycleAction());

  const addCycle = (data: CycleFormData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    };

    dispatch(addCycleAction(newCycle));

    setAmountSecondsPassed(0);
  };

  const stopCycle = () => dispatch(stopCycleAction());

  useEffect(() => {
    const cyclesStateString = JSON.stringify(cyclesState);

    localStorage.setItem("@timer:cycles-state-1.0.0", cyclesStateString);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        setSecondsPassed,
        finishCycle,
        addCycle,
        stopCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
