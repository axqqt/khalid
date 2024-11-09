import { Building2, Home, Banknote } from 'lucide-react'

export default function Services() {
  const services = [
    {
      title: "Property Sales",
      description: "Expert assistance in selling your Dubai property at the best market value",
      icon: Home,
    },
    {
      title: "Property Management",
      description: "Complete rental and property management services for property owners",
      icon: Building2,
    },
    {
      title: "Investment Consulting",
      description: "Strategic investment advice for international investors in Dubai real estate",
      icon: Banknote,
    }
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">My Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4">
                <service.icon className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}