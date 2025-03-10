import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import hwBlack from "../assets/hw-logo-b.jpg";

const Navbar = () => {
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img className="h-12 w-auto" src={hwBlack} alt="HayesWinckle" />
              </Link>
            </div>

            {/* Navigation Links */}
            {!isChecked && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    isActive("/")
                      ? "border-pink-500 text-pink-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/property-appraisal"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    isActive("/property-appraisal")
                      ? "border-pink-500 text-pink-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Property Appraisal
                </Link>
                <Link
                  to="/rental-appraisal"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    isActive("/rental-appraisal")
                      ? "border-pink-500 text-pink-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Rental Appraisal
                </Link>
              </div>
            )}
          </div>

          {/* Right side content */}
          <div className="flex items-center space-x-4">
            {/* Checkbox with label */}
            <label className="flex items-center cursor-pointer">
              <span className="mr-2 text-sm text-gray-600"></span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <div
                  className={`block w-10 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                    isChecked ? "bg-pink-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                    isChecked ? "transform translate-x-4" : ""
                  }`}
                ></div>
              </div>
            </label>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              isActive("/")
                ? "bg-pink-50 border-l-4 border-pink-500 text-pink-500"
                : "border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Home
          </Link>
          <Link
            to="/property-appraisal"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              isActive("/property-appraisal")
                ? "bg-pink-50 border-l-4 border-pink-500 text-pink-500"
                : "border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Property Appraisal
          </Link>
          <Link
            to="/rental-appraisal"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              isActive("/rental-appraisal")
                ? "bg-pink-50 border-l-4 border-pink-500 text-pink-500"
                : "border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Rental Appraisal
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
