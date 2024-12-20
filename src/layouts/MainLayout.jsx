import { useContext } from 'react';
import { userStatusContext } from '../components/contexts/UserStatus';
import { Outlet, Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
const MainLayout = () => {
  const { user } = useContext(userStatusContext);
  console.log(user)
  return (
    <div className="flex flex-col min-h-screen bg-midnight-blue">
      <header className="flex justify-between p-4 text-white bg-gray-800">
        <nav className="flex items-center justify-between w-full gap-5">
          <div className="flex gap-5 ">
            
          <h1 className="font-bold">Welcome {user.isAuthenticated ? user.username : ''}!</h1>
          <Link to="/" className="mr-4">
            Home
          </Link>
          </div>
          {!user.isAuthenticated ? (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/register" className="mr-4">
                Register
              </Link>
            </>
          ) : (
            <LogoutButton />
          )}
        </nav>
      </header>
      <main className="container flex-grow p-4 mx-auto">
        <Outlet />
      </main>
      <footer className="p-4 mt-auto text-white bg-blue-600">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Your Company</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;