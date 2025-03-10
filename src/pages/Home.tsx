import { Link } from "react-router-dom";
import house from "../assets/house.jpg";
const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center">
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gray-900 [text-shadow:_0_2px_4px_rgb(43_43_54/_0.8)]"
          style={{
            backgroundImage: `url(${house})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-5xl font-bold mb-4 text-center">
            Find Your Dream Home
          </h1>
          <p className="text-xl mb-8 text-center max-w-2xl px-4">
            Let us help you discover the perfect property that matches your
            lifestyle and aspirations
          </p>
          <Link
            to="/property-appraisal"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">
                Wide Range of Properties
              </h3>
              <p className="text-gray-600">
                Explore our diverse portfolio of houses, apartments, and land
                options.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">
                Flexible Budget Options
              </h3>
              <p className="text-gray-600">
                Find properties that match your budget and investment goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">
                Get professional assistance throughout your property search
                journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
