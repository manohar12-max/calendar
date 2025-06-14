import React, { useState } from "react";
import { useEventContext } from "../context/EventContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import EventModal from "../modal/EventModal";

const AllEvents = () => {
  const { events, editEvent, deleteEvent } = useEventContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editDate, setEditDate] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);

  
  const eventEntries = Object.entries(events).filter(([, list]) => list.length > 0);

 
  const filteredEntries = eventEntries
    .map(([date, list]) => {
      const filteredList = list.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filteredList.length ? [date, filteredList] : null;
    })
    .filter(Boolean);

 
  const handleEdit = (date, index, event) => {
    setEditDate(date);
    setEditIndex(index);
    setEventToEdit(event);
    setModalOpen(true);
  };

  
  const handleDelete = (date, index) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(date, index);
    }
  };

  
  const handleUpdate = (updatedEvent) => {
    
    editEvent(editDate, editIndex, updatedEvent);
    resetModalState();
  };


  const resetModalState = () => {
    setModalOpen(false);
    setEditDate(null);
    setEditIndex(null);
    setEventToEdit(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-4 text-center">
        All Scheduled Events
      </h1>

     
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {filteredEntries.length === 0 ? (
        <p className="text-center text-gray-500">No matching events found.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {filteredEntries.map(([date, list]) => (
            <div key={date} className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-purple-600 mb-2">
                📅 {new Date(date).toDateString()}
              </h2>
              <div className="space-y-3">
                {list.map((event, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-purple-400 pl-4 py-2 relative group bg-purple-50 rounded flex justify-between"
                  > 
                  <div>
                    <h3 className="font-semibold text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <p className="text-xs text-purple-500">⏰ {event.time}</p>
                  </div>
                    <div className=" flex gap-2  transition-opacity">
                      <button
                        onClick={() => handleEdit(date, index, event)}
                        className="text-blue-600 "
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(date, index)}
                        className="text-red-600 "
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

  
      {modalOpen && (
        <EventModal
          date={new Date(editDate)}
          existingEvent={eventToEdit}
          onSave={handleUpdate}
          onClose={resetModalState}
        />
      )}
    </div>
  );
};

export default AllEvents;
