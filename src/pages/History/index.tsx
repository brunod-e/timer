import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

export const History = () => {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>My History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Started at</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} min</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startedAt), {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  {!!cycle.finishedAt && (
                    <Status statusColor='green'>Completed</Status>
                  )}
                  {!!cycle.stoppedAt && (
                    <Status statusColor='red'>Stopped</Status>
                  )}
                  {!cycle.finishedAt && !cycle.stoppedAt && (
                    <Status statusColor='yellow'>In progress</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};
