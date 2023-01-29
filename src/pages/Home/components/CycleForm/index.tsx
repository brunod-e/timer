import { useContext } from "react";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export const CycleForm = () => {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor=''>I will work on</label>
      <TaskInput
        id='task'
        list='task-list'
        disabled={!!activeCycle}
        placeholder='name your project here'
        {...register("task")}
      />

      <datalist id='task-list'>
        <option value='Project 1' />
        <option value='Project 2' />
        <option value='Project 3' />
      </datalist>

      <label htmlFor=''>for</label>
      <MinutesAmountInput
        type='number'
        id='minutesAmount'
        disabled={!!activeCycle}
        placeholder='00'
        step={5}
        max={60}
        min={5}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  );
};
