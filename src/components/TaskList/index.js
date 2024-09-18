import { useRef } from 'react';
import { Button, Container } from './styles';
import Task from 'components/Task';

export default function TaskList({ subjectId, taskList, taskHooks }) {
  const { addTaskToSubject, deleteTaskFromSubject } = taskHooks;

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
        />
      ))}
    </Container>
  );
}

function TaskInput({ subjectId, addTaskToSubject }) {
  const inputRef = useRef(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        addTaskToSubject(subjectId, inputRef.current.value);
        inputRef.current.value = '';
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="새로운 할 일을 입력해주세요"
      />
      <Button>추가</Button>
    </form>
  );
}
