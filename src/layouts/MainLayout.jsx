import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="flex flex-col bg-midnight-blue" style={{ overflow: 'overlay' }}>
      <Navbar />
      <main className="container mx-auto" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;