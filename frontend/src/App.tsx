import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./pages/ChatPage";
// import Login from "./pages/login/Login";
// import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/Landingpage";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/friends"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/friends" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/friends" /> : <SignUp />}
        />
        <Route path="/home" element={<LandingPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
