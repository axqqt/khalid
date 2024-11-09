import { useState } from "react";
import Airtable from "airtable";

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY, // Should be valid here
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
    email: "",
  });
  const [status, setStatus] = useState({
    message: "",
    type: "", // 'success' or 'error'
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
      const submissionDate = new Date().toISOString().split("T")[0];

      await base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME).create([
        {
          fields: {
            Name: formData.name,
            Phone: formData.phone,
            Description: formData.description,
            Email: formData.email,
            Date: submissionDate,
          },
        },
      ]);

      // Clear form after success
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
    } catch (error) {
      console.error("Error submitting to Airtable:", error);
      setStatus({
        message:
          "There was an error submitting your message. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Me</h2>

        {status.message && (
          <div
            className={`mb-6 p-4 rounded-black-lg  ${
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
          className="space-y-6 bg-gray-50 p-8 rounded-lg shadow-lg"
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
              className="w-full rounded-lg"
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
              className="w-full rounded-lg"
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
              className="w-full rounded-lg"
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
              className="w-full rounded-lg"
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
              transition-all shadow-lg`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
