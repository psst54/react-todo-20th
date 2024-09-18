import { Container } from './styles';

export default function Task({ task }) {
  return (
    <Container key={task.id}>
      <input type="checkbox" checked={task.isCompleted} />
      <p>{task.title}</p>
    </Container>
  );
}
