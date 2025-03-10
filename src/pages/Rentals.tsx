import RentalForm from "../components/RentalForm";
import free from "../assets/free.png";
import house from "../assets/house.jpg";
const Rentals = () => {
  return (
    <div className="min-h-screen bg-white py-16 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${house})`,
          filter: "brightness(0.7)",
        }}
      ></div>
      <div className="container mx-auto px-4 relative">
        {/* Free Badge */}
        <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-2">
          <img
            src={free}
            alt="Free Service"
            className="w-20 md:w-28 h-full object-contain drop-shadow-2xl z-50 transform rotate-[-12deg] hover:rotate-0 hover:scale-110 transition-all duration-300"
          />
          <h1 className="text-4xl font-bold text-center text-white mb-6 [text-shadow:_0_2px_4px_rgb(43_43_54/_0.8)]">
            Looking to find out your property’s true value?
          </h1>
        </div>

        <p className="text-center text-white mb-12 max-w-2xl mx-auto [text-shadow:_0_2px_4px_rgb(43_43_54/_0.8)]">
          Get a free rental appraisal with your local Hayeswinckle property
          manager to make sure to maximise rental returns.
        </p>
        <div className="max-w-4xl mx-auto">
          <RentalForm />
        </div>
      </div>
    </div>
  );
};

export default Rentals;
