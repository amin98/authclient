import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { userStatusContext } from "../components/contexts/UserStatus";
import LogoutButton from "../components/LogoutButton";

const Navbar = () => {
  const { user } = useContext(userStatusContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="z-10 p-4 text-white bg-midnight-blue">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          {user.isAuthenticated ? (
            <Link to="/profile" className="font-bold">
              Welcome {user.username}!
            </Link>
          ) : (
            <h1 className="font-bold"></h1>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="block md:hidden focus:outline-none"
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6 text-white" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-white" />
          )}
        </button>

        <div
          className={`flex-col md:flex-row md:flex items-center gap-5 md:gap-10 md:static absolute top-14 left-0 right-0 bg-midnight-blue p-4 md:p-0 transition-all duration-300 ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <div className="flex flex-col items-center gap-5 md:flex-row">
            {user.isAuthenticated && (
              <>
                <Link to="/" className="md:mr-4" onClick={toggleMenu}>
                  Home
                </Link>
                <Link
                  to="/questionnaire"
                  className="md:mr-4"
                  onClick={toggleMenu}
                >
                  Questionnaire
                </Link>

                <Link to="/stories" className="md:mr-4" onClick={toggleMenu}>
                  Stories
                </Link>
              </>
            )}

            {user.isAuthenticated && user.role === "emperor" && (
              <Link to="/add-book" className="md:mr-4" onClick={toggleMenu}>
                Add Book
              </Link>
            )}
          </div>

          <div className="flex flex-col items-center gap-5 md:flex-row">
            {!user.isAuthenticated ? (
              <>
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
              </>
            ) : (
              <LogoutButton />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
