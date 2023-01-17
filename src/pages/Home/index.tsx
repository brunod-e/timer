import { Play } from "phosphor-react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";

export const Home = () => (
  <HomeContainer>
    <form action=''>
      <FormContainer>
        <label htmlFor=''>I will work on</label>
        <TaskInput
          id='task'
          list='task-list'
          placeholder='Name your project here'
        />

        <datalist id='task-list'>
          <option value='Project 1' />
        </datalist>

        <label htmlFor=''>for</label>
        <MinutesAmountInput
          type='number'
          id='minutesAmount'
          placeholder='00'
          step={5}
          max={60}
          min={0}
        />

        <span>minutes.</span>
      </FormContainer>

      <CountdownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountdownContainer>

      <StartCountdownButton type='submit'>
        <Play size={24} /> Start
      </StartCountdownButton>
    </form>
  </HomeContainer>
);
