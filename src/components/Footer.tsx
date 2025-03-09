import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="site-footer bg-gray-900 text-white">
      {/* Footer Top */}
      <div className="container mx-auto md:px-20 py-8">
        <div className="px-6 flex flex-col gap-6 md:flex-row justify-between items-center ">
          {/* Menu */}
          <div className="flex flex-col gap-6">
            <ul className="flex gap-6">
              <li>
                <Link
                  to="/sales"
                  className="hover:text-pink-500 transition-colors"
                >
                  Buying
                </Link>
              </li>
              <li>
                <Link
                  to="/sales"
                  className="hover:text-pink-500 transition-colors"
                >
                  Selling
                </Link>
              </li>
              <li>
                <Link
                  to="/rentals"
                  className="hover:text-pink-500 transition-colors"
                >
                  Renting
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-pink-500 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://www.facebook.com/hayeswinckle/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-pink-500 hover:border-pink-500 transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/hayeswinckle/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-pink-500 hover:border-pink-500 transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Logo */}
          <div className="mt-4 md:mt-0">
            <Link to="/" className="block">
              <img
                src="/src/assets/hw-logo.png"
                alt="HayesWinckle"
                className="max-w-[200px] h-auto"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="text-sm text-gray-400 flex flex-wrap items-center justify-center gap-2">
            <span>Copyright © 2025 HayesWinckle</span>
            <span className="hidden sm:inline">|</span>
            <span>All rights reserved</span>
            <span className="hidden sm:inline">|</span>
            <a
              href="https://www.hayeswinckle.com.au/privacy-policy/"
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
