import React from "react";
import { Chat, ChatRooms, Dashboard, Home } from "./pages";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { ProtectedRoutes } from "./utils";
import { AuthContextProvider } from "./context/Auth";

const App = () => {
  return (
    <div className="dark:bg-slate-900 min-h-screen bg-gray-100">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/chat:global"
            element={
              <ProtectedRoutes>
                <Chat />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/chat:room"
            element={
              <ProtectedRoutes>
                <ChatRooms />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
