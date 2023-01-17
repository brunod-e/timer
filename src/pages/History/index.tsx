import { HistoryContainer, HistoryList, Status } from "./styles";

export const History = () => (
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
          <tr>
            <td>Task description</td>
            <td>20min</td>
            <td>two months ago</td>
            <td>
              <Status statusColor='green'>Done</Status>
            </td>
          </tr>
          <tr>
            <td>Task description</td>
            <td>20min</td>
            <td>two months ago</td>
            <td>
              <Status statusColor='yellow'>In progress</Status>
            </td>
          </tr>
          <tr>
            <td>Task description</td>
            <td>20min</td>
            <td>two months ago</td>
            <td>
              <Status statusColor='red'>Stopped</Status>
            </td>
          </tr>
        </tbody>
      </table>
    </HistoryList>
  </HistoryContainer>
);
