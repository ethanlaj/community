import { Container, Card } from 'react-bootstrap';
import { IoPersonSharp } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import { BsBuildingFill } from 'react-icons/bs';
import AuthButton from '@/shared/components/AuthButton';

function Home() {
  return (
    <div className="py-6 flex flex-col justify-center sm:py-12 space-y-6">
      <div className="flex space-x-6 justify-center">
        <Container className="p-6 max-w-lg bg-white rounded-xl shadow-md flex justify-center space-x-4 m-auto p-2">
          <Card className="text-center p-4">
            <Card.Img src="/Community_LogoBW.png" alt="Logo" className="img-fluid object-cover" />
            <AuthButton />
          </Card>
        </Container>
        <Container className="p-6 max-w-lg bg-white rounded-xl shadow-md flex justify-center space-x-4 m-auto p-2">
          <Card className="text-center p-8 bg-white text-black rounded-xl">
            <p className="text-2xl font-bold text-white bg-black mb-4 p-2">Community Management System</p>
            <p className="text-md">
              Community is a robust relationship management system crafted to facilitate seamless coordination among departments.
              Its purpose is to efficiently manage business communications, preventing inadvertent overlaps and ensuring a coordinated workflow.
            </p>
          </Card>
        </Container>
      </div>

      <br />
      <div className="flex space-x-6">
        <Container className="p-6 max-w-lg bg-white rounded-xl shadow-md flex justify-center space-x-4">
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center mb-4">
              <a href="/organizations" className="text-black">
                <BsBuildingFill className="text-8xl" />
              </a>
            </div>
            Manage your organizations efficiently.
          </Card>
        </Container>
        <Container className="p-6 max-w-lg bg-white rounded-xl shadow-md flex justify-center space-x-4">
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center mb-4">
              <a href="/contacts" className="text-black">
                <IoPersonSharp className="text-8xl" />
              </a>
            </div>
            Organize and stay updated on all your contacts.
          </Card>
        </Container>
        <Container className="p-6 max-w-lg bg-white rounded-xl shadow-md flex justify-center space-x-4">
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center mb-4">
              <a href="/communications" className="text-black">
                <CiMail className="text-8xl" />
              </a>
            </div>
            Monitor all your communications.
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default Home;
