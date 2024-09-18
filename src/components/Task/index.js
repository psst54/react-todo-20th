import { Button } from 'components/TaskList/styles';
import { Container, Title } from './styles';

export default function Task({
  subjectId,
  task,
  deleteTaskFromSubject,
  toggleTaskInSubject,
}) {
  function onToggle() {
    toggleTaskInSubject(subjectId, task.id);
  }

  function onDelete() {
    if (!window.confirm('정말로 삭제하시겠습니까?')) {
      return;
    }
    deleteTaskFromSubject(subjectId, task.id);
  }

  return (
    <Container key={task.id}>
      <input type="checkbox" checked={task.isCompleted} onChange={onToggle} />
      <Title>{task.title}</Title>
      <Button onClick={onDelete}>제거</Button>
    </Container>
  );
}
