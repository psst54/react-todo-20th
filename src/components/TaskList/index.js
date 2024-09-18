import { useRef } from 'react';
import { Button, Container } from './styles';
import Task from 'components/Task';

export default function TaskList({ subjectId, taskList, taskHooks }) {
  const { addTaskToSubject, deleteTaskFromSubject, toggleTaskInSubject } =
    taskHooks;

  return (
    <Container>
      <li>
        <TaskInput subjectId={subjectId} addTaskToSubject={addTaskToSubject} />
      </li>

      {taskList.map((task) => (
        <Task
          subjectId={subjectId}
          task={task}
          deleteTaskFromSubject={deleteTaskFromSubject}
          toggleTaskInSubject={toggleTaskInSubject}
        />
      ))}
    </Container>
  );
}

function TaskInput({ subjectId, addTaskToSubject }) {
  const inputRef = useRef(null);

  function onAdd(event) {
    event.preventDefault();
    if (!inputRef.current.value) {
      alert('할 일을 입력해주세요!');
      return;
    }
    addTaskToSubject(subjectId, inputRef.current.value);
    inputRef.current.value = '';
  }

  return (
    <form onSubmit={onAdd}>
      <input
        ref={inputRef}
        type="text"
        placeholder="새로운 할 일을 입력해주세요"
      />
      <Button>추가</Button>
    </form>
  );
}
