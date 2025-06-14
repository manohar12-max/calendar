import { useGetArrayOfDays } from "../hooks/useGetArrayOfDays";
import { MdAdd, MdVisibility } from "react-icons/md";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({
  year,
  month,
  onDateClick,
  onViewClick,
  events,
}) {
  const { daysArray } = useGetArrayOfDays(year, month);

  return (
    <div className="w-full min-w-[300px] max-w-3xl mx-auto p-4 bg-purple-50 rounded-xl shadow-md">
      
      <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-3 text-purple-600 text-xs sm:text-sm">
        {daysOfWeek.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

   
      <div className="grid grid-cols-7 gap-2 text-xs sm:text-sm">
        {daysArray.map((day, i) => {
          const dateKey = day?.fullDate?.toISOString().split("T")[0];
          const dayEvents = events?.[dateKey] || [];
          const hasEvent = dayEvents.length > 0;

          return (
            <div
              key={i}
              className={`group relative h-24 sm:h-28 rounded-xl p-2 shadow-sm transition-all duration-200 flex flex-col justify-between items-center 
                ${
                  day?.isToday
                    ? "bg-purple-200 text-purple-900 font-bold border border-purple-500"
                    : "bg-white text-gray-800 border border-gray-200"
                } 
                ${!day ? "invisible" : ""}`}
            >
              <div
                className={`text-md font-semibold mb-1 ${
                  hasEvent
                    ? "text-white font-bold w-5 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-purple-500"
                    : ""
                }`}
              >
                {day?.date}
              </div>
              
                <div className="w-full flex flex-col items-center sm:flex-row justify-between ">
                
                  <button
                    className=" text-purple-600 hover:text-purple-900 pb-2 sm:pb-0 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDateClick(day.fullDate);
                    }}
                   
                  >
                    <MdAdd size={16} />
                  </button>

                  
                  <button
                    className=" text-purple-600 hover:text-purple-900 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewClick(day.fullDate);
                    }}
                    
                  >
                    <MdVisibility size={14} />
                  </button>
                </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}
