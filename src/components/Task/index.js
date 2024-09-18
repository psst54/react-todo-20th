import { Button } from 'components/TaskList/styles';
import { Container, Title } from './styles';

export default function Task({
  subjectId,
  task,
  deleteTaskFromSubject,
  toggleTaskInSubject,
}) {
  return (
    <Container key={task.id}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => {
          toggleTaskInSubject(subjectId, task.id);
        }}
      />
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
