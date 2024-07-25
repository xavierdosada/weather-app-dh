import { useState } from "react";
import "./WeatherApp.css";

export const WeatherApp = () => {
  const urlBase = import.meta.env.VITE_WEATHER_URL_BASE;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const kelvin = 273.15;

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`);
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.log("Ocurrio un error", { error });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(city);
  };

  const handleCityChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  return (
    <div className="container">
      <h1>App de clima</h1>
      <form>
        <input
          type="text"
          placeholder="Ingrese una ciudad"
          value={city}
          onChange={handleCityChange}
        ></input>
        <button onClick={handleSubmit} type="submit">Buscar</button>
      </form>
      {weatherData?.cod !== 200 
        ? (<h3>No se encontro una ciudad con ese nombre</h3>) 
        : (<div>
            <h2>{weatherData.name}, {weatherData.sys?.country}</h2>
            <p>La temperatura es de: {Math.floor(weatherData.main?.temp - kelvin)} °C </p>
            <p>La condición meterologica actual: {weatherData.weather[0]?.description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
              alt={weatherData.weather[0]?.description}
            />
          </div>
        )}
    </div>
  );
};
