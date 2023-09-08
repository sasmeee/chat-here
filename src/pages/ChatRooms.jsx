import React, { useEffect, useState, useRef } from "react";
import { VscSend, VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { getRoomID } from "./Dashboard";

const ChatRooms = () => {
  const [messages, setMessages] = useState([]);
  const [replyToMessage, setReplyToMessage] = useState(null);
  const [replyMessageInput, setReplyMessageInput] = useState("");
  const lastMessageRef = useRef(null);
  const inputRef = useRef(null);

  const messagesRef = collection(db, "messages:room");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", getRoomID),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (replyMessageInput === "") return;

    try {
      const messageData = {
        text: replyMessageInput,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        userPP: auth.currentUser.photoURL,
        room: getRoomID,
      };

      if (replyToMessage) {
        messageData.replyTo = {
          user: replyToMessage.user,
          text: replyToMessage.text,
        };
        setReplyToMessage(null);
      }

      await addDoc(messagesRef, messageData);

      setReplyMessageInput("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleReplyMessageKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);

      setReplyMessageInput("");
      inputRef.current.focus();
    }
  };

  function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <div>
      <div className="mb-14 h-full px-3 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`flex flex-col ${
              msg.user === auth.currentUser.displayName
                ? "items-end"
                : "items-start"
            } mb-2`}
          >
            {index === 0 || msg.user !== messages[index - 1].user ? (
              <div className="flex items-center mb-1">
                {msg.user !== auth.currentUser.displayName && (
                  <img
                    src={msg.userPP}
                    alt="user-profile"
                    className="w-6 h-6 mr-2 rounded-full"
                  />
                )}
                <p
                  className={`text-sm dark:text-gray-300 ${
                    msg.user === auth.currentUser.displayName
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {msg.user}
                </p>
                {msg.user === auth.currentUser.displayName && (
                  <img
                    src={auth.currentUser.photoURL}
                    alt="user-profile"
                    className="w-6 h-6 ml-2 rounded-full"
                  />
                )}
              </div>
            ) : null}
            {msg.replyTo && (
              <div
                className={`${
                  msg.user === auth.currentUser.displayName
                    ? "bg-gray-200 text-gray-500 duration-100 dark:bg-gray-600 dark:text-gray-300"
                    : "bg-gray-200 text-gray-500 duration-100 dark:bg-gray-600 dark:text-gray-300"
                } p-2 rounded-lg min-w-[75px] max-w-[175px] md:max-w-[250px] break-all mb-1`}
              >
                <p className="text-sm">
                  <span className="font-semibold">{msg.replyTo.user}: </span>
                  {msg.replyTo.text}
                </p>
              </div>
            )}
            <div
              className={`${
                msg.user === auth.currentUser.displayName
                  ? "bg-blue-500 dark:bg-blue-700 duration-100"
                  : "bg-gray-200 dark:bg-gray-700 duration-100"
              } rounded-lg p-2 min-w-[75px] max-w-[200px] md:max-w-[250px] break-all`}
            >
              <p
                className={`text-lg text-left ${
                  msg.user === auth.currentUser.displayName
                    ? "text-gray-200"
                    : "text-gray-800 duration-100 dark:text-gray-200"
                }`}
              >
                {msg.text}
              </p>
              {msg.createdAt && (
                <p
                  className={`text-sm text-right ${
                    msg.user === auth.currentUser.displayName
                      ? "text-gray-300" // my
                      : "text-gray-700 duration-100 dark:text-gray-300" // others
                  } mt-1`}
                >
                  {formatTime(msg.createdAt.toDate())}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setReplyToMessage(msg);
                inputRef.current.focus();
              }}
              className="dark:text-blue-400 mt-1 text-sm text-blue-500 duration-100 cursor-pointer"
            >
              Reply
            </button>
          </div>
        ))}
      </div>

      <div className="dark:bg-slate-800 h-14 dark:border-gray-600 fixed bottom-0 left-0 right-0 flex items-center justify-center py-2 duration-100 bg-white border-t border-gray-300">
        <form
          onSubmit={handleSubmit}
          className="md:gap-3 flex items-center w-full max-w-screen-lg gap-2 px-4 mx-auto"
        >
          <Link to="/dashboard" className="dark:text-gray-400 text-gray-600">
            <IoExitOutline size={20} />
          </Link>
          <input
            ref={inputRef}
            type="text"
            className="dark:bg-slate-700 dark:border-gray-600 dark:text-gray-200 w-full px-4 py-1 duration-100 bg-white border border-gray-300 rounded-full outline-none"
            placeholder={
              replyToMessage
                ? `Replying to ${replyToMessage.user}: ${replyToMessage.text}`
                : "Message"
            }
            onChange={(e) => setReplyMessageInput(e.target.value)}
            value={replyMessageInput}
            onKeyDown={handleReplyMessageKeyPress}
          />
          {replyToMessage && (
            <button
              onClick={() => {
                setReplyToMessage(null);
                inputRef.current.focus();
              }}
              className="dark:text-gray-400 flex items-center justify-center p-1 text-gray-600 rounded-full"
            >
              <VscClose size={18} />
            </button>
          )}
          <button
            className="flex items-center justify-center p-1 text-white bg-blue-500 rounded-full"
            type="submit"
          >
            <VscSend size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRooms;
