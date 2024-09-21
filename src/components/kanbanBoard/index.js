import SubjectList from 'components/SubjectList';
import useSubject from 'hooks/useSubject';
import { STATE_LIST } from './constants';
import {
  ColumnContainer,
  ColumnHeader,
  Container,
  DivideLine,
  SubjectCount,
} from './styles';

export default function KanbanBoard() {
  const subjectHooks = useSubject();

  return (
    <Container>
      {Object.keys(STATE_LIST).map((state) => (
        <Column key={state} state={state} subjectHooks={subjectHooks} />
      ))}
    </Container>
  );
}

function Column({ state, subjectHooks }) {
  const { id, title } = STATE_LIST[state];
  const { subjectList } = subjectHooks;
  const subjectCount = subjectList[state].length;

  return (
    <ColumnContainer id={`${id}-column`} state={state}>
      <ColumnHeader>
        <h2>{title}</h2>
        <SubjectCount state={state}>{subjectCount}</SubjectCount>
      </ColumnHeader>

      <DivideLine state={state} />
      <SubjectList state={state} subjectHooks={subjectHooks} />
    </ColumnContainer>
  );
}
