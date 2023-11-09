import { Container, Card } from 'react-bootstrap';

function Home() {
  return (
    <div className="py-6 flex flex-col justify-center sm:py-12">
      <Container className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <Card className="text-center p-4">
          <Card.Body as="h1" className="text-2xl font-bold mb-4">
            Welcome to the Community Connection Tracker
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Home;
