
import React, { useState } from 'react';

const StickyNotes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Sticky Notes I', content: 'In A* search all the heuristic values should be admissible' },
    { id: 2, title: 'Sticky Notes II', content: 'Waterfall' },
    { id: 3, title: 'Sticky Notes III', content: 'Just Do It' }
  ]);

  const handleAddStickyNote = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;

    const newNote = {
      id: notes.length + 1,
      title,
      content,
    };

    setNotes([...notes, newNote]);
  };

  return (
    <div className='pt-6 px-8  text-black'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-semibold'>To-Do</h2>
        
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-2 gap-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-orange-500 p-4 rounded-md shadow-md">
              <h3 className="text-xl font-bold mb-2">{note.title}</h3>
              <p className="text-gray-300">{note.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Add New Sticky Note</h3>
        <form onSubmit={handleAddStickyNote} className="bg-gray-800 p-4 rounded-md shadow-md">
          <input 
            type="text" 
            name="title"
            placeholder="Sticky Note Title"
            className="w-full mb-4 p-2 bg-gray-700 text-white rounded-md"
            required 
          />
          <textarea
            name="content"
            placeholder="Sticky Note Content"
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            rows="4"
            required
          ></textarea>
          <button 
            type="submit" 
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md"
          >
            Add Sticky Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default StickyNotes;
