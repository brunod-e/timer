import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { CountdownContainer, Separator } from "./styles";

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    setSecondsPassed,
    finishCycle,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutesString = String(minutesAmount).padStart(2, "0");
  const secondsString = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const differenceInSecondsValue = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startedAt)
        );

        if (differenceInSecondsValue >= totalSeconds) {
          finishCycle();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(differenceInSecondsValue);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeCycle, totalSeconds, activeCycleId, finishCycle]);

  useEffect(() => {
    if (activeCycle) document.title = `[ ${minutesString}:${secondsString} ]`;
  }, [activeCycle, minutesString, secondsString]);

  return (
    <CountdownContainer>
      <span>{minutesString[0]}</span>
      <span>{minutesString[1]}</span>
      <Separator>:</Separator>
      <span>{secondsString[0]}</span>
      <span>{secondsString[1]}</span>
    </CountdownContainer>
  );
};
