import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import { SecurityUtils } from "../config/emailjs";
import free from "../assets/free.png";
// EmailJS configuration for rental inquiries
const RENTAL_EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_RENTAL_EMAILJS_SERVICE_ID,
  TEMPLATE_IDS: {
    CUSTOMER_RESPONSE: import.meta.env.VITE_RENTAL_CUSTOMER_TEMPLATE_ID,
    AGENT_NOTIFICATION: import.meta.env.VITE_RENTAL_AGENT_TEMPLATE_ID,
  },
  PUBLIC_KEY: import.meta.env.VITE_RENTAL_EMAILJS_PUBLIC_KEY,
  AGENT_EMAIL: import.meta.env.VITE_RENTAL_AGENT_EMAIL,
};

// Form validation schema specific to rental inquiries
const schema = object().shape({
  firstName: string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  lastName: string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  email: string()
    .email("Invalid email")
    .required("Email is required")
    .max(100, "Email must be less than 100 characters"),
  phone: string()
    .matches(
      /^04[0-9]{8}$/,
      "Please enter a valid Australian mobile number (starting with 04)"
    )
    .required("Phone is required"),
  address: string()
    .required("Property address is required")
    .min(5, "Address must be at least 5 characters"),
  propertyType: string()
    .required("Property type is required")
    .oneOf(
      ["House", "Apartment", "Townhouse", "Unit", "Acreage", "Other"],
      "Invalid property type"
    ),
  appraisalReason: string()
    .required("Reason for appraisal is required")
    .oneOf(
      [
        "Looking for a property manager",
        "Just curious",
        "Changing property manager",
        "Other",
      ],
      "Invalid reason"
    ),
  message: string().max(1000, "Message must be less than 1000 characters"),
});

// Form data type specific to rental inquiries
type RentalFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  propertyType: string;
  message?: string;
  appraisalReason: string;
};

// Email template interface for rental inquiries
interface RentalEmailTemplateData extends Record<string, unknown> {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  propertyType: string;
  appraisalReason: string;
  message?: string;
  to_email: string;
  submission_date?: string;
  user_agent?: string;
  ip_fingerprint?: string;
}

const RentalForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "success" | "error" | "rate-limited" | null
  >(null);
  const [fingerprint, setFingerprint] = useState<string>("");

  useEffect(() => {
    setFingerprint(SecurityUtils.generateFingerprint());
    const cleanup = setInterval(() => {
      SecurityUtils.rateLimiter.clearOldEntries();
    }, 5 * 60 * 1000);
    return () => clearInterval(cleanup);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RentalFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RentalFormData) => {
    try {
      if (!SecurityUtils.rateLimiter.checkRateLimit(fingerprint)) {
        setSubmitStatus("rate-limited");
        return;
      }

      setIsSubmitting(true);
      const sanitizedData = SecurityUtils.sanitizeFormData(data);

      // Prepare customer email data
      const customerEmailData: RentalEmailTemplateData = {
        ...sanitizedData,
        to_email: sanitizedData.email,
      };

      // Prepare agent email data
      const agentEmailData: RentalEmailTemplateData = {
        ...sanitizedData,
        to_email: RENTAL_EMAILJS_CONFIG.AGENT_EMAIL,
        submission_date: new Date().toLocaleString(),
        user_agent: navigator.userAgent,
        ip_fingerprint: fingerprint,
      };

      // Send emails
      const customerResponse = await emailjs.send(
        RENTAL_EMAILJS_CONFIG.SERVICE_ID,
        RENTAL_EMAILJS_CONFIG.TEMPLATE_IDS.CUSTOMER_RESPONSE,
        customerEmailData,
        RENTAL_EMAILJS_CONFIG.PUBLIC_KEY
      );

      const agentNotification = await emailjs.send(
        RENTAL_EMAILJS_CONFIG.SERVICE_ID,
        RENTAL_EMAILJS_CONFIG.TEMPLATE_IDS.AGENT_NOTIFICATION,
        agentEmailData,
        RENTAL_EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (customerResponse.status === 200 && agentNotification.status === 200) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/src/assets/rental-bg.png")',
          filter: "brightness(0.7)",
        }}
      ></div>
      <div className="relative">
        <img
          src={free}
          alt="Free Service"
          className="absolute -top-14 -right-1 md:right-6 lg:right-19 w-24 md:w-28 lg:w-32 object-contain drop-shadow-2xl z-50 transform -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-300"
        />
        {/* Form Container with Blur Effect */}
        <div className="relative max-w-2xl mx-auto p-8 backdrop-blur-md bg-white/70 rounded-xl shadow-lg border border-white/30">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Rental Property Appraisal
          </h2>
          <p className="text-gray-600 mb-6">
            Simply fill in your details in the form below and one of our experts
            will be in touch to organise an appointment.
          </p>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50/90 border border-green-200 text-green-700 rounded-lg flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Thank you for your rental inquiry! We'll contact you soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50/90 border border-red-200 text-red-700 rounded-lg flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              Something went wrong. Please try again later.
            </div>
          )}

          {submitStatus === "rate-limited" && (
            <div className="mb-6 p-4 bg-yellow-50/90 border border-yellow-200 text-yellow-700 rounded-lg flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Too many requests. Please try again later.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-800 text-sm font-medium mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-red-600 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-gray-800 text-sm font-medium mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-red-600 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-800 text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-red-600 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-gray-800 text-sm font-medium mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="0412345678"
                />
                {errors.phone && (
                  <p className="mt-1 text-red-600 text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Rental Preferences */}
            <div>
              <label
                className="block text-gray-800 text-sm font-medium mb-2"
                htmlFor="address"
              >
                Property Address
              </label>
              <input
                {...register("address")}
                type="text"
                id="address"
                className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                placeholder="Enter your property address"
              />
              {errors.address && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-800 text-sm font-medium mb-2"
                  htmlFor="propertyType"
                >
                  Property Type
                </label>
                <select
                  {...register("propertyType")}
                  id="propertyType"
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                >
                  <option value="">Select Property Type</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Unit">Unit</option>
                  <option value="Acreage">Acreage</option>
                  <option value="Other">Other</option>
                </select>
                {errors.propertyType && (
                  <p className="mt-1 text-red-600 text-sm">
                    {errors.propertyType.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-gray-800 text-sm font-medium mb-2"
                  htmlFor="appraisalReason"
                >
                  Reason for Appraisal
                </label>
                <select
                  {...register("appraisalReason")}
                  id="appraisalReason"
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                >
                  <option value="">Select Reason</option>
                  <option value="Looking for a property manager">
                    Looking for a property manager
                  </option>
                  <option value="Just curious">I'm just curious</option>
                  <option value="Changing property manager">
                    Changing current property manager
                  </option>
                  <option value="Other">Other</option>
                </select>
                {errors.appraisalReason && (
                  <p className="mt-1 text-red-600 text-sm">
                    {errors.appraisalReason.message}
                  </p>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label
                className="block text-gray-800 text-sm font-medium mb-2"
                htmlFor="message"
              >
                Additional Information (Optional)
              </label>
              <textarea
                {...register("message")}
                id="message"
                rows={4}
                className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 resize-none"
                placeholder="Any additional details about your property..."
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 text-white rounded-lg font-medium cursor-pointer ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600 transform hover:-translate-y-0.5"
              } transition duration-200 shadow-md`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Rental Inquiry"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentalForm;
