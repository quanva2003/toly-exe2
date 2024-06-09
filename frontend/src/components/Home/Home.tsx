import { Button, Carousel, Input } from "antd";
import React, { useState } from "react";
import "./Home.css";
import { SearchOutlined } from "@ant-design/icons";
import TopExplore from "../Mainboard/TopExplore";
import { useNavigate } from "react-router-dom";
import SearchExplore from "../../pages/SearchExplore";
import NewExplore from "./NewExplore";
const Home = () => {
  const slides = [
    {
      title: "Mountain Climbing Trips & Tours",
      description:
        "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.",
    },
    {
      title: "Explore the Wild Nature",
      description:
        "Discover the beauty of the wilderness and experience the adventure of a lifetime.",
    },
    {
      title: "Adventurous Escapes",
      description:
        "Experience the thrill and excitement of adventurous escapes with our expert guides.",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/searchExplore?query=${searchTerm}`);
  };

  return (
    <div className="home-container">
      <div className="home-banner">
        <img
          src="https://images.unsplash.com/photo-1613310023042-ad79320c00ff?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="home-img-carousel"
        />
        <div className="home-heading-container">
          <div className="home-heading-left">
            <h1 className="home-heading">Unleash your journey's potential.</h1>
            <div className="search-bar-home">
              <Input
                size="large"
                placeholder="Search name"
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button size="large" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
          <div className="home-heading-right">
            <Carousel autoplay dotPosition="right">
              {slides.map((slide, index) => (
                <div key={index} className="carousel-slide">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <TopExplore />
      <NewExplore />
    </div>
  );
};

export default Home;
