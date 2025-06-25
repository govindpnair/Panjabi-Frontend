import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import useTheme from "../../hooks/useTheme";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useCarts from "../../hooks/useCarts";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCarts();
  const [isuseAdmin] = useAdmin();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have successfully logged out.",
              icon: "success",
              confirmButtonColor: "#3b82f6",
              background: theme === 'dark' ? '#1f2937' : '#ffffff',
              color: theme === 'dark' ? '#ffffff' : '#000000',
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Logout Failed!",
              text: error.message,
              icon: "error",
              confirmButtonColor: "#ef4444",
              background: theme === 'dark' ? '#1f2937' : '#ffffff',
              color: theme === 'dark' ? '#ffffff' : '#000000',
            });
          });
      }
    });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItem = (
    <>
      <li>
        <Link 
          to="/" 
          className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 group"
          onClick={() => setIsOpen(false)}
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </li>
      <li>
        <Link 
          to="/" 
          className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 group"
          onClick={() => setIsOpen(false)}
        >
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </li>
      <li>
        <Link 
          to={`/allProducts/all`} 
          className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 group"
          onClick={() => setIsOpen(false)}
        >
          All Products
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </li>
      {user && isuseAdmin && (
        <li>
          <Link 
            to="/dashboard/adminHome" 
            className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 group"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
      )}
      {user && !isuseAdmin && (
        <li>
          <Link 
            to="/dashboard/userHome" 
            className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 group"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
      )}
    </>
  );

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
        : 'bg-white dark:bg-gray-900 shadow-md'
    }`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo with hover effect */}
          <Link to="/" className="group flex items-center space-x-2">
            <div className="relative">
              <h1 className="text-xl font-bold">Rainbow Collection</h1>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-2 text-base font-medium text-gray-800 dark:text-gray-200">
            {navItem}
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            
            {/* Cart Icon with Animation */}
            <Link 
              to={'/dashboard/cart'} 
              className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <FiShoppingCart className="text-xl text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-300" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Theme Toggle with Smooth Animation */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
            >
              <div className="relative w-5 h-5">
                <BsSun className={`absolute inset-0 text-yellow-500 transition-all duration-500 ${
                  theme === "dark" ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
                }`} />
                <BsMoon className={`absolute inset-0 text-blue-500 transition-all duration-500 ${
                  theme === "light" ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                }`} />
              </div>
            </button>

            {/* User Profile & Auth */}
            {user ? (
              <div className="flex items-center space-x-2">
                {user.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 transition-colors duration-300"
                  />
                )}
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/loginForm"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <FiUser className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu} 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <div className="relative w-6 h-6">
                <AiOutlineMenu className={`absolute inset-0 text-gray-700 dark:text-gray-300 transition-all duration-300 ${
                  isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                }`} />
                <AiOutlineClose className={`absolute inset-0 text-gray-700 dark:text-gray-300 transition-all duration-300 ${
                  isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu with Slide Animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-2 text-base font-medium text-gray-800 dark:text-gray-200">
              {navItem}
            </ul>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;