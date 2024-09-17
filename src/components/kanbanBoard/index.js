import SubjectList from 'components/SubjectList';
import { STATE_LIST } from './constants';
import { ColumnTitle, ColumnContainer, Container, DivideLine } from './styles';

export default function KanbanBoard() {
  return (
    <Container>
      {Object.keys(STATE_LIST).map((state) => (
        <Column key={state} state={state} />
      ))}
    </Container>
  );
}

function Column({ state }) {
  const { id, title } = STATE_LIST[state];

  return (
    <ColumnContainer id={`${id}-column`} state={state}>
      <ColumnTitle>{title}</ColumnTitle>
      <DivideLine state={state} />
      <SubjectList state={state} />
    </ColumnContainer>
  );
}
