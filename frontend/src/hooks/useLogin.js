import { useState } from "react";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
import { ChatState } from "../context/ChatProvider";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  // const { setAuthUser } = useAuthContext();
  const {setUser} = ChatState();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("userInfo", JSON.stringify(data));
      // setAuthUser(data);
      setUser(data)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
