import { useContext } from "react";
import { HandPalm, Play } from "phosphor-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { CycleForm } from "./components/CycleForm";
import { Countdown } from "./components/Countdown";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

type CycleFormData = zod.infer<typeof newCycleValidationSchema>;

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, { message: "Task name is required" }),
  minutesAmount: zod.number().positive().int().max(60).min(1),
});

export const Home = () => {
  const { activeCycle, addCycle, stopCycle } = useContext(CyclesContext);

  const cycleForm = useForm<CycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, reset, watch } = cycleForm;

  const handleAddCycle = (data: CycleFormData) => {
    addCycle(data);
    reset();
  };

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleAddCycle)} action=''>
        <FormProvider {...cycleForm}>
          <CycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={stopCycle} type='button'>
            <HandPalm size={24} /> Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
            <Play size={24} /> Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};
