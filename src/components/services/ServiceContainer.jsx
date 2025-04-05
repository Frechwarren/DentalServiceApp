import {
  FaTooth,
  FaTeeth,
  FaTeethOpen,
  FaStethoscope,
  FaSmile,
  FaUserMd,
} from "react-icons/fa";
import ServiceCard from "./ServiceCard";
import services from "@/mockData/services.json";

const iconMapping = {
  FaTooth: FaTooth,
  FaTeeth: FaTeeth,
  FaTeethOpen: FaTeethOpen,
  FaStethoscope: FaStethoscope,
  FaSmile: FaSmile,
  FaUserMd: FaUserMd,
};

export default function ServiceContainer() {
  return (
    <section id="service" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Dental Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of dental services to meet all your
            oral health needs. Our experienced team is committed to providing
            the highest quality care.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} icon={iconMapping[service.icon]}/>
          ))}
        </div>
      </div>
    </section>
  );
}
