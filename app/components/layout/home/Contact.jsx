import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
    email: "",
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
        description: "",
        email: "",
      });

      setStatus({
        message: "Thank you for reaching out! We’ll be in touch with you soon.",
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
          "There was an error submitting your message. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/api/placeholder/1920/1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10">
        <h2 className="text-4xl font-extrabold text-center mb-10">
          Connect with Veloxify
        </h2>
        <p className="text-lg text-center mb-12">
          Ready to discuss your real estate goals? We’re here to guide you every step of the way.
        </p>

        {status.message && (
          <div
            className={`mb-6 p-4 rounded-lg text-center ${
              status.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {status.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/90 text-gray-800 p-8 rounded-lg shadow-2xl"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your email address"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold mb-1"
            >
              Message
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about your needs and goals"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold 
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"}
              transition-all shadow-lg hover:shadow-blue-500/25`}
          >
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
