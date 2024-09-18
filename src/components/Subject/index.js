import DeleteIcon from 'assets/DeleteIcon';
import { Container, Header, Title } from './styles';

export default function Subject({ subject, deleteSubject }) {
  return (
    <Container>
      <Header>
        <Title>{subject.title}</Title>

        <button onClick={() => deleteSubject(subject.id)}>
          <DeleteIcon />
        </button>
      </Header>
    </Container>
  );
}
