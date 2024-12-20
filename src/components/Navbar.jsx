import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      menuRef.current.classList.remove('hidden');
    } else {
      menuRef.current.classList.add('hidden');
    }
  }, [isMenuOpen]);

  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Auth Client
        </Link>

        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-400">
              Login
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-400">
              Register
            </Link>
          </li>
        </ul>

        {/* Hamburger Menu Button */}
        <button className="md:hidden" onClick={handleMenuClick}>
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars2Icon className="h-6 w-6" />
          )}
        </button>

        {/* Collapsible Menu */}
        <div
          ref={menuRef}
          className={`md:hidden absolute top-full left-0 w-full bg-gray-800 shadow-lg ${
            isMenuOpen ? '' : 'hidden'
          }`}
        >
          <ul className="flex flex-col space-y-4 px-4 pb-4">
            <li>
              <Link
                to="/"
                className="hover:text-gray-400"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/list"
                className="hover:text-gray-400"
                onClick={handleLinkClick}
              >
                My List
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-gray-400"
                onClick={handleLinkClick}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;