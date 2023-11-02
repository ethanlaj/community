import { Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner animation="border" role="status" />
    </div>
  );
}

export default Loading;
