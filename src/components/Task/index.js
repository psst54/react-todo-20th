import { Button } from 'components/TaskList/styles';
import { Container, Title } from './styles';

export default function Task({ subjectId, task, deleteTaskFromSubject }) {
  return (
    <Container key={task.id}>
      <input type="checkbox" checked={task.isCompleted} />
      <Title>{task.title}</Title>
      <Button
        onClick={() => {
          deleteTaskFromSubject(subjectId, task.id);
        }}
      >
        제거
      </Button>
    </Container>
  );
}
