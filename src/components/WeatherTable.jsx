import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const WeatherTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  const displayRows = data.time
    .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
    .map((time, index) => (
      <tr key={index} className="hover:bg-gray-100">
        <td className="border px-4 py-2 text-center">{time}</td>
        <td className="border px-4 py-2 text-center">
          {data.temperature_2m_max[index]}
        </td>
        <td className="border px-4 py-2 text-center">
          {data.temperature_2m_min[index]}
        </td>
        <td className="border px-4 py-2 text-center">
          {data.temperature_2m_mean[index]}
        </td>
      </tr>
    ));

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">
        Weather Data Table
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-4 py-2 text-center">Time</th>
              <th className="border px-4 py-2 text-center">Max Temp (°C)</th>
              <th className="border px-4 py-2 text-center">Min Temp (°C)</th>
              <th className="border px-4 py-2 text-center">Mean Temp (°C)</th>
            </tr>
          </thead>
          <tbody>{displayRows}</tbody>
        </table>
      </div>
      <ReactPaginate
        pageCount={Math.ceil(data.time.length / rowsPerPage)}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName="flex justify-center mt-6 space-x-2"
        pageClassName="border rounded-full px-3 py-1 hover:bg-blue-500 hover:text-white"
        activeClassName="bg-blue-500 text-white"
        previousClassName="border rounded-full px-3 py-1 hover:bg-blue-500 hover:text-white"
        nextClassName="border rounded-full px-3 py-1 hover:bg-blue-500 hover:text-white"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default WeatherTable;
