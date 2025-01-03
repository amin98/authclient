import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { userStatusContext } from "../components/contexts/UserStatus";
import LogoutButton from "../components/LogoutButton";

const Navbar = () => {
  const { user } = useContext(userStatusContext);
  const location = useLocation();

  return (
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
            <>
              <Link to="/" className="mr-4">
                Home
              </Link>
              <Link to="/questionnaire" className="mr-4">
                Questionnaire
              </Link>
            </>
          )}
        </div>

        {!user.isAuthenticated ? (
          <div>
            {location.pathname !== "/login" && (
              <Link to="/login" className="mr-4">
                Login
              </Link>
            )}
            {location.pathname !== "/register" && (
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
  );
};

export default Navbar;
