import { useRef } from 'react';

import { OPEN } from 'components/kanbanBoard/constants';
import {
  Container,
  Input,
  NewSubjectForm,
  NewSubjectFormWrapper,
} from './styles';

export default function SubjectList({ state }) {
  return <Container>{state === OPEN && <SubjectInput />}</Container>;
}

function SubjectInput() {
  const inputRef = useRef(null);

  return (
    <NewSubjectFormWrapper>
      <NewSubjectForm
        onSubmit={(event) => {
          event.preventDefault();
          // console.log(inputRef.current.value);
        }}
      >
        <Input ref={inputRef} />
        <button>추가</button>
      </NewSubjectForm>
    </NewSubjectFormWrapper>
  );
}
