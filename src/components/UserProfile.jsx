import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase";

const UserProfile = () => {
  const [ipAddress, setIpAddress] = useState(null);
  const [countryFlag, setCountryFlag] = useState(null);

  useEffect(() => {
    // Fetch IP address when the component mounts
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        setIpAddress(data.ip);

        // Fetch country data using the fetched IP address
        fetch(`https://ipapi.co/${data.ip}/json/`)
          .then((response) => response.json())
          .then((countryInfo) => {
            // Fetch country flag using the country code
            fetch(
              `https://restcountries.com/v3/alpha/${countryInfo.country_code}`
            )
              .then((response) => response.json())
              .then((countryFlagInfo) => {
                const flag = countryFlagInfo[0]?.flags[1];
                setCountryFlag(flag);
              })
              .catch((error) =>
                console.error("Error fetching country flag: ", error)
              );
          })
          .catch((error) =>
            console.error("Error fetching country data: ", error)
          );
      })
      .catch((error) => console.error("Error fetching IP address: ", error));
  }, []);

  // Use optional chaining to safely access user properties
  const userData = {
    name: auth.currentUser?.displayName || "Anonymous",
    email: auth.currentUser?.email || "Anonymous",
    profile: auth.currentUser?.photoURL,
  };

  return (
    <div className="h-fit dark:bg-slate-800 dark:border-gray-600 dark:text-gray-200 dark:divide-gray-600 flex flex-col items-center gap-5 px-3 py-5 break-words duration-100 bg-white border border-gray-200 divide-y divide-gray-200 rounded-lg shadow-lg">
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 overflow-hidden rounded-full">
          <img src={userData.profile} alt="profile" className="w-full h-full" />
        </div>
        <p className="text-lg font-semibold">{userData.name}</p>
        <p className="dark:text-gray-300 text-sm text-gray-500 duration-100">
          {userData.email}
        </p>
        <div className="flex gap-3">
          <p className="dark:text-gray-300 text-sm text-gray-500 duration-100">
            {ipAddress || "Loading..."}
          </p>
          {countryFlag ? (
            <img
              src={countryFlag}
              alt={`Flag of the user's country`}
              className="top-[2px] relative w-6 h-4"
            />
          ) : (
            <p className="dark:text-gray-300 text-sm text-gray-500 duration-100">
              Loading...
            </p>
          )}
        </div>
      </div>
      <div className="w-full">
        <p className="mt-2">
          Welcome to Chat Here! Connect with the world on our free, open-source
          platform. Prioritize safety and consider showing some love by giving a
          star to my{" "}
          <a
            href="https://github.com/sasmeee/chat-here"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Github
          </a>{" "}
          repository. Thanks for joining us!
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
