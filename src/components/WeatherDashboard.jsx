import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WeatherGraph from "./WeatherGraph";
import WeatherTable from "./WeatherTable";

const WeatherDashboard = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [startDate, setStartDate] = useState(null); // Removed initial Date() to allow dynamic start date
  const [endDate, setEndDate] = useState(null); // Removed initial Date() to allow dynamic end date
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    if (!latitude || !longitude) {
      setError("Please enter valid latitude and longitude.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const startDateString = startDate
        ? startDate.toISOString().split("T")[0]
        : "";
      const endDateString = endDate ? endDate.toISOString().split("T")[0] : "";

      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${startDateString}&end_date=${endDateString}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean&timezone=auto`
      );

      setWeatherData(response.data.daily);
    } catch (err) {
      setError("Failed to fetch weather data. Please check your inputs.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12">
      <div className="container mx-auto bg-white rounded-lg shadow-xl p-6 space-y-8">
        <h1 className="text-4xl font-semibold text-center text-gray-800">
          Weather Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <input
              type="number"
              placeholder="Latitude"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Longitude"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="start-date"
              className="block text-gray-600 font-semibold mb-1"
            >
              Start Date
            </label>
            <DatePicker
              id="start-date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Select Start Date"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              dateFormat="yyyy/MM/dd"
            />
          </div>

          <div>
            <label
              htmlFor="end-date"
              className="block text-gray-600 font-semibold mb-1"
            >
              End Date
            </label>
            <DatePicker
              id="end-date"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="Select End Date"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              dateFormat="yyyy/MM/dd"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={fetchWeatherData}
            className="w-full md:w-auto bg-blue-600 text-white text-lg py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Fetch Weather Data
          </button>
        </div>

        {/* Error and Loading States */}
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Displaying Weather Data */}
        {weatherData && (
          <div className="space-y-8">
            <WeatherGraph data={weatherData} />
            <WeatherTable data={weatherData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
