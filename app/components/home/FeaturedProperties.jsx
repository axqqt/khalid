import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from 'lucide-react';
import { Bed, Bath, Square, MapPin } from 'lucide-react';

const FeaturedProperties = () => {
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
      isNew: true
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
      isNew: false
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
      isNew: true
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium properties in the most desirable locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-blue-500">{property.type}</Badge>
                    {property.isNew && (
                      <Badge className="bg-green-500">New</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <CardTitle className="mb-2">{property.title}</CardTitle>
                <p className="text-2xl font-bold text-blue-600 mb-4">{property.price}</p>
                
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-2" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-2" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-2" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-6 pb-6 pt-0">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;