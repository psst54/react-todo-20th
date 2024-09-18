import { Container, Header, Title } from './styles';

export default function Subject({ subject }) {
  return (
    <Container>
      <Header>
        <Title>{subject.title}</Title>
      </Header>
    </Container>
  );
}
