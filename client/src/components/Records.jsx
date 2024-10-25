import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "flowbite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCalendarStore from "../store/useCalendarStore";

// React Server Components
// import * as motion from "framer-motion/client";

const Records = ({ triggerToast, triggerToastWarn }) => {
  const date = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const indianDate = new Intl.DateTimeFormat("en-IN", options).format(date);
  const [startDate, setStartDate] = useState(new Date());

  const { data, addEntry } = useCalendarStore(); // Access data and action to add new entries

  const [fields, setFields] = useState([
    { date_field: "", pnl_field: "", note_field: "" },
  ]);
  const [field, setField] = useState({
    date_field: indianDate,
    pnl_field: "",
    note_field: "",
  });

  // Handle adding a new field
  const addField = (e) => {
    e.preventDefault();
    if (!field.date_field || !field.pnl_field || !field.note_field) {
      triggerToastWarn("Fill All the Fields!");
      return;
    }

    const newFields = [
      ...fields,
      {
        date_field: field.date_field,
        pnl_field: field.pnl_field,
        note_field: field.note_field,
      },
    ];

    // Update state and save to localStorage
    setFields(newFields);
    localStorage.setItem("fields", JSON.stringify(newFields)); // Save to localStorage

    addEntry({
      date_field: field.date_field,
      pnl_field: field.pnl_field,
      note_field: field.note_field,
    });

    triggerToast("Record Added to Database!"); // Reset the form fields
    setField({ date_field: indianDate, pnl_field: "", note_field: "" });
  };

  const handleDateChange = (date) => {
    const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(
      date
    );
    setStartDate(date);
    setField((prevField) => ({
      ...prevField,
      date_field: formattedDate, // Update date_field with the selected date
    }));
  };
  // Handle field changes
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setField((prevField) => ({
      ...prevField,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="flex flex-col w-fit gap-1 text-white">
        <div className="w-full flex flex-col  md:flex-row">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            className="w-full bg-black h-16 border-[#5d5d5d] border-b-2 mb-2 md:mb-0 text-2xl p-4 font-semibold mr-1 lg:w-80 lg:h-16 tracking-widest"
            dateFormat="dd/MM/yyyy"
          />
          <input
            className="border-[#5d5d5d] mb-1 border-b-2 bg-[#000000] text-2xl p-4 font-semibold  mr-1 lg:w-80 lg:h-16 w-full"
            type="text"
            name="pnl_field"
            placeholder={field.pnl_field ? field.pnl_field : "ADD PNL"}
            value={field.pnl_field}
            onChange={handleFieldChange}
          />
        </div>
        <textarea
          className="mb-1 border-b-2 bg-[#000000] text-2xl p-4 font-semibold w-100 lg:w-160 min-h-10 lg:min-h-[200px]"
          type="text"
          id="text-area"
          name="note_field"
          placeholder={field.note_field ? field.note_field : "ADD NOTE"}
          value={field.note_field}
          onChange={handleFieldChange}
          rows="4"
        />
        <div className="w-full flex flex-col gap-y-2 md:flex-row justify-between">
          <motion.button
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.5 },
            }}
            whileTap={{ scale: 0.9 }}
            className="border-2 border-black p-1 py-4 w-full  rounded bg-[#efefee] text-[#000000] font-semibold lg:min-h-20 hover:bg-green-400 text-2xl "
            onClick={addField}
          >
            Click To Add Record
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.5 },
            }}
            whileTap={{ scale: 0.9 }}
            className="border-2 border-[#383838] py-4 w-full rounded bg-[#151515] text-white font-semibold lg:min-h-20 hover:bg-red-400 hover:text-black text-2xl "
            onClick={() => {
              setField({
                date_field: indianDate,
                pnl_field: "",
                note_field: "",
              });
            }}
          >
            Clear Fields
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Records;
