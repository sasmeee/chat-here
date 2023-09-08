import React, { useState, useEffect } from "react";
import axios from "axios";

const Developers = () => {
  const [devData, setDevData] = useState([]);
  const devs = [
    {
      dev_id: 1,
      dev_username: "sasmeee",
    },
  ];

  useEffect(() => {
    const fetchGitHubProfiles = async () => {
      const profiles = [];

      for (const dev of devs) {
        try {
          const response = await axios.get(
            `https://api.github.com/users/${dev.dev_username}`
          );
          profiles.push(response.data);
        } catch (error) {
          console.error(
            `Error fetching GitHub profile for ${dev.dev_username}:`,
            error
          );
        }
      }

      setDevData(profiles);
    };

    fetchGitHubProfiles();
  }, []);

  return (
    <div className="dark:text-gray-200 text-gray-900">
      <p className="text-lg font-semibold tracking-wide">Developers</p>
      <div className="flex flex-col items-center gap-2 my-3">
        {devData.map((dev) => (
          <div key={dev.id} className="flex items-center gap-2">
            <img
              src={dev.avatar_url}
              alt={`Avatar of ${dev.login}`}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex gap-2">
              <p className="font-semibold">{dev.name}</p>
              <a
                href={dev.html_url}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
