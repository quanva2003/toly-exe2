import {
  Box,
  Button,
  FormControl,
  Input,
  useToast,
  Spinner,
  Avatar,
  Text,
  IconButton,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { ChatState } from "../../../context/ChatProvider.jsx";
import UserListItem from "../userAvatar/UserListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faCircleUser,
  faUserMinus,
  faMessage,
  faPen,
  faTrash,
  faUserPlus,
  faArrowRightFromBracket,
  faBell,
  faBan,
  faTriangleExclamation,
  faMagnifyingGlass,
  faImages,
  faFileLines,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import {
  EnvironmentOutlined,
  StarFilled,
  EnvironmentFilled,
} from "@ant-design/icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Flex } from "antd";

interface UpdateGroupChatBoxProps {
  fetchMessages: () => void;
  fetchAgain: boolean;
  setFetchAgain: (fetchAgain: boolean) => void;
}
interface ChatGrMember {
  _id: string;
  name: string;
  imageUrl: string;
  position?: {
    lat: number;
    lng: number;
  };
}

interface Location {
  _id: string;
  name: string;
  area: string;
  rating: number;
  priceRange: string;
  position: { lat: number; lng: number };
  imageUrl: string;
}
const UpdateGroupChatBox: React.FC<UpdateGroupChatBoxProps> = ({
  fetchMessages,
  fetchAgain,
  setFetchAgain,
}) => {
  const [groupChatName, setGroupChatName] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [renameloading, setRenameLoading] = useState<boolean>(false);
  const [isChatInfoOpen, setIsChatInfoOpen] = useState<boolean>(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState<boolean>(false);
  const [isChatMembersOpen, setIsChatMembersOpen] = useState<boolean>(false);
  const [isMediaFilesOpen, setIsMediaFilesOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [chatGrMembers, setChatGrMembers] = useState<ChatGrMember[]>([]);

  const {
    isOpen: isFirstOpen,
    onOpen: onFirstOpen,
    onClose: onFirstClose,
  } = useDisclosure();
  const {
    isOpen: isSecondOpen,
    onOpen: onSecondOpen,
    onClose: onSecondClose,
  } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1: any) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
      onFirstClose();
      setSearchResult([]);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const accessChat = async (userId: string) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c: any) => c._id === data._id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleRemove = async (user1: any) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const location = useLocation(); // Access location object from React Router
  const selectedExplore = location.state?.selectedExplore;
  const [selectDistance, setSelectDistance] = useState<number>(0);
  const [optionSelect, setOptionSelect] = useState<string | number>("");
  const [customDistance, setCustomDistance] = useState<number | null>(null);
  const fetchLocationData = async () => {
    try {
      const response = await axios.get<Location[]>(
        "http://localhost:5000/api/explore"
      );
      console.log(response.data);

      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchLocationData();
  }, []);

  // Update searchTerm when selectedExplore changes
  // useEffect(() => {
  //   if (selectedExplore) {
  //     setSearchTerm(selectedExplore.name);
  //   } else {
  //     setSearchTerm("");
  //   }
  // }, [selectedExplore]);

  // const filteredLocations = locations.filter((location) =>
  //   location.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  //hint

  const handleHintExplore = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const allUsers = response.data;

      const chatGrMembers: ChatGrMember[] = selectedChat.users
        .filter((chatUser) =>
          allUsers.some((apiUser) => apiUser._id === chatUser._id)
        )
        .map((chatUser) => ({
          _id: chatUser._id,
          name: chatUser.name,
          imageUrl: chatUser.pic,
          position: {
            lat: chatUser.position.lat,
            lng: chatUser.position.lng,
          },
        }));

      setChatGrMembers(chatGrMembers);

      // Filter locations based on selectDistance from all members
      const filteredLocations = locations.filter((location) => {
        // Check distance from location to each member
        const distances = chatGrMembers.map((member) => {
          if (member.position) {
            return calculateDistance(
              location.position.lat,
              location.position.lng,
              member.position.lat,
              member.position.lng
            );
          }
          return Infinity; // Handle if position is undefined
        });

        // Check if all distances are <= selectDistance
        const allDistancesValid = distances.every(
          (distance) => distance <= selectDistance
        );

        return allDistancesValid;
      });

      console.log("Filtered Locations:", filteredLocations);

      // Now you can display or use filteredLocations as needed
    } catch (error) {
      console.error("Error fetching user data for explore:", error);
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === "other") {
      setOptionSelect("other");
      setSelectDistance(0);
      setCustomDistance(null);
    }
    if (value === null) {
      setOptionSelect("");
    } else {
      setOptionSelect(value);

      setSelectDistance(Number(value));
    }
    console.log(`selected ${value}`);
  };

  const handleNumberInputChange = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    setCustomDistance(valueAsNumber);
    setSelectDistance(valueAsNumber);
    console.log(`selected ${valueAsNumber}`);
  };
  console.log(
    "select:",
    selectDistance,
    ",custom: ",
    customDistance,
    "option:",
    optionSelect
  );

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      background="white"
      padding="20px"
      boxShadow="lg"
      w={{ base: "50%", md: "23%" }}
      borderRadius="lg"
      borderWidth="1px"
      overflowY="auto"
    >
      {/* Header Section */}
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        width="100%"
        mb={4}
      >
        <Box
          display="flex"
          position="relative"
          width="64px"
          height="64px"
          // marginRight="14px"
          mb={6}
        >
          {selectedChat.users.slice(0, 2).map((userItem, index) => (
            <Avatar
              key={index}
              src={userItem.pic}
              position="absolute"
              width="60px"
              height="60px"
              border="2px solid white"
              borderRadius="full"
              top={index === 0 ? "-12px" : "auto"}
              bottom={index === 1 ? "-20px" : "auto"}
              right={index === 0 ? "-14px" : "auto"}
              left={index === 1 ? "-4px" : "auto"}
              zIndex={index === 0 ? "1" : "2"}
            />
          ))}
        </Box>
        <Box>
          <Text fontSize="24px" fontWeight="bold">
            {selectedChat.chatName}
          </Text>
        </Box>
        <Box display="flex" justifyContent="space-evenly" width="100%" mt={4}>
          <VStack>
            <IconButton
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              bgColor="#dff7f7"
              isRound
              aria-label="Profile"
              onClick={onSecondOpen}
            />
            <Text fontSize="sm" color="gray.500">
              Hint Explore
            </Text>
          </VStack>
          <VStack>
            <IconButton
              icon={<FontAwesomeIcon icon={faBell} />}
              bgColor="#dff7f7"
              isRound
              aria-label="Navigate"
            />
            <Text fontSize="sm" color="gray.500">
              Mute
            </Text>
          </VStack>
          <VStack>
            <IconButton
              icon={<FontAwesomeIcon icon={faUserPlus} />}
              bgColor="#dff7f7"
              isRound
              aria-label="Add Member"
            />
            <Text fontSize="sm" color="gray.500">
              Add
            </Text>
          </VStack>
        </Box>
      </Box>

      {/* Sections */}
      <Box width="100%">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            width="100%"
            bg="none"
            justifyContent="space-between"
            rightIcon={isChatInfoOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={() => setIsChatInfoOpen(!isChatInfoOpen)}
          >
            Chat Info
          </Button>
        </Box>
        <Collapse in={isChatInfoOpen}>
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            p={4}
            // bg="gray.200"
          >
            <Text fontSize="sm" mb={2}>
              Group name: {selectedChat.chatName}
            </Text>
            <Text fontSize="sm" mb={2}>
              Admin: {selectedChat.groupAdmin.name}
            </Text>
            <Text fontSize="sm" mb={2}>
              Total members: {selectedChat.users.length} members
            </Text>
          </Box>
        </Collapse>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            width="100%"
            bg="none"
            justifyContent="space-between"
            rightIcon={
              isEditGroupOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
            }
            onClick={() => setIsEditGroupOpen(!isEditGroupOpen)}
          >
            Edit Chat
          </Button>
        </Box>
        <Collapse in={isEditGroupOpen}>
          <Box display="flex" flexDirection="column" width="100%">
            <Button
              leftIcon={<FontAwesomeIcon icon={faPen} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Change chat name
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faImage} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Change chat avatar
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
              onClick={onFirstOpen}
            >
              Add Member
            </Button>
          </Box>
        </Collapse>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            width="100%"
            bg="none"
            justifyContent="space-between"
            rightIcon={
              isChatMembersOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
            }
            onClick={() => setIsChatMembersOpen(!isChatMembersOpen)}
          >
            Chat Members
          </Button>
        </Box>
        <Collapse in={isChatMembersOpen}>
          <Box display="flex" flexDirection="column" width="100%" px={2}>
            {selectedChat.users.map((u: any) => (
              <Box
                key={u._id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Box display="flex" alignItems="center">
                  <Avatar src={u.pic} size="sm" mr={2} />
                  <Box>
                    <Text>{u.name}</Text>
                    <Text fontSize="xs" color="gray.500">
                      Added by {selectedChat.groupAdmin.name}
                    </Text>
                  </Box>
                </Box>
                <Menu>
                  <MenuButton>
                    <IconButton
                      aria-label="Options"
                      icon={<FontAwesomeIcon icon={faEllipsis} />}
                      bg="none"
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      icon={
                        <FontAwesomeIcon icon={faMessage} fontSize="14px" />
                      }
                      onClick={() => accessChat(u._id)}
                    >
                      Message
                    </MenuItem>
                    <MenuItem
                      icon={
                        <FontAwesomeIcon icon={faCircleUser} fontSize="14px" />
                      }
                      onClick={() => navigate(`/profile/${u._id}`)}
                    >
                      View Profile
                    </MenuItem>
                    <MenuItem
                      icon={
                        <FontAwesomeIcon icon={faUserMinus} fontSize="14px" />
                      }
                      onClick={() => handleRemove(u)}
                    >
                      Remove Member
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            ))}
          </Box>
        </Collapse>

        <Button
          onClick={() => setIsMediaFilesOpen(!isMediaFilesOpen)}
          width="100%"
          bg="none"
          justifyContent="space-between"
          rightIcon={isMediaFilesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        >
          Media & Files
        </Button>
        <Collapse in={isMediaFilesOpen}>
          <Box display="flex" flexDirection="column" width="100%">
            <Button
              leftIcon={<FontAwesomeIcon icon={faImages} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Media
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faFileLines} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Files
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faLink} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Links
            </Button>
          </Box>
        </Collapse>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            width="100%"
            bg="none"
            justifyContent="space-between"
            rightIcon={isPrivacyOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
          >
            Privacy Settings
          </Button>
        </Box>
        <Collapse in={isPrivacyOpen}>
          <Box display="flex" flexDir="column" width="100%">
            <Button
              leftIcon={<FontAwesomeIcon icon={faBell} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Mute notifications
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faBan} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Block
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faTriangleExclamation} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Report
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
              onClick={() => handleRemove(user)}
            >
              Leave group
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faTrash} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
              color="red"
            >
              Delete chat
            </Button>
          </Box>
        </Collapse>
      </Box>

      {/* Add User Modal */}
      <Modal isOpen={isFirstOpen} onClose={onFirstClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User to Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {loading ? (
                <Spinner size="lg" />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onFirstClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isSecondOpen} onClose={onSecondClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hint Explore Around Members</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* {chatGrMembers.length > 0 ? (
              <VStack spacing={2} alignItems="stretch">
                {chatGrMembers.map((user) => (
                  <Box
                    key={user._id}
                    bg="white"
                    p={2}
                    borderRadius="lg"
                    shadow="md"
                  >
                    <Avatar src={user.imageUrl} size="md" />
                    <Text fontSize="md" fontWeight="bold">
                      {user.name}
                    </Text>
                    <Text fontSize="md" fontWeight="bold">
                      {user.position?.lat}
                    </Text>
                    <Text fontSize="md" fontWeight="bold">
                      {user.position?.lng}
                    </Text>
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text fontSize="md" color="gray.500">
                No users found in this vicinity.
              </Text>
            )} */}
            {/* <Input
              placeholder="Search location..."
              maxLength={300}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div
              style={{ overflowY: "auto", maxHeight: "500px", marginTop: 5 }}
            >
              {filteredLocations.map((location, index) => (
                <Card
                  key={index}
                  hoverable
                  style={{ margin: "10px " }}
                  onClick={() => {
                    console.log(location);
                  }}
                >
                  <Flex justify="space-between" align="center">
                    <img
                      src={location.imageUrl}
                      alt={location.name}
                      style={{
                        width: "250px",
                        height: "100px",
                        objectFit: "cover",
                        alignItems: "center",
                        borderRadius: "10px",
                      }}
                    />
                    <Flex vertical style={{ paddingLeft: 20 }}>
                      <p className="location-name" style={{ fontWeight: 600 }}>
                        {location.name}
                      </p>
                      <p className="location-address">
                        <EnvironmentFilled style={{ marginRight: 3 }} />
                        {location.area}
                      </p>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </div> */}
            <Select placeholder="Select option" onChange={handleSelectChange}>
              <option value="5">{"< 5km"}</option>
              <option value="10">{"< 10km"}</option>
              <option value="15">{"< 15km"}</option>
              <option value="other">Other</option>
            </Select>
            {optionSelect === "other" && (
              <NumberInput
                defaultValue={15}
                min={0}
                max={200}
                onChange={handleNumberInputChange}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Explore</h2>
            {/* <Button>Find Explore</Button> */}
            {/* <br /> */}
            {optionSelect === "" ? (
              "No distance chosen"
            ) : optionSelect === "other" && customDistance === null ? (
              "Wait for input distance"
            ) : (
              <Button onClick={handleHintExplore}>Find Explore</Button>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSecondClose}>
              {" "}
              Close{" "}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UpdateGroupChatBox;
