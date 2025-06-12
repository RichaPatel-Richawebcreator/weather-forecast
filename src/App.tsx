import { useEffect, useState } from "react";
import { Button, Flex, Input, Typography } from "antd";
import WeatherCard from "./components/WeatherCard";

const { Title } = Typography;

export const App = () => {
  const [city, setCity] = useState("");

  const handleSearch = (value: string) => {
    setCity(value.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300  text-gray-900  p-6">
      <Flex>
        <Title className="!text-3xl !text-blue-900">🌤️ Weather Forecast</Title>
      </Flex>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Input.Search
          placeholder="Enter city name"
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          className="w-72"
        />
      </div>

      {city && <WeatherCard city={city} />}
    </div>
  );
};
