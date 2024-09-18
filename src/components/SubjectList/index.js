import { useRef } from 'react';

import { OPEN } from 'components/kanbanBoard/constants';
import {
  Container,
  Input,
  NewSubjectForm,
  NewSubjectFormWrapper,
} from './styles';
import useSubject from 'hooks/useSubject';

export default function SubjectList({ state }) {
  const { subjectList, addSubject } = useSubject();

  return (
    <Container>
      {state === OPEN && <SubjectInput addSubject={addSubject} />}
      {subjectList.map((subject) => (
        <div>{subject.title}</div>
      ))}
    </Container>
  );
}

function SubjectInput({ addSubject }) {
  const inputRef = useRef(null);

  return (
    <NewSubjectFormWrapper>
      <NewSubjectForm
        onSubmit={(event) => {
          event.preventDefault();
          addSubject(inputRef.current.value);
          inputRef.current.value = '';
        }}
      >
        <Input ref={inputRef} />
        <button>추가</button>
      </NewSubjectForm>
    </NewSubjectFormWrapper>
  );
}
