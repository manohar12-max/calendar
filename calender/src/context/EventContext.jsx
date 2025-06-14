import { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    try {
      const stored = localStorage.getItem("calendar-events");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events));
  }, [events]);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const addEvent = (date, event) => {
    const key = formatDate(date);
    setEvents((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), event],
    }));
  };

  const editEvent = (date, index, updatedEvent) => {
    const key = formatDate(date);
    setEvents((prev) => {
      const updatedEvents = [...(prev[key] || [])];
      updatedEvents[index] = updatedEvent;
      return {
        ...prev,
        [key]: updatedEvents,
      };
    });
  };

  const deleteEvent = (date, index) => {
    let key=date
    if(typeof(key)!=="string"){
        key = formatDate(date);
    }
    setEvents((prev) => {
      const updatedEvents = [...(prev[key] || [])];
      updatedEvents.splice(index, 1);
      return {
        ...prev,
        [key]: updatedEvents,
      };
    });
  };

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};
