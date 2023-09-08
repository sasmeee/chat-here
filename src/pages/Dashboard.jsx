import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Auth";
import { Profile } from "../components";

export let getRoomID = "";

const Dashboard = () => {
  const { logOut } = UserAuth();
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChatRoom = async (e) => {
    e.preventDefault();
    if (roomID.trim() !== "") {
      navigate("/chat:room");
    }

    getRoomID = roomID;
  };

  return (
    <div className="md:px-10 md:max-w-3xl flex flex-col w-full px-5 mx-auto">
      <div className="md:flex-row md:gap-2 flex flex-col items-center justify-center gap-1 mt-4">
        <p className="dark:text-gray-200 text-2xl font-semibold tracking-wide text-gray-700 duration-100">
          Welcome to
        </p>
        <p className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-2xl font-bold tracking-wide text-transparent">
          ChatHere
        </p>
      </div>
      <div className="md:grid-cols-2 md:gap-5 grid grid-cols-1 gap-3 my-5">
        <Profile />
        <div className="dark:bg-slate-800 dark:border-gray-600 dark:text-gray-200 dark:divide-gray-600 flex flex-col items-center justify-center gap-5 px-3 py-5 break-words duration-100 bg-white border border-gray-200 divide-y divide-gray-300 rounded-lg shadow-lg">
          <div className="flex flex-col gap-3">
            <p className="text-xl font-semibold tracking-wider">Global Chat</p>
            <p>
              Say hello to the world, send messages globally, and make friends
              worldwide effortlessly!
            </p>
            <Link
              to="/chat:global"
              className="w-fit px-2 py-1 font-semibold tracking-wide text-gray-100 bg-blue-500 rounded-lg"
            >
              Explore the Global
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <p className="mt-1 text-xl font-semibold tracking-wider">
              Chat Rooms
            </p>
            <p>
              Create custom rooms with unique IDs, chat with friends, and
              connect seamlessly in your personalized virtual spaces!
            </p>
            <p className="dark:text-gray-300 text-gray-700 duration-100">
              Ex: "TS563HDN"
            </p>
            <form onSubmit={handleChatRoom} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Enter Room ID"
                onChange={(e) => setRoomID(e.target.value)}
                className="dark:bg-slate-700 dark:border-gray-500 w-2/3 px-4 py-1 border border-gray-300 rounded-lg outline-none"
              />
              <button
                type="submit"
                className="w-fit px-2 py-1 font-semibold tracking-wide text-gray-100 bg-green-500 rounded-lg"
              >
                Create Your Room
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-3">
            <p className="mt-2">
              Thank you for using ChatHere! Come back soon to connect with
              friends and explore new conversations. Goodbye for now!
            </p>
            <button
              onClick={handleSignOut}
              className="w-fit px-2 py-1 font-semibold tracking-wide text-gray-100 bg-red-500 rounded-lg"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
