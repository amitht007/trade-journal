import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  format,
  addDays,
  getDay,
  getYear,
  getMonth,
} from "date-fns";
import useCalendarStore from "../store/useCalendarStore"; // Import Zustand store
import "../index.css";

const Calendar = () => {
  const [currentDate] = useState(new Date());
  const year = getYear(currentDate);
  const months = Array.from({ length: 12 }, (_, i) => i);

  const { data, addEntry } = useCalendarStore(); // Access data and action to add new entries

  // Function to generate month grid
  const generateMonthGrid = (month) => {
    const startDay = startOfMonth(new Date(year, month));
    const endDay = endOfMonth(new Date(year, month));
    const monthStartDay = getDay(startDay);
    const totalDaysInMonth = endDay.getDate();
    const daysArray = [];

    // Add empty slots for previous month days
    for (let i = 0; i < monthStartDay; i++) {
      daysArray.push(null);
    }

    // Add actual days for the current month
    for (let i = 1; i <= totalDaysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }

    // Fill remaining slots for the next month
    while (daysArray.length < 42) {
      daysArray.push(null);
    }

    return daysArray;
  };

  // Example function to add a new entry (could be triggered by a form)
  const handleAddEntry = () => {
    const newEntry = {
      date_field: "05/02/2024", // Date in dd/MM/yyyy format
      pnl_field: 100, // Profit or Loss value
      note_field: "Example Note", // Example note
    };
    addEntry(newEntry); // Add entry to Zustand store
  };

  return (
    <div className="z-50 flex flex-col items-center no_scrollbar">
      <div className="flex overflow-x-scroll space-x-2 w-[1400px]">
        {months.map((month) => (
          <div
            key={month}
            className=" bg-black text-white shadow rounded min-w-[200px]"
          >
            <h3 className="text-6 font-semibold text-center ">
              {format(new Date(year, month), "MMMM")}
            </h3>
            <div className="grid grid-cols-7">
              {generateMonthGrid(month).map((day, index) => {
                const dayString = day ? format(day, "dd/MM/yyyy") : null; // Format date as dd/MM/yyyy
                const entry = data.find((d) => d.date_field === dayString); // Match entry based on new format

                return (
                  <button
                    key={index}
                    className={`w-6 h-6 text-[14px]  ${
                      day && getMonth(day) === month
                        ? entry
                          ? entry.pnl_field > 0
                            ? "bg-green-200 text-black hover:bg-green-300"
                            : "bg-red-200 text-black hover:bg-red-300"
                          : "bg-[#0e0d0d] hover:bg-[#363232]"
                        : "bg-[#0e0d0d]"
                    } rounded`}
                  >
                    {day ? format(day, "d") : ""}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
