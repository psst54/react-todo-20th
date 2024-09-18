import { useRef } from 'react';

import { OPEN } from 'components/kanbanBoard/constants';
import Subject from 'components/Subject';
import AddIcon from 'assets/AddIcon';
import { Container } from './styles';
import { Container as SubjectContainer } from 'components/Subject/styles';

export default function SubjectList({ state, subjectHooks }) {
  const { subjectList, addSubject, deleteSubject, taskHooks } = subjectHooks;

  return (
    <Container>
      {state === OPEN && <SubjectInput addSubject={addSubject} />}
      {subjectList
        .filter((subject) => state === subject.state)
        .map((subject) => (
          <Subject
            key={subject.id}
            subject={subject}
            deleteSubject={deleteSubject}
            taskHooks={taskHooks}
          />
        ))}
    </Container>
  );
}

function SubjectInput({ addSubject }) {
  const inputRef = useRef(null);

  function onAdd(event) {
    event.preventDefault();
    if (!inputRef.current.value) {
      alert('목표를 입력해주세요!');
      return;
    }
    addSubject(inputRef.current.value);
    inputRef.current.value = '';
  }

  return (
    <SubjectContainer>
      <form onSubmit={onAdd}>
        <input
          ref={inputRef}
          type="text"
          placeholder="새로운 목표를 입력해주세요"
        />
        <button>
          <AddIcon />
        </button>
      </form>
    </SubjectContainer>
  );
}
