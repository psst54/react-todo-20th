import { Button } from 'components/TaskList/styles';
import { Container, Title } from './styles';

export default function Task({
  state,
  subjectId,
  task,
  deleteTaskFromSubject,
  toggleTaskInSubject,
}) {
  function onToggle() {
    toggleTaskInSubject(state, subjectId, task.id);
  }

  function onDelete() {
    if (!window.confirm('정말로 삭제하시겠습니까?')) {
      return;
    }
    deleteTaskFromSubject(state, subjectId, task.id);
  }

  return (
    <Container key={task.id}>
      <input type="checkbox" checked={task.isCompleted} onChange={onToggle} />
      <Title>{task.title}</Title>
      <Button onClick={onDelete}>제거</Button>
    </Container>
  );
}
