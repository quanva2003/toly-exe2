import { useState } from "react";
import toast from "react-hot-toast";
import { ChatState } from "../context/ChatProvider";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const { setUser } = ChatState();

  const signup = async ({
    email,
    name,
    password,
    confirmPassword,
    pic,
    position,
  }) => {
    const success = handleInputErrors({
      email,
      name,
      password,
      confirmPassword,
      pic,
      position,
    });
    if (!success) return;

    setLoading(true);
    // setPicLoading(true);
    // if (pic === undefined) {
    //   toast({
    //     title: "Please Select an Image!",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   return;
    // }
    // console.log(pic);
    // if (pic.type === "image/jpeg" || pic.type === "image/png") {
    //   const data = new FormData();
    //   data.append("file", pic);
    //   data.append("upload_preset", "chat-app");
    //   data.append("cloud_name", "piyushproj");
    //   fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
    //     method: "post",
    //     body: data,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setPic(data.url.toString());
    //       console.log(data.url.toString());
    //       setPicLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setPicLoading(false);
    //     });
    // } else {
    //   toast({
    //     title: "Please Select an Image!",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   setPicLoading(false);
    //   return;
    // }
    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          password,
          confirmPassword,
          pic,
          position,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};
export default useSignup;

function handleInputErrors({
  email,
  name,
  password,
  confirmPassword,
  pic,
  position,
}) {
  if (!email || !name || !password || !confirmPassword || !pic || !position) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
