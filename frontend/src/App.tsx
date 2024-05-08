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
import NotFound from "./pages/NotFound404Page";
import ContactForm from "./pages/ContactForm";
import UserProfilePage from "./pages/Profile/UserProfile";
import ExplorePage from "./pages/Explore/ExplorePage";

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
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
