"use client";
import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async () => {
    try {
      const lat = 19.076; // Example latitude
      const lon = 72.8777; // Example longitude

      const response = await axios.get(
        `http://localhost:3001/dev/api/weather`,
        {
          params: { lat, lon },
        }
      );

      // Sort weather data to ensure pinned providers appear at the top
      const sortedData = response.data.sort(
        (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
      );
      setWeatherData(sortedData);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  const togglePin = async (provider) => {
    try {
      await axios.post("http://localhost:3001/dev/api/weather/togglePin", {
        provider,
      });

      // Update the weather data by toggling the pinned status
      const updatedData = weatherData.map((data) =>
        data.provider === provider ? { ...data, pinned: !data.pinned } : data
      );

      // Sort weather data to ensure pinned providers appear at the top
      const sortedData = updatedData.sort(
        (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
      );
      setWeatherData(sortedData);
    } catch (error) {
      console.error("Error toggling pin:", error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather Dashboard</h1>
      <button className="fetch-btn" onClick={fetchWeatherData}>
        Fetch Weather Data
      </button>

      <div className="table-wrapper">
        <table className="weather-table">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Temperature (°C)</th>
              <th>Wind Speed (km/h)</th>
              <th>Conditions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.length > 0 ? (
              weatherData.map((data) => (
                <tr key={data.provider}>
                  <td>{data.provider}</td>
                  <td>{data.temperature}</td>
                  <td>{data.wind_speed}</td>
                  <td>{data.conditions}</td>
                  <td>
                    <button
                      className={`action-btn ${
                        data.pinned ? "unpin-btn" : "pin-btn"
                      }`}
                      onClick={() => togglePin(data.provider)}
                    >
                      {data.pinned ? "Unpin" : "Pin"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No weather data available. Click "Fetch Weather Data" to load
                  data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
