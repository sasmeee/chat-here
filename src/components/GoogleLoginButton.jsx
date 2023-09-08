import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  return (
    <div className="dark:text-gray-200 dark:bg-slate-700 dark:border-gray-500 flex items-center justify-center gap-2 p-2 font-semibold tracking-wide text-gray-700 duration-100 bg-white border border-gray-200 rounded-lg shadow-lg">
      <FcGoogle size={20} />
      <p>Login using Google</p>
    </div>
  );
};

export default GoogleLoginButton;
