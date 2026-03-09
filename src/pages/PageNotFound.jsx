import { Frown } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6">

        <div className="flex justify-center">
          <Frown size={64} className="text-secondary" />
        </div>

        <h1 className="text-3xl font-semibold text-gray-800">
          Sorry! The page you’re looking for isn’t available.
        </h1>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-custom-wine text-white rounded-xl hover:bg-gray-800 transition"
        >
          Go back to Login
        </Link>

      </div>
    </div>
  );
};

export default NotFound;