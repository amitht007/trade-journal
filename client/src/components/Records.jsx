import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// React Server Components
// import * as motion from "framer-motion/client";

const Records = ({ triggerToast, triggerToastWarn }) => {
  const date = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const indianDate = new Intl.DateTimeFormat("en-IN", options).format(date);

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
    // addMsg(`Record Added!`);

    triggerToast("Record Added to Database!"); // Reset the form fields
    setField({ date_field: indianDate, pnl_field: "", note_field: "" });
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
      <div className="flex flex-col text-black w-fit gap-1 ">
        <div className="w-full flex">
          <input
            className="border-black border-2 font-semibold rounded p-1 mr-1 lg:w-80 lg:h-16"
            type="text"
            name="date_field"
            placeholder={field.date_field ? field.date_field : "Add Date"}
            value={field.date_field}
            onChange={handleFieldChange}
          />
          <input
            className="border-black font-semibold border-2 rounded p-1 lg:w-80 lg:h-16"
            type="text"
            name="pnl_field"
            placeholder={field.pnl_field ? field.pnl_field : "Add PnL"}
            value={field.pnl_field}
            onChange={handleFieldChange}
          />
        </div>
        <textarea
          className="border-black border-2 rounded p-1 w-100 lg:w-160 min-h-10 lg:min-h-[200px]"
          type="text"
          id="text-area"
          name="note_field"
          placeholder={field.note_field ? field.note_field : "Add Note"}
          value={field.note_field}
          onChange={handleFieldChange}
          rows="4"
        />
        <motion.button
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.5 },
          }}
          whileTap={{ scale: 0.9 }}
          className="border-2 border-black p-1  rounded bg-white text-blue-900 font-semibold lg:min-h-20 hover:bg-blue-100 text-lg hover:text-[20px]"
          onClick={addField}
        >
          Click To Add Record
        </motion.button>
      </div>
    </div>
  );
};

export default Records;
