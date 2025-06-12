const API_KEY = "68fa45288d254bb9bcb80605251206";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

export async function fetchWeather({ city }: { city?: string }) {
  const query = encodeURIComponent(city || "");

  const res = await fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&days=5`);

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
    forecast: data.forecast.forecastday.map((day: any) => ({
      date: day.date,
      avgTemp: day.day.avgtemp_c,
      text: day.day.condition.text,
      icon: "https:" + day.day.condition.icon,
    })),
  };
}
