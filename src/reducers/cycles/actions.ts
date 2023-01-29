import { Cycle } from "./reducer";

export enum ActionTypes {
  ADD_CYCLE = "ADD_CYCLE",
  STOP_CYCLE = "STOP_CYCLE",
  FINISH_CYCLE = "FINISH_CYCLE",
}

export const addCycleAction = (newCycle: Cycle) => ({
  type: ActionTypes.ADD_CYCLE,
  payload: { newCycle },
});

export const stopCycleAction = () => ({
  type: ActionTypes.STOP_CYCLE,
});

export const finishCycleAction = () => ({
  type: ActionTypes.FINISH_CYCLE,
});
