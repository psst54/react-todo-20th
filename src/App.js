import Header from 'components/Header';
import KanbanBoard from 'components/kanbanBoard';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1000px) {
    max-width: 600px;
  }
`;

function App() {
  return (
    <Wrapper>
      <Container>
        <Header />
        <KanbanBoard />
      </Container>
    </Wrapper>
  );
}

export default App;
