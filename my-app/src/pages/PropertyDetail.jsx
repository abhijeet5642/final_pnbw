import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../api/properties.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Loader from '../components/Loader.jsx';
import MapEmbed from '../components/MapEmbed.jsx';
import { FiMapPin, FiHome, FiZap, FiMaximize } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';

// Define the base URL for your backend server's uploads
const BACKEND_URL = 'http://localhost:5000';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPropertyById(id);
        
        // --- THIS IS THE CRUCIAL DEBUGGING LINE ---
        // It will print the exact data arriving from your backend to the browser console.
        console.log("RAW DATA FROM API:", JSON.stringify(data, null, 2));

        setProperty(data);
      } catch (err) {
        console.error("Failed to load property details:", err);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16 text-red-600 text-xl">
      <p>{error}</p>
      <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Go Back</button>
    </main>
  );
  if (!property) return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <p className="text-gray-600 text-xl">Property not found.</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 py-16 sm:py-20">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        {/* --- Main Property Info Section --- */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
            {property.title}
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl flex items-center mb-6">
            <FiMapPin className="mr-2 text-blue-500" /> {property.location}
          </p>

          {/* --- Image Carousel --- */}
          {property.images && property.images.length > 0 ? (
            <div className="relative h-96 sm:h-[500px] mb-6 rounded-xl overflow-hidden shadow-lg">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                className="h-full w-full"
              >
                {property.images.map((imgFilename, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`${BACKEND_URL}/uploads/${imgFilename}`}
                      alt={`${property.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x500/e2e8f0/4a5568?text=Image+Error'; }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
             <div className="relative h-96 sm:h-[500px] mb-6 rounded-xl overflow-hidden shadow-lg bg-gray-200">
                <img src='https://placehold.co/800x500/e2e8f0/4a5568?text=No+Image' alt="No image available" className="w-full h-full object-cover" />
             </div>
          )}

          {/* --- Price Display --- */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 flex items-center">
              <FaRupeeSign className="mr-2" /> 
              {property.price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </section>

        {/* --- Key Details Section --- */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-8 inline-block">Key Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-lg">
            <div className="flex items-center"><FiHome className="mr-3 text-blue-500" /> <strong>Bedrooms:</strong><span className="ml-2">{property.bedrooms}</span></div>
            <div className="flex items-center"><FiZap className="mr-3 text-blue-500" /> <strong>Bathrooms:</strong><span className="ml-2">{property.bathrooms}</span></div>
            <div className="flex items-center"><FiMaximize className="mr-3 text-blue-500" /> <strong>Area:</strong><span className="ml-2">{property.area} sq. ft.</span></div>
          </div>
        </section>

        {/* --- Description Section --- */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-4 inline-block">Description</h2>
          <p className="text-gray-800 leading-relaxed text-lg">
            {property.description}
          </p>
        </section>
        
        {/* --- Map Section --- */}
        {/* This checks for the nested object and the correct "lat" and "lng" fields */}
        {property.locationCoords && property.locationCoords.lat && property.locationCoords.lng && (
          <MapEmbed 
            lat={property.locationCoords.lat} 
            lng={property.locationCoords.lng}
            address={property.location} 
          />
        )}
      </div>
    </main>
  );
}