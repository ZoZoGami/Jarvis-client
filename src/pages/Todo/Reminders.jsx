import React, { useState, useEffect } from "react";
import { MdAddCircle, MdNotifications, MdAccessTime, MdCalendarToday } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const Reminders = () => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    type: "assignment",
    date: "",
    time: ""
  });

  // Fetch user's reminders
  const fetchReminders = async () => {
    if (!userEmail) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/reminders/user/${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setReminders(data);
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [userEmail]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReminder({
      ...newReminder,
      [name]: value
    });
  };

  // Combine date and time into datetime for backend
  const combineDateTime = (date, time) => {
    if (!date || !time) return null;
    return new Date(`${date}T${time}`).toISOString();
  };

  // Create or update reminder
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userEmail) {
      alert("Please log in to set reminders!");
      return;
    }

    const datetime = combineDateTime(newReminder.date, newReminder.time);
    if (!datetime) {
      alert("Please select both date and time!");
      return;
    }

    try {
      const url = editingReminder 
        ? `http://localhost:5000/api/reminders/${editingReminder._id}`
        : 'http://localhost:5000/api/reminders';
      
      const method = editingReminder ? 'PUT' : 'POST';
      const reminderData = {
        ...newReminder,
        email: userEmail,
        datetime: datetime
      };

      // Remove date and time fields since backend expects datetime
      delete reminderData.date;
      delete reminderData.time;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reminderData),
      });

      if (response.ok) {
        fetchReminders();
        setShowModal(false);
        setNewReminder({
          title: "",
          description: "",
          type: "assignment",
          date: "",
          time: ""
        });
        setEditingReminder(null);
      }
    } catch (error) {
      console.error("Error saving reminder:", error);
    }
  };

  // Toggle completion status
  const toggleCompletion = async (reminderId, completed) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reminders/${reminderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        fetchReminders();
      }
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };

  // Delete reminder
  const handleDelete = async (reminderId) => {
    if (!window.confirm("Are you sure you want to delete this reminder?")) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/reminders/${reminderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchReminders();
      }
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  // Edit reminder - split datetime into date and time
  const handleEdit = (reminder) => {
    const reminderDate = new Date(reminder.datetime);
    const date = reminderDate.toISOString().split('T')[0];
    const time = reminderDate.toTimeString().slice(0, 5); // HH:MM format

    setEditingReminder(reminder);
    setNewReminder({
      title: reminder.title,
      description: reminder.description || "",
      type: reminder.type,
      date: date,
      time: time
    });
    setShowModal(true);
  };

  // Get type color
  const getTypeColor = (type) => {
    switch (type) {
      case 'quiz': return 'bg-blue-100 text-blue-800';
      case 'assignment': return 'bg-green-100 text-green-800';
      case 'project': return 'bg-purple-100 text-purple-800';
      case 'exam': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Check if reminder is upcoming
  const isUpcoming = (datetime) => {
    return new Date(datetime) > new Date();
  };

  // Get time until reminder
  const getTimeUntil = (datetime) => {
    const reminderTime = new Date(datetime);
    const now = new Date();
    const diffMs = reminderTime - now;
    
    if (diffMs <= 0) return "Now";
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `in ${days}d ${hours}h`;
    if (hours > 0) return `in ${hours}h ${minutes}m`;
    return `in ${minutes}m`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <MdNotifications className="text-3xl text-orange-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Reminders</h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="text-4xl hover:text-orange-600 text-orange-500"
        >
          <MdAddCircle />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reminders.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <MdNotifications className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No reminders yet. Add your first reminder!</p>
            <p className="text-sm text-gray-400 mt-2">You'll get email notifications at the scheduled time</p>
          </div>
        ) : (
          reminders.map((reminder) => (
            <div
              key={reminder._id}
              className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                reminder.completed 
                  ? 'border-l-green-500 opacity-75' 
                  : isUpcoming(reminder.datetime) 
                    ? 'border-l-orange-500' 
                    : 'border-l-gray-500'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {reminder.title}
                  </h2>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getTypeColor(reminder.type)}`}>
                    {reminder.type}
                  </span>
                </div>

                {reminder.description && (
                  <p className="text-gray-600 mb-4">{reminder.description}</p>
                )}

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MdCalendarToday className="mr-2" />
                  <span>{formatDate(reminder.datetime)}</span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MdAccessTime className="mr-2" />
                  <span>{formatTime(reminder.datetime)}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className={`text-sm ${
                    isUpcoming(reminder.datetime) 
                      ? 'text-blue-600' 
                      : 'text-gray-400'
                  }`}>
                    {isUpcoming(reminder.datetime) 
                      ? getTimeUntil(reminder.datetime) 
                      : 'Past reminder'
                    }
                  </div>
                  
                  <label className="flex items-center cursor-pointer">
                    <span className="mr-2 text-sm text-gray-600">Done</span>
                    <input
                      type="checkbox"
                      checked={reminder.completed}
                      onChange={() => toggleCompletion(reminder._id, reminder.completed)}
                      className="h-5 w-5 text-orange-500 rounded focus:ring-orange-400"
                    />
                  </label>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(reminder)}
                    className="text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(reminder._id)}
                    className="text-red-600 hover:text-red-800 border border-red-600 hover:border-red-800 px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Reminder Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#f6e7de] rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingReminder(null);
                  setNewReminder({
                    title: "",
                    description: "",
                    type: "assignment",
                    date: "",
                    time: ""
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newReminder.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="e.g., Math Quiz, Final Project"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={newReminder.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional details about the reminder..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={newReminder.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                  <option value="project">Project</option>
                  <option value="exam">Exam</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newReminder.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={newReminder.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingReminder(null);
                    setNewReminder({
                      title: "",
                      description: "",
                      type: "assignment",
                      date: "",
                      time: ""
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  {editingReminder ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reminders;