import { create } from "zustand";

// Zustand store to manage the calendar data
const useCalendarStore = create((set) => ({
  // Initial data (profit/loss data) in dd/MM/yyyy format
  data: [
    {
      date_field: "02/04/2024",
      pnl_field: 200,
      note_field: "Good performance",
    },
    { date_field: "05/04/2024", pnl_field: -150, note_field: "Market dropped" },
    { date_field: "10/04/2024", pnl_field: 100, note_field: "Moderate gain" },
    { date_field: "12/04/2024", pnl_field: -50, note_field: "Minor loss" },
    { date_field: "15/04/2024", pnl_field: 300, note_field: "Big profit" },
    {
      date_field: "18/04/2024",
      pnl_field: -100,
      note_field: "Unexpected loss",
    },
    { date_field: "21/04/2024", pnl_field: 250, note_field: "Strong recovery" },
    { date_field: "25/04/2024", pnl_field: -200, note_field: "Bad day" },
    { date_field: "28/04/2024", pnl_field: 150, note_field: "Solid close" },
  ],

  // Action to add a new entry
  addEntry: (newEntry) =>
    set((state) => ({
      data: [...state.data, newEntry], // Add new entry to the existing data
    })),
}));

export default useCalendarStore;
