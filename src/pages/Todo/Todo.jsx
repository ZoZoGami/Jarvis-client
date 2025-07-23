import React, { useState } from "react";
import {  MdAddCircle } from "react-icons/md";

const Card = ({ title, content, onDelete, onEdit, canDelete }) => {
  return (
    <div className="relative bg-white rounded-2xl p-4 shadow-md w-full min-h-[120px]">
      <h2 className="text-xs font-bold text-orange-500 uppercase mb-2">{title}</h2>
      {canDelete && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-500 text-xs underline hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 text-xs underline hover:text-red-700"
          >
            Delete
          </button>
        </div>
      )}
      <p className="text-sm text-black whitespace-pre-wrap mt-1">{content}</p>
    </div>
  );
};

export default function Todo() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Today's Class",
      content: "\u2022 Cse422 11:00am 8H-22C\n\u2022 Cse470 12:30pm 7H-27C",
    },
    {
      id: 2,
      title: "Reminders",
      content:
        "\u2022 Cse422 lab assignment submission (Time left: 0hr 6 mins)\n\u2022 Cse470 project idea submission (Time left: 5hr 25 mins)",
    },
    {
      id: 3,
      title: "Sticky Notes I",
      content:
        "In A* search all the heuristic values should be admissible",
    },
    {
      id: 4,
      title: "Sticky Notes II",
      content: "Waterfall",
    },
    {
      id: 5,
      title: "Sticky Notes III",
      content: "Just Do It.",
    },
  ]);

  const handleAdd = () => {
    const newNote = {
      id: Date.now(),
      title: `Sticky Notes ${notes.length + 1}`,
      content: "New note...",
    };
    setNotes([newNote, ...notes]);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (id) => {
    const newContent = prompt("Edit your note content:", notes.find(n => n.id === id).content);
    if (newContent !== null) {
      setNotes(notes.map(n => n.id === id ? { ...n, content: newContent } : n));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8e8df] p-6 font-sans">
      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className=" text-4xl hover:text-orange-600 text-orange-500  "
        >
          < MdAddCircle />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Card
            key={note.id}
            title={note.title}
            content={note.content}
            onDelete={() => handleDelete(note.id)}
            onEdit={() => handleEdit(note.id)}
            canDelete={!note.title.includes("Today's Class") && !note.title.includes("Reminders")}
          />
        ))}
      </div>
    </div>
  );
}
