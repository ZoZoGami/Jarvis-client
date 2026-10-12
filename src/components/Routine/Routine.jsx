import React, { useState, useEffect, useCallback } from "react";
import useAuth from "../../hooks/useAuth";

const Routine = () => {
  const { user } = useAuth();
  const userEmail = user?.email;

  const timeSlots = ["8:00am", "9:30am", "11:00am", "12:30pm", "2:00pm", "3:30pm", "5:00pm"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Empty routine template
  const emptyRoutine = days.map(day => ({
    day,
    slots: timeSlots.map(time => ({ time, value: "" }))
  }));

  const [routineData, setRoutineData] = useState(emptyRoutine);
  const [editing, setEditing] = useState({ day: null, slotIndex: null });
  const [editValue, setEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Save routine to database
  const saveRoutine = useCallback(async () => {
    if (!userEmail) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/routines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          routine: routineData
        }),
      });
      
      if (response.ok) {
        console.log("Routine saved successfully");
      } else {
        console.error("Failed to save routine");
      }
    } catch (error) {
      console.error("Error saving routine:", error);
    }
  }, [userEmail, routineData]);

  // Fetch user's routine
  const fetchRoutine = async () => {
    if (!userEmail) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/routines/user/${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.routine) {
          // Ensure the routine has the correct structure
          const formattedRoutine = data.routine.map(dayData => ({
            ...dayData,
            slots: dayData.slots.map((slot, index) => ({
              time: timeSlots[index] || slot.time,
              value: slot.value || ""
            }))
          }));
          setRoutineData(formattedRoutine);
        }
      }
    } catch (error) {
      console.error("Error fetching routine:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutine();
  }, [userEmail]);

  // Auto-save when routineData changes (with debounce)
  useEffect(() => {
    if (userEmail && routineData !== emptyRoutine) {
      const timer = setTimeout(() => {
        saveRoutine();
      }, 1000); // 1 second debounce
      
      return () => clearTimeout(timer);
    }
  }, [routineData, userEmail, saveRoutine]);

  const handleEdit = (day, slotIndex) => {
    setEditing({ day, slotIndex });
    const dayData = routineData.find((d) => d.day === day);
    setEditValue(dayData.slots[slotIndex]?.value || "");
  };

  const handleSave = (day, slotIndex) => {
    const updatedData = routineData.map((d) => {
      if (d.day === day) {
        const updatedSlots = d.slots.map((slot, index) => 
          index === slotIndex 
            ? { ...slot, value: editValue }
            : slot
        );
        return { ...d, slots: updatedSlots };
      }
      return d;
    });
    
    setRoutineData(updatedData);
    setEditing({ day: null, slotIndex: null });
  };

  const handleDelete = (day, slotIndex) => {
    const updatedData = routineData.map((d) => {
      if (d.day === day) {
        const updatedSlots = d.slots.map((slot, index) => 
          index === slotIndex 
            ? { ...slot, value: "" }
            : slot
        );
        return { ...d, slots: updatedSlots };
      }
      return d;
    });
    
    setRoutineData(updatedData);
  };

  // Debug: Log routine data changes
  useEffect(() => {
    console.log("Routine data updated:", routineData);
  }, [routineData]);

  if (isLoading) {
    return (
      <div className="pt-24 px-8 bg-[#f6e7de] text-gray-800 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your routine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-8 bg-[#f6e7de] text-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Class Routine</h1>
        {userEmail && (
          <div className="text-right">
            <p className="text-gray-600">For: {userEmail}</p>
            <p className="text-sm text-gray-500">Double-click to edit, changes auto-save</p>
          </div>
        )}
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border-collapse rounded-lg shadow-md">
          <thead>
            <tr className="border-b bg-orange-500 text-white">
              <th className="px-6 py-3 text-left font-medium">Day</th>
              {timeSlots.map((time, index) => (
                <th key={index} className="px-6 py-3 text-left font-medium">
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {routineData.map((dayData, dayIndex) => (
              <tr key={dayIndex} className="border-b hover:bg-orange-50">
                <td className="px-6 py-4 font-medium sticky left-0 bg-white">
                  {dayData.day}
                </td>
                {dayData.slots.map((slot, slotIndex) => (
                  <td
                    key={slotIndex}
                    className="px-6 py-4 relative group min-w-[140px] hover:bg-orange-100 transition-colors"
                    onDoubleClick={() => handleEdit(dayData.day, slotIndex)}
                  >
                    {editing.day === dayData.day &&
                    editing.slotIndex === slotIndex ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="border border-gray-300 bg-white rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                          autoFocus
                          onBlur={() => handleSave(dayData.day, slotIndex)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleSave(dayData.day, slotIndex);
                            }
                          }}
                          placeholder="Enter course code..."
                        />
                      </div>
                    ) : (
                      <>
                        <div className="min-h-[24px] py-1">
                          {slot.value || (
                            <span className="text-gray-400 italic">Empty</span>
                          )}
                        </div>
                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                          <button
                            onClick={() => handleEdit(dayData.day, slotIndex)}
                            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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
                          {slot.value && (
                            <button
                              onClick={() => handleDelete(dayData.day, slotIndex)}
                              className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              title="Clear"
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
                          )}
                        </div>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
        <ul className="text-sm text-blue-600 space-y-1">
          <li>• Double-click on any time slot to edit</li>
          <li>• Press Enter or click away to save</li>
          <li>• Changes are automatically saved to your account</li>
          <li>• Click the edit icon to modify existing entries</li>
          <li>• Click the delete icon to clear a slot</li>
        </ul>
      </div>
    </div>
  );
};

export default Routine;