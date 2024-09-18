import SubjectList from 'components/SubjectList';
import useSubject from 'hooks/useSubject';
import { STATE_LIST } from './constants';
import { ColumnTitle, ColumnContainer, Container, DivideLine } from './styles';

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

  return (
    <ColumnContainer id={`${id}-column`} state={state}>
      <ColumnTitle>{title}</ColumnTitle>
      <DivideLine state={state} />
      <SubjectList state={state} subjectHooks={subjectHooks} />
    </ColumnContainer>
  );
}
