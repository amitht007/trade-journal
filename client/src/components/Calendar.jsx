import React, { useState, useEffect, useRef } from "react";
import {
  startOfMonth,
  endOfMonth,
  format,
  addDays,
  getDay,
  getYear,
  getMonth,
  subMonths,
} from "date-fns";

// Sample profit/loss data for random dates in 2024
const data = [
  { date_field: "04/02/2024", pnl_field: 200, note_field: "Good performance" },
  { date_field: "04/05/2024", pnl_field: -150, note_field: "Market dropped" },
  { date_field: "04/10/2024", pnl_field: 100, note_field: "Moderate gain" },
  { date_field: "04/12/2024", pnl_field: -50, note_field: "Minor loss" },
  { date_field: "04/15/2024", pnl_field: 300, note_field: "Big profit" },
  { date_field: "04/18/2024", pnl_field: -100, note_field: "Unexpected loss" },
  { date_field: "04/21/2024", pnl_field: 250, note_field: "Strong recovery" },
  { date_field: "04/25/2024", pnl_field: -200, note_field: "Bad day" },
  { date_field: "04/28/2024", pnl_field: 150, note_field: "Solid close" },
];

const Calendar = () => {
  const [currentDate] = useState(new Date()); // Current date set to today
  const year = getYear(currentDate);
  const currentMonthRef = useRef(null);
  // Create an array of month numbers (0 = January, 11 = December)
  const months = Array.from({ length: 12 }, (_, i) => i);

  // Function to generate a grid for each month
  const generateMonthGrid = (month) => {
    const startDay = startOfMonth(new Date(year, month));
    const endDay = endOfMonth(new Date(year, month));
    const monthStartDay = getDay(startDay); // Day of the week the month starts on
    const totalDaysInMonth = endDay.getDate();

    const daysArray = [];

    // Add null for days from the previous month to fill the first week
    for (let i = 0; i < monthStartDay; i++) {
      daysArray.push(null); // Empty placeholder
    }

    // const prevMonth = subMonths(startDay, 1);
    // const prevMonthEndDay = endOfMonth(prevMonth);
    // for (let i = monthStartDay; i > 0; i--) {
    //   daysArray.push(
    //     new Date(
    //       getYear(prevMonth),
    //       getMonth(prevMonth),
    //       prevMonthEndDay.getDate() - (i - 1)
    //     )
    //   );
    // }

    // Add actual days for the current month
    for (let i = 1; i <= totalDaysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }

    // Fill the remaining slots to make exactly 35 cells (5 weeks)
    while (daysArray.length < 42) {
      daysArray.push(null); // Empty placeholder for the next month
    }

    return daysArray;
  };

  return (
    <div className="z-50 flex flex-col items-center">
      {/* <h1 className="text-2xl font-bold text-center mb-6">
        {year} Year Calendar
      </h1> */}

      <div className="flex overflow-x-scroll space-x-2 w-[80%]">
        {months.map((month) => (
          <div key={month} className=" bg-white shadow rounded min-w-[200px]">
            <h3 className="text-6 font-semibold text-center ">
              {format(new Date(year, month), "MMMM")}
            </h3>
            <div className=" grid grid-cols-7 ">
              {generateMonthGrid(month).map((day, index) => {
                // Format the day as MM/dd/yyyy to match the data format
                const dayString = day ? format(day, "MM/dd/yyyy") : null;
                const entry = data.find((d) => d.date_field === dayString);

                return (
                  <button
                    key={index}
                    className={` w-8 h-8  ${
                      getMonth(day) === month
                        ? entry
                          ? entry.pnl_field > 0
                            ? "bg-green-200 hover:bg-green-300" // Profit (Green)
                            : "bg-red-200 hover:bg-red-300" // Loss (Red)
                          : "bg-gray-200 hover:bg-gray-300" // No data
                        : "bg-gray-100"
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
