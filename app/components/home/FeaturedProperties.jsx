import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Heart,
  Share2,
  Calendar,
  Link,
} from "lucide-react";
import { motion } from "framer-motion";

const FeaturedProperties = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const properties = [
    {
      id: 1,
      title: "Modern Downtown Condo",
      price: "$599,000",
      location: "123 Downtown Ave",
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: "/api/placeholder/400/250",
      type: "For Sale",
      isNew: true,
      listed: "2 days ago",
      features: ["Smart Home", "Pet Friendly", "Garage"],
    },
    {
      id: 2,
      title: "Suburban Family Home",
      price: "$849,000",
      location: "456 Maple Street",
      beds: 4,
      baths: 3,
      sqft: 2400,
      image: "/api/placeholder/400/250",
      type: "For Sale",
      isNew: false,
      listed: "1 week ago",
      features: ["Pool", "Garden", "Home Office"],
    },
    {
      id: 3,
      title: "Luxury Penthouse",
      price: "$1,299,000",
      location: "789 Skyview Tower",
      beds: 3,
      baths: 3.5,
      sqft: 2800,
      image: "/api/placeholder/400/250",
      type: "For Sale",
      isNew: true,
      listed: "3 days ago",
      features: ["City View", "Concierge", "Gym"],
    },
  ];

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Featured Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our hand-picked selection of premium properties in the most
            desirable locations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                className="overflow-hidden group transition-all duration-300 hover:shadow-2xl"
                onMouseEnter={() => setHoveredId(property.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge
                        variant="default"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {property.type}
                      </Badge>
                      {property.isNew && (
                        <Badge
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-gray-700" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Share2 className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Listed {property.listed}</span>
                  </div>

                  <CardTitle className="text-xl mb-2 font-bold">
                    {property.title}
                  </CardTitle>
                  <p className="text-3xl font-bold text-blue-600 mb-4">
                    {property.price}
                  </p>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {property.features.map((feature, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-gray-100 text-gray-600"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="px-6 pb-6 pt-0">
                  <Link
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-blue-200 flex items-center justify-center"
                    href={`/listings/${property.id}`}
                  >
                    <span className="mr-2">
                      View {property.title || "Listing"}
                    </span>
                    <button className="bg-white text-blue-600 py-1 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                      Test
                    </button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
