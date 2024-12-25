import { useContext } from 'react';
import { userStatusContext } from '../components/contexts/UserStatus';
import { Outlet, Link, useLocation } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const MainLayout = () => {
  const { user } = useContext(userStatusContext);
  const location = useLocation();

  return (
    <div className="flex flex-col bg-midnight-blue " style={{ overflow: 'overlay' }}>
      <header className="flex justify-between p-4 text-white">
        <nav className="flex items-center justify-between w-full gap-5 text-xl">
          <div className="flex gap-5">
            {user.isAuthenticated ? (
              <Link to="/profile" className="font-bold">
                Welcome {user.username}!
              </Link>
            ) : (
              <h1 className="font-bold"></h1>
            )}

            {user.isAuthenticated && (
              <Link to="/" className="mr-4">
                Home
              </Link>
            )}
          </div>

          {!user.isAuthenticated ? (
            <div>
              {location.pathname !== '/login' && (
                <Link to="/login" className="mr-4">
                  Login
                </Link>
              )}
              {location.pathname !== '/register' && (
                <Link to="/register" className="mr-4">
                  Register
                </Link>
              )}
            </div>
          ) : (
            <LogoutButton />
          )}
        </nav>
      </header>
      <main className="container mx-auto" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
