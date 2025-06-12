import { Card, Spin, Alert, Progress, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { fetchWeatherByCity } from "../api/weather";

interface WeatherCardProps {
  city: string;
}
interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelslike: number;
  condition: string;
  icon: string;
  humidity: number;
  wind_kph: number;
  cloud: number;
  uv: number;
  localtime: string;
}
export default function WeatherCard({ city }: WeatherCardProps) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      setError("");
      try {
        const weather = await fetchWeatherByCity(city);
        setData(weather);
      } catch {
        setError("Failed to fetch weather data. Please try again.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getWeather();
  }, [city]);

  if (loading) return <Spin tip="Loading weather..." />;
  if (error)
    return (
      <Alert
        message={error}
        type="error"
        showIcon
        className="max-w-md w-full"
      />
    );
  return (
    <Card
      title={`${data?.city}, ${data?.country}`}
      className="w-full max-w-xl shadow-xl rounded-2xl bg-white/60 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <img src={data?.icon} alt={data?.condition} className="w-20 h-20" />
          <p className="text-lg font-medium capitalize text-gray-700">
            {data?.condition}
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-5xl font-bold text-blue-700">
            {data?.temperature}°C
          </h2>
          <p className="text-gray-600">Feels like: {data?.feelslike}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-800">
        <div>
          <p className="font-semibold">Humidity</p>
          <Progress percent={data?.humidity} status="active" size="small" />
        </div>
        <div>
          <p className="font-semibold">Cloud Cover</p>
          <Progress percent={data?.cloud} strokeColor="#8884d8" size="small" />
        </div>
        <div>
          <p className="font-semibold">Wind Speed</p>
          <p>{data?.wind_kph} kph</p>
        </div>
        <div>
          <p className="font-semibold">UV Index</p>
          <Tooltip title="Scale: 0 (low) to 11+ (extreme)">
            <Progress
              percent={((data?.uv ?? 0) / 11) * 100}
              size="small"
              strokeColor="#facc15"
              format={() => `${data?.uv}`}
            />
          </Tooltip>
        </div>
        <div className="col-span-2 text-center mt-2">
          <p className="text-gray-500">Local time: {data?.localtime}</p>
        </div>
      </div>
    </Card>
  );
}
