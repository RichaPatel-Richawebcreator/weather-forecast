import { useState } from "react";
import { Flex, Input, Typography } from "antd";
import WeatherCard from "./components/WeatherCard";
const { Title } = Typography;

export const App = () => {
  const [city, setCity] = useState<string>("");
  const handleSearch = (value: string) => {
    setCity(value.trim());
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center p-5">
      <Flex vertical gap="middle">
        <Title className="!text-3xl !text-blue-900 mb-6">
          🌤️ Weather Forecast
        </Title>
        <Input.Search
          placeholder="Enter city name"
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
        />
        {city && <WeatherCard city={city} />}
      </Flex>
    </div>
  );
};
