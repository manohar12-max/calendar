import React, { useState } from "react";
import Calendar from "./Calendar";
import EventModal from "../modal/EventModal";
import ListModal from "../modal/ListModal";
import { useEventContext } from "../context/EventContext";

export default function CalendarContainer() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const [selectedDate, setSelectedDate] = useState(null);
  const [listDate, setListDate] = useState(null);

  const { events } = useEventContext();

  const goToPreviousMonth = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const goToNextMonth = () => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const openAddModal = (dateObj) => setSelectedDate(dateObj);
  const openListModal = (dateObj) => setListDate(dateObj);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-6">
    
      <div className="flex justify-between items-center w-full max-w-3xl mb-4">
        <button
          onClick={goToPreviousMonth}
          className="px-1 sm:px-3 py-1 bg-purple-200 text-purple-800 rounded cursor-pointer"
        >
          ← Prev
        </button>

        <h1 className="text-xl sm:text-2xl font-bold text-purple-700">
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h1>

        <button
          onClick={goToNextMonth}
          className="px-1 sm:px-3 py-1 bg-purple-200 text-purple-800 rounded cursor-pointer"
        >
          Next →
        </button>
      </div>

  
      <Calendar
        year={year}
        month={month}
        onDateClick={openAddModal}
        onViewClick={openListModal}
        events={events}
      />

    
      {selectedDate && (
        <EventModal date={selectedDate} onClose={() => setSelectedDate(null)} />
      )}

   
      {listDate && (
        <ListModal date={listDate} onClose={() => setListDate(null)} />
      )}
    </div>
  );
}
