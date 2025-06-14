import { useState, useEffect } from "react";
import { useEventContext } from "../context/EventContext";

export default function EventModal({ date, onClose, existingEvent = null, onSave = null }) {
 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const { addEvent } = useEventContext();

  useEffect(() => {
    if (existingEvent) {
      setTitle(existingEvent.title || "");
      setDescription(existingEvent.description || "");
      setTime(existingEvent.time || "");
    }
  }, [existingEvent]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const eventData = {
      title: title.trim(),
      description: description.trim(),
      time,
    };
    //run on editing save
    if (onSave) {
    
      onSave(eventData);
    } else {
      //run on new event add
      addEvent(date, eventData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold mb-4 text-purple-700">
          {existingEvent ? "Edit Event" : "Add Event"} – {date.toDateString()}
        </h3>

        <input
          type="text"
          placeholder="Event Title"
          className="w-full border p-2 mb-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description (optional)"
          className="w-full border p-2 mb-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="time"
          className="w-full border p-2 mb-4 rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-1 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1 bg-purple-600 text-white rounded"
          >
            {existingEvent ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
