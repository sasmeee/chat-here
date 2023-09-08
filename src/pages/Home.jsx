import React from "react";
import { UserAuth } from "../context/Auth";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { DevsPrew, GoogleButton, UsersPrew } from "../components";
import { PiGithubLogoFill } from "react-icons/pi";
import { BsChatDotsFill } from "react-icons/bs";

const cookies = new Cookies();

const Home = () => {
  const { googleSignIn } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      const authToken = cookies.get("auth-token");
      if (authToken) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="md:px-10 md:max-w-3xl flex flex-col w-full px-5 mx-auto">
      <div className="md:gap-2 flex flex-col items-center justify-center gap-1 mt-4">
        <div className="md:flex-row md:gap-2 flex flex-col items-center justify-center gap-1 mt-4">
          <p className="dark:text-gray-200 text-2xl font-semibold tracking-wide text-gray-700 duration-100">
            Welcome to
          </p>
          <p className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-2xl font-bold tracking-wide text-transparent">
            ChatHere
          </p>
        </div>
        <div className="dark:bg-slate-800 dark:border-gray-600 dark:text-gray-200 flex flex-col items-center justify-center gap-5 px-3 py-5 mt-3 mb-5 text-center break-words duration-100 bg-white border border-gray-200 rounded-lg shadow-lg">
          <p>
            Hello there! Welcome to ChatHere, the friendly chat app that brings
            people together from all corners of the globe. Whether you're
            looking to chat with new folks or make friends, ChatHere makes it a
            breeze. Plus, we've kept things simple, so you can log in with your
            Google account in no time.
          </p>
          <button onClick={handleGoogleSignIn}>
            <GoogleButton />
          </button>
          <p>
            And guess what? ChatHere is open source, which means you can find
            our project on GitHub. If you'd like to support us, just give our
            repository a friendly star. Let's ChatHere and make the world feel a
            little cozier, one chat at a time!
          </p>
          <a
            href="https://github.com/sasmeee/chat-here"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:bg-slate-700 dark:border-gray-500 flex items-center justify-center gap-2 px-2 py-1 font-semibold tracking-wide bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            <PiGithubLogoFill />
            <p>Github</p>
          </a>
        </div>
      </div>
      <footer className="mb-3 text-center">
        <div className="md:grid-cols-2 md:divide-y-0 md:divide-x dark:border-gray-600 dark:divide-gray-600 dark:bg-slate-800 grid grid-cols-1 gap-3 px-3 py-5 mb-3 duration-100 bg-white border border-gray-200 divide-y divide-gray-200 rounded-lg shadow-lg">
          <DevsPrew />
          <UsersPrew />
        </div>
        <div>
          <div className="flex items-center justify-center gap-2 text-center">
            <BsChatDotsFill className="dark:text-cyan-500 text-blue-500" />
            <p className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-lg font-bold tracking-wide text-transparent">
              ChatHere
            </p>
          </div>
          <p className="dark:text-gray-400 text-base text-gray-600">
            &copy; {currentYear} ChatHere. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
