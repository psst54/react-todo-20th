import { Container } from './styles';

export default function TaskList({ taskList, taskHooks }) {
  return <Container>{taskList.map((task) => task.title)}</Container>;
}
