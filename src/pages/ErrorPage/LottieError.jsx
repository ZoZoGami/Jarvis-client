import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import Error123 from "../../assets/lottie/Error123.json";

const LottieError = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      {/* Animation */}
      <Lottie
        className="w-3/4 sm:w-1/2 lg:w-1/3 mx-auto"
        animationData={Error123}
        loop={true}
      />

      {/* Button */}
      <div className="mx-auto mt-6">
        <Link
          to="/"
          className="block text-center w-full sm:w-48 bg-orange-400 text-white text-lg sm:text-xl py-2 px-4 rounded-lg shadow-md hover:bg-orange-500 transition"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default LottieError;
