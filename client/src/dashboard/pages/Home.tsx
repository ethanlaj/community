import { Container, Card } from 'react-bootstrap';
import AuthButton from '@/shared/components/AuthButton';

function Home() {
  return (
    <div className="py-6 flex flex-col justify-center sm:py-12">
      <Container className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md flex justify-center space-x-4">
        <Card className="text-center p-4">
          <Card.Body as="h1" className="text-2xl font-bold mb-4">
            Community Connection Tracker
          </Card.Body>
          <AuthButton />
        </Card>
      </Container>
    </div>
  );
}

export default Home;
