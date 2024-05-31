import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./pages/ChatPage";
import { Toaster } from "react-hot-toast";
import { ChatState } from "./context/ChatProvider";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/Landingpage";
import NotFound from "./pages/NotFound404Page";
import ContactForm from "./pages/ContactForm";
import UserProfilePage from "./pages/Profile/UserProfile";
import ExplorePage from "./pages/Explore/ExplorePage";
import { ChakraProvider } from "@chakra-ui/react";
import ForgotPass from "./pages/ForgotPass";
import SearchPage from "./pages/SearchPage";

function App() {
  const { user } = ChatState();

  return (
    <div className="h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/chats"
          element={
            user ? (
              <ChakraProvider>
                <ChatPage />
              </ChakraProvider>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="/forgot" element={<ForgotPass />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/profile/:id" element={<UserProfilePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
