import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  const location = useLocation();
  
  const nonNavbarRoutes = ['/login', '/register'  ];
  const isNavbarExcluded = nonNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col bg-cream-white" style={{ overflow: 'overlay' }}>
    {!isNavbarExcluded && <Navbar />}
    <main
      className="container mx-auto"
      style={{ minHeight: nonNavbarRoutes ? '100vh' : 'calc(100vh - 56px)' }}
    >
      <Outlet />
    </main>
  </div>
  );
};

export default MainLayout;