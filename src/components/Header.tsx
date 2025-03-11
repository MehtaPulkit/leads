import { Link } from "react-router-dom";
import hwBlack from "../assets/hw-logo-b.jpg";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20">
          <div className="flex-shrink-0 flex items-center justify-start">
            <Link to="/property-appraisal">
              <img className="h-14 w-auto" src={hwBlack} alt="HayesWinckle" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
