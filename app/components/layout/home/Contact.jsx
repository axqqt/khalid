import { useState } from "react";
import axios from "axios";

const Input = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
      {icon}
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-200 bg-white"
    />
  </div>
);

const Select = ({ label, icon, children, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
      {icon}
      {label}
    </label>
    <select
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-200 bg-white"
    >
      {children}
    </select>
  </div>
);

export default function DetailedPropertyInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryType: "",
    propertyType: "",
    budget: "",
    bedrooms: "",
    location: "",
    timeline: "",
    description: "",
  });
  const [status, setStatus] = useState({
    message: "",
    type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "", type: "" });

    try {
      const { data } = await axios.post("/api/submit-contact", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        inquiryType: "",
        propertyType: "",
        budget: "",
        bedrooms: "",
        location: "",
        timeline: "",
        description: "",
      });

      setStatus({
        message:
          "Thank you for your inquiry! We'll review your details and get back to you soon.",
        type: "success",
      });
      setTimeout(() => {
        setStatus({ message: "", type: "" });
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        message:
          error.response?.data?.message ||
          "There was an error submitting your inquiry. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center"
      id="contact"
    >
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Property Inquiry
          </h2>
          <p className="text-gray-500">
            Let's understand your real estate goals
          </p>
        </div>

        {status.message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              status.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            icon={
              <svg
                className="w-4 h-4 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            }
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Phone"
              icon={
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              required
            />

            <Input
              label="Email"
              icon={
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Inquiry Type"
              icon={
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              id="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
            >
              <option value="">Select Inquiry Type</option>
              <option value="buy">Looking to Buy</option>
              <option value="sell">Looking to Sell</option>
              <option value="rent">Looking to Rent</option>
              <option value="invest">Investment Opportunity</option>
            </Select>

            <Select
              label="Property Type"
              icon={
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              }
              id="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
            >
              <option value="">Select Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial Property</option>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Budget/Price Range"
              icon={
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              type="text"
              id="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="$200,000 - $500,000"
              required
            />

            <Select
              label="Bedrooms"
              icon={
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              }
              id="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
            >
              <option value="">Number of Bedrooms</option>
              <option value="studio">Studio</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </Select>

            <Input
              label="Preferred Location"
              icon={
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c1.656 0 3-.895 3-2s-1.344-2-3-2-3 .895-3 2 1.344 2 3 2zm0 0c-2.002 0-5.356 1.34-7.083 3.465C3.494 16.48 3 18.244 3 20h18c0-1.756-.494-3.52-1.917-5.535C17.356 12.34 14.002 11 12 11z"
                  />
                </svg>
              }
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City or neighborhood"
              required
            />
          </div>

          <Input
            label="Timeline to Buy/Sell/Rent"
            icon={
              <svg
                className="w-4 h-4 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m0 4v4m0-4h4m-4 0H4m4 8v4m0-4h4m0 0h4m0 0v4m0-4h4m0-4v4m0-4h4"
                />
              </svg>
            }
            type="text"
            id="timeline"
            value={formData.timeline}
            onChange={handleChange}
            placeholder="e.g., 3-6 months"
            required
          />

          <Input
            label="Additional Details"
            icon={
              <svg
                className="w-4 h-4 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                />
              </svg>
            }
            type="textarea"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Share any specific requirements or preferences"
          />

          <button
            type="submit"
            className={`w-full py-3 px-6 rounded-lg text-white font-medium bg-amber-600 hover:bg-amber-700 transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
