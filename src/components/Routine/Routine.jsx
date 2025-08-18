import React, { useState } from "react";

const Routine = () => {
  const [routineData, setRoutineData] = useState([
    {
      day: "Sunday",
      slots: [
        { time: "8:00am", value: "Cse470(7H-28C)" },
        { time: "9:30am", value: "" },
        { time: "11:00am", value: "Cse470(7H-28C)" },
        { time: "12:30pm", value: "" },
        { time: "2:00pm", value: "Cse470(7H-28C)" },
        { time: "3:30pm", value: "" },
        { time: "5:00pm", value: "Cse470(7H-28C)" },
      ],
    },
    {
      day: "Monday",
      slots: [
        { time: "8:00am", value: "" },
        { time: "9:30am", value: "Cse470(7H-28C)" },
        { time: "11:00am", value: "" },
        { time: "12:30pm", value: "Cse470(7H-28C)" },
        { time: "2:00pm", value: "" },
        { time: "3:30pm", value: "Cse470(7H-28C)" },
        { time: "5:00pm", value: "" },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { time: "8:00am", value: "Cse470(7H-28C)" },
        { time: "9:30am", value: "" },
        { time: "11:00am", value: "Cse470(7H-28C)" },
        { time: "12:30pm", value: "" },
        { time: "2:00pm", value: "Cse470(7H-28C)" },
        { time: "3:30pm", value: "" },
        { time: "5:00pm", value: "Cse470(7H-28C)" },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { time: "8:00am", value: "" },
        { time: "9:30am", value: "Cse470(7H-28C)" },
        { time: "11:00am", value: "" },
        { time: "12:30pm", value: "Cse470(7H-28C)" },
        { time: "2:00pm", value: "" },
        { time: "3:30pm", value: "Cse470(7H-28C)" },
        { time: "5:00pm", value: "" },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { time: "8:00am", value: "Cse470(7H-28C)" },
        { time: "9:30am", value: "" },
        { time: "11:00am", value: "Cse470(7H-28C)" },
        { time: "12:30pm", value: "" },
        { time: "2:00pm", value: "Cse470(7H-28C)" },
        { time: "3:30pm", value: "" },
        { time: "5:00pm", value: "Cse470(7H-28C)" },
      ],
    },
    {
      day: "Friday",
      slots: [
        { time: "8:00am", value: "" },
        { time: "9:30am", value: "Cse470(7H-28C)" },
        { time: "11:00am", value: "" },
        { time: "12:30pm", value: "Cse470(7H-28C)" },
        { time: "2:00pm", value: "" },
        { time: "3:30pm", value: "Cse470(7H-28C)" },
        { time: "5:00pm", value: "" },
      ],
    },
    {
      day: "Saturday",
      slots: [
        { time: "8:00am", value: "Cse470(7H-28C)" },
        { time: "9:30am", value: "" },
        { time: "11:00am", value: "Cse470(7H-28C)" },
        { time: "12:30pm", value: "" },
        { time: "2:00pm", value: "Cse470(7H-28C)" },
        { time: "3:30pm", value: "" },
        { time: "5:00pm", value: "Cse470(7H-28C)" },
      ],
    },
  ]);

  const [editing, setEditing] = useState({ day: null, slotIndex: null });
  const [editValue, setEditValue] = useState("");

  const handleEdit = (day, slotIndex) => {
    if (day === "Friday") return; // Prevent editing Friday
    setEditing({ day, slotIndex });
    setEditValue(routineData.find((d) => d.day === day).slots[slotIndex].value);
  };

  const handleSave = (day, slotIndex) => {
    if (day === "Friday") return; // Prevent saving Friday
    const updatedData = routineData.map((d) => {
      if (d.day === day) {
        const updatedSlots = [...d.slots];
        updatedSlots[slotIndex] = {
          ...updatedSlots[slotIndex],
          value: editValue,
        };
        return { ...d, slots: updatedSlots };
      }
      return d;
    });
    setRoutineData(updatedData);
    setEditing({ day: null, slotIndex: null });
  };

  const handleDelete = (day, slotIndex) => {
    if (day === "Friday") return; // Prevent deleting Friday
    const updatedData = routineData.map((d) => {
      if (d.day === day) {
        const updatedSlots = [...d.slots];
        updatedSlots[slotIndex] = { ...updatedSlots[slotIndex], value: "" };
        return { ...d, slots: updatedSlots };
      }
      return d;
    });
    setRoutineData(updatedData);
  };

  return (
    <div className="pt-24 px-8 bg-[#f6e7de] text-gray-800">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Class Routine</h1>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border-collapse rounded-lg shadow-md">
          <thead>
            <tr className="border-b bg-orange-500 text-white">
              <th className="px-6 py-3 text-left font-medium">Day</th>
              <th className="px-6 py-3 text-left font-medium">8:00am</th>
              <th className="px-6 py-3 text-left font-medium">9:30am</th>
              <th className="px-6 py-3 text-left font-medium">11:00am</th>
              <th className="px-6 py-3 text-left font-medium">12:30pm</th>
              <th className="px-6 py-3 text-left font-medium">2:00pm</th>
              <th className="px-6 py-3 text-left font-medium">3:30pm</th>
              <th className="px-6 py-3 text-left font-medium">5:00pm</th>
            </tr>
          </thead>
          <tbody>
            {routineData.map((dayData, dayIndex) => (
              <tr key={dayIndex} className="border-b hover:bg-orange-50">
                <td className="px-6 py-4 font-medium">{dayData.day}</td>
                {dayData.slots.map((slot, slotIndex) => (
                  <td
                    key={slotIndex}
                    className={`px-6 py-4 relative group ${
                      dayData.day === "Friday" ? "bg-gray-100" : ""
                    }`}
                    onDoubleClick={() => handleEdit(dayData.day, slotIndex)}
                  >
                    {editing.day === dayData.day &&
                    editing.slotIndex === slotIndex ? (
                      <div className="flex">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="border bg-white rounded px-2 py-1 w-1/2"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSave(dayData.day, slotIndex)}
                          className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        {slot.value}
                        {dayData.day !== "Friday" && (
                          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                            <button
                              onClick={() => handleEdit(dayData.day, slotIndex)}
                              className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                              title="Edit"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(dayData.day, slotIndex)
                              }
                              className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                              title="Delete"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Routine;
