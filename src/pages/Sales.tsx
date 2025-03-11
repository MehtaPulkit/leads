import ContactForm from "../components/ContactForm";
import house from "../assets/house-2.jpg";
const Sales = () => {
  return (
    <div className="min-h-screen py-16 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${house})`,
          filter: "brightness(0.7)",
        }}
      ></div>
      <div className="relative container mx-auto px-4">
        <div>
          <h1 className="text-4xl font-bold text-center text-white mb-6 [text-shadow:_0_2px_4px_rgb(43_43_54/_0.8)]">
            Looking to find out your property’s value in today's Market?
          </h1>
          <p className="text-center text-white mb-12 max-w-2xl mx-auto [text-shadow:_0_2px_4px_rgb(43_43_54/_0.8)]">
            Get a <b>Free Property Appraisal </b>
            <br />
            Looking to sell or just curious about your home’s value? Our expert
            team will provide you with a precise market assessment and strategic
            insights to help you maximize your property’s potential.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ContactForm formType="sales" />
        </div>
      </div>
    </div>
  );
};

export default Sales;
