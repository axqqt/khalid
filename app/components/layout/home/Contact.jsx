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
        message: "Thank you for your message! We will get back to you soon.",
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
    <section id="contact" className="relative py-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/api/placeholder/1920/1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Contact Me
        </h2>

        {status.message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              status.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {status.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              minLength={7}
              className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your email (Optional)"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about your requirements"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold 
              ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              } 
              transition-all shadow-lg hover:shadow-blue-500/25`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
