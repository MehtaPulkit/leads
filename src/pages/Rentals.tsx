import RentalForm from "../components/RentalForm";
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
        <h1 className="text-4xl font-bold text-center text-white mb-6 [text-shadow:_0_2px_4px_rgb(43_43_54/_0.8)]">
          Unlock Your Investment’s Rental Potential
        </h1>

        <p className="text-center text-white mb-12 max-w-2xl mx-auto [text-shadow:_0_2px_4px_rgb(43_43_54/_0.8)]">
          Get a <b>Free Rental Appraisal</b> with your local Hayeswinckle
          property manager to make sure to maximise rental returns.
        </p>
        <div className="max-w-4xl mx-auto">
          <RentalForm />
        </div>
      </div>
    </div>
  );
};

export default Rentals;
