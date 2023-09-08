import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaUserFriends } from "react-icons/fa";

const UsersPreview = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const getRandomUsers = (data, count) => {
    const shuffledData = [...data];
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }
    return shuffledData.slice(0, count);
  };

  const getUsers = async () => {
    const usersCollectionRef = collection(db, "users");
    const snapshot = await getDocs(usersCollectionRef);
    const usersData = snapshot.docs.map((doc) => doc.data());
    setTotalUsers(usersData.length);
    const randomUsers = getRandomUsers(usersData, 10);
    setUsers(randomUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="dark:text-gray-200 text-gray-900">
      <p className="md:mt-0 mt-3 text-lg font-semibold tracking-wide">Users</p>
      <div className="flex flex-col items-center justify-center w-full gap-2 my-3">
        <div className="flex flex-row-reverse justify-center w-full h-full -space-x-2 overflow-hidden">
          {users.map((user) => (
            <img
              key={user.token}
              src={user.pp}
              alt="Profile Picture"
              className="inline-block w-8 h-8 rounded-full"
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          <FaUserFriends />
          {totalUsers}
        </div>
      </div>
    </div>
  );
};

export default UsersPreview;
