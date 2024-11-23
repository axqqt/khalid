/* eslint-disable @next/next/no-img-element */
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
  Home,
  Building,
  Search,
} from "lucide-react";

const FeaturedProperties = ({ properties = [] }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-amber-50 p-6 rounded-full mb-6">
        <Building className="w-12 h-12 text-amber-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        No Properties Available
      </h3>
      <p className="text-gray-600 text-center max-w-md mb-8">
        We are currently updating our property listings. Please check back soon or set up alerts to be notified when new properties become available.
      </p>
      <div className="flex gap-4">
        <button className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
          <Search className="w-4 h-4 mr-2" />
          Browse All Areas
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors">
          <Home className="w-4 h-4 mr-2" />
          Set Alert
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen" id="properties">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Badge className="bg-amber-100 text-amber-700 px-3 py-1 text-sm font-medium rounded-full">
              Featured Listings
            </Badge>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800">
            Discover Your Dream Property
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our curated selection of premium properties in the most sought-after locations
          </p>
        </div>

        {properties.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card
                key={property.id}
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
                      <Badge className="bg-amber-600 hover:bg-amber-700 text-white">
                        {property.type}
                      </Badge>
                      {property.isNew && (
                        <Badge className="bg-green-600 hover:bg-green-700 text-white">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg">
                        <Heart className="w-4 h-4 text-gray-700" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg">
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

                  <CardTitle className="text-xl mb-2 font-bold hover:text-amber-600 transition-colors">
                    {property.title}
                  </CardTitle>
                  <p className="text-3xl font-bold text-amber-600 mb-4">
                    {property.price}
                  </p>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />
                    <span className="text-sm truncate">{property.location}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-2 text-amber-600" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-2 text-amber-600" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-2 text-amber-600" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {property.features.map((feature, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 hover:bg-gray-200"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="px-6 pb-6 pt-0">
                  <button className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold shadow-lg hover:shadow-amber-200 flex items-center justify-center group">
                    <span>View Details</span>
                    <svg
                      className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;