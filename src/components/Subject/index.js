import DeleteIcon from 'assets/DeleteIcon';
import { Container, Header, Title } from './styles';
import TaskList from 'components/TaskList';

export default function Subject({ subject, deleteSubject, taskHooks }) {
  function onDelete() {
    if (!window.confirm('정말로 삭제하시겠습니까?')) {
      return;
    }
    deleteSubject(subject.id);
  }

  return (
    <Container>
      <Header>
        <Title>{subject.title}</Title>

        <button onClick={onDelete}>
          <DeleteIcon />
        </button>
      </Header>

      <TaskList
        subjectId={subject.id}
        taskList={subject.taskList}
        taskHooks={taskHooks}
      />
    </Container>
  );
}
