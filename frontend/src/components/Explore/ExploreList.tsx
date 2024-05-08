// LocationList.tsx
import React, { useState, useEffect } from "react";
import { Card, Flex } from "antd";
import { EnvironmentOutlined, StarFilled } from "@ant-design/icons";
import "./ExploreList.css";
interface Location {
  name: string;
  area: string;
  rating: number;
  priceRange: string;
  imageUrl: string;
}

const ExploreList: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    // Fetch data from server or API
    // This is just a placeholder. Replace with actual fetch request.
    const fetchLocations = async () => {
      const popularLocationsInVietnam: Location[] = [
        {
          name: "Suối Tiên",
          area: "Thủ Đức, Hồ Chí Minh City",
          rating: 4.8,
          priceRange: "100.000VND-1.000.000VND",
          imageUrl:
            "https://gonatour.vn/vnt_upload/news/09_2020/khu_du_lich_suoi_tien.jpg",
        },
        {
          name: "Chợ Bến Thành",
          area: "Quận 1, Hồ Chí Minh City",
          rating: 4.8,
          priceRange: "100.000VND-1.000.000VND",
          imageUrl:
            "https://dulich3mien.vn/wp-content/uploads/2021/12/hinh-anh-cho-ben-thanh.jpg",
        },
        {
          name: "Landmark 81",
          area: "Bình Thạnh, Hồ Chí Minh City",
          rating: 4.8,
          priceRange: "100.000VND-1.000.000VND",
          imageUrl:
            "https://www.vinhomescentralpark.co/wp-content/uploads/2021/04/landmark81-2.jpeg",
        },
        {
          name: "Đường Sách Nguyễn Văn Bình",
          area: "Quận 1, Hồ Chí Minh City",
          rating: 4.8,
          priceRange: "0VND-500.000VND",
          imageUrl:
            "https://tphcm.dangcongsan.vn/DATA/72/2020/11/%C4%91%C6%B0%E1%BB%9Dng_s%C3%A1ch-09_58_10_491.jpg",
        },
        // Add more locations here...
      ];
      setLocations(popularLocationsInVietnam);
    };

    fetchLocations();
  }, []);

  return (
    <div style={{ height: "88vh", overflowY: "auto" }}>
      {locations.map((location, index) => (
        <Card
          key={index}
          hoverable
          style={{ margin: "10px " }}
          styles={{ body: { padding: 10, overflow: "hidden" } }}
        >
          <Flex justify="space-between" align="center">
            <img
              src={location.imageUrl}
              alt={location.name}
              style={{
                width: "150px",
                height: "200px",
                objectFit: "cover",
                alignItems: "center",
                borderRadius: "10px",
              }}
            />
            <Flex
              vertical
              //   align="flex-start"
              //   justify="space-between"
              style={{ paddingLeft: 20 }}
            >
              <p className="location-name">{location.name}</p>
              <p className="location-address">
                <EnvironmentOutlined />
                {location.area}
              </p>
              <p className="location-rating">
                <StarFilled /> {location.rating}
              </p>
              <p>{location.priceRange}</p>
            </Flex>
          </Flex>
        </Card>
      ))}
    </div>
  );
};

export default ExploreList;
