import { Box } from "@chakra-ui/layout";
import React from "react";
import "./styles.css";
import SingleChat from "./SingleChat.tsx";
import { ChatState } from "../../context/ChatProvider.jsx";

interface ChatboxProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chatbox: React.FC<ChatboxProps> = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      width={{ base: "100%", md: "74%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
