import React from "react";
import { useNavigate } from "react-router-dom";
import { useEventContext } from "../context/EventContext";


export default function HomePage() {
  const { events } = useEventContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex flex-col items-center gap-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 text-center">
        Welcome to Your Event Planner
      </h1>

      <div className="w-full max-w-md flex flex-col sm:flex-row sm:justify-center gap-4">
        <button
          onClick={() => navigate("/calendar")}
          className="w-full sm:w-auto px-8 py-4 text-lg sm:text-xl rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition duration-200 shadow-md"
        >
          🗓️ Open Full Calendar
        </button>

        <button
          onClick={() => navigate("/all-events")}
          className="w-full sm:w-auto px-8 py-4 text-lg sm:text-xl rounded-xl bg-purple-100 text-purple-800 hover:bg-purple-200 transition duration-200 shadow-md"
        >
          📋 View All Events
        </button>
      </div>
    </div>
  );
}
