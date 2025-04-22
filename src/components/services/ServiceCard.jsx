"use client";

import { useRouter } from "next/navigation";

const ServiceCard = ({ title, description, icon: Icon, price }) => {
  const router = useRouter();

  const handleBookService = () => {
    router.push(`/booking?service=${title}`);
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-blue-600 font-semibold">{price}</span>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-3000"
          type="submit"
          onClick={handleBookService}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
