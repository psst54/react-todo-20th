import DeleteIcon from 'assets/DeleteIcon';
import { Container, Header, Title } from './styles';
import TaskList from 'components/TaskList';

export default function Subject({ subject, deleteSubject, taskHooks }) {
  return (
    <Container>
      <Header>
        <Title>{subject.title}</Title>

        <button onClick={() => deleteSubject(subject.id)}>
          <DeleteIcon />
        </button>
      </Header>

      <TaskList taskList={subject.taskList} taskHooks={taskHooks} />
    </Container>
  );
}
