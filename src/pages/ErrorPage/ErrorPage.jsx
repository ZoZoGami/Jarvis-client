import { FaTools, FaHome, FaEnvelope } from "react-icons/fa";
import { MdConstruction } from "react-icons/md";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-[#f6e7de] flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with construction icon */}
        <div className="bg-orange-500 p-8 text-center">
          <div className="flex flex-col items-center">
            <MdConstruction className="text-white text-5xl mb-4" />
            <h1 className="text-3xl font-bold text-white">Under Construction</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <FaTools className="text-orange-500 text-4xl" />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            We're working on something awesome!
          </h2>
          
          <p className="text-gray-600 mb-6">
            This page is currently being developed. Our team is hard at work 
            creating an amazing experience for you. Please check back soon!
          </p>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8 rounded">
            <p className="text-orange-700">
              Expected completion: Coming Soon
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/"
              className="flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              <FaHome className="mr-2" />
              Return Home
            </a>
            
            <a
              href="mailto:support@jarvis.edu"
              className="flex items-center justify-center px-6 py-3 border border-orange-500 text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-colors"
            >
              <FaEnvelope className="mr-2" />
              Contact Us
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 text-center text-gray-500 text-sm">
          <p>Thank you for your patience!</p>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;