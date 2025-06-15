import React, { useState } from "react";
import { useEventContext } from "../context/EventContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import EventModal from "./EventModal";

const ListModal = ({ date, onClose }) => {
  const { events, editEvent, deleteEvent } = useEventContext();
  const [editingIndex, setEditingIndex] = useState(null);

  const formattedDate = date.toISOString().split("T")[0];
  const eventList = events[formattedDate] || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const handleEdit = (event, index) => {
    setEditingIndex(index);
    setEventToEdit(event);
    setModalOpen(true);
  };

  const handleUpdate = (updatedEvent) => {
    editEvent(date, editingIndex, updatedEvent);
    setModalOpen(false);
    setEditingIndex(null);
    setEventToEdit(null);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(date, index);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-sm"
          >
            ✕
          </button>
          <h2 className="text-lg font-bold mb-4 text-purple-700 text-center">
            Events on {date.toDateString()}
          </h2>

          {eventList.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">
              No events added.
            </p>
          ) : (
            <ul className="space-y-3 max-h-64 overflow-y-auto">
              {[...eventList]
                .sort((a, b) => a.time.localeCompare(b.time)) 
                .map((event, index) => (
                  <li
                    key={index}
                    className="border rounded-lg p-3 bg-purple-50 shadow-sm flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-800">
                        {event.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {event.description}
                      </p>
                      <p className="text-xs text-purple-500 mt-1">
                        {event.time}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center ml-2">
                      <button
                        onClick={() => handleEdit(event, index)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {modalOpen && (
        <EventModal
          date={date}
          onClose={() => {
            setModalOpen(false);
            setEventToEdit(null);
            setEditingIndex(null);
          }}
          onSave={handleUpdate}
          existingEvent={eventToEdit}
          editIndex={editingIndex}
        />
      )}
    </>
  );
};

export default ListModal;
