import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

interface Conversation {
  name: string;
}

const SearchInput: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c: Conversation) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
    >
      <input
        type="text"
        placeholder="Search…"
        style={{
          padding: "0.5rem",
          border: "1px solid #CBD5E0",
          borderRadius: "20px",
          backgroundColor: "#fff",
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#38BDF8",
          color: "#fff",
          borderRadius: "50%",
          border: "none",
          padding: "0.5rem",
        }}
      >
        <IoSearchSharp
          style={{ width: "1.5rem", height: "1.5rem", outline: "none" }}
        />
      </button>
    </form>
  );
};

export default SearchInput;
