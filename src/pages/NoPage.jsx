import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="flex flex-col items-center text-center justify-center px-8 py-32">
      <h1 className="md:text-4xl text-xl font-bold duration-100 text-gray-800 dark:text-gray-200 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="md:text-lg text-gray-600 duration-100 dark:text-gray-400 mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/dashboard"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold tracking-wider py-2 px-4 rounded-lg"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NoPage;
