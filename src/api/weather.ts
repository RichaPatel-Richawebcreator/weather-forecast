const API_KEY = "68fa45288d254bb9bcb80605251206";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

export async function fetchWeatherByCity(city: string) {
  const res = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(city)}&key=${API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  const data = await res.json();
  return {
    city: data.location.name,
    country: data.location.country,
    temperature: data.current.temp_c,
    description: data.current.condition.text,
    icon: "https:" + data.current.condition.icon,
    feelslike: data.current.feelslike_c,
    condition: data.current.condition.text,
    humidity: data.current.humidity,
    wind_kph: data.current.wind_kph,
    cloud: data.current.cloud,
    uv: data.current.uv,
    localtime: data.location.localtime,
  };
}
