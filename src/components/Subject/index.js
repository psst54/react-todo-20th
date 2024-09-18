import DeleteIcon from 'assets/DeleteIcon';
import TaskList from 'components/TaskList';
import { Container, Header, TaskCount } from './styles';

export default function Subject({ subject, deleteSubject, taskHooks }) {
  function onDelete() {
    if (!window.confirm('정말로 삭제하시겠습니까?')) {
      return;
    }
    deleteSubject(subject.id);
  }

  const doneTaskCount = subject.taskList.filter(
    (subject) => subject.isCompleted
  ).length;
  const totalTaskCount = subject.taskList.length;

  return (
    <Container>
      <Header>
        <h3>
          {subject.title}{' '}
          <TaskCount>{`( ${doneTaskCount} / ${totalTaskCount} )`}</TaskCount>
        </h3>

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
