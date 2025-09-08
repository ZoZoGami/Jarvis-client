import React, { useState, useEffect } from "react";
import { MdAddCircle } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import DailyReminder from "./DailyReminder";

const Todo = () => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const userName = user?.displayName;

  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({
    title: "",
    todo: "",
    priority: "medium",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch todos for the current user only
  const fetchTodos = async () => {
  if (!userEmail) return;
  
  try {
    const response = await fetch(`http://localhost:5000/api/todos/user/${userEmail}`);
    const data = await response.json();
    setTodos(data);
  } catch (error) {
    console.error("Error fetching todos:", error);
    toast.error("Failed to fetch todos!");
  }
};

  useEffect(() => {
    fetchTodos();
  }, [userEmail]); // Refetch when userEmail changes

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTodo({
      ...currentTodo,
      [name]: value,
    });
  };

  // Add / Update Todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userEmail) {
      toast.error("Please log in to create todos!");
      return;
    }

    // Ensure title is not empty and include user email
    const todoToSave = {
      ...currentTodo,
      email: userEmail, // Automatically use authenticated user's email
      title: currentTodo.title.trim() || "Untitled Todo",
    };

    const url = isEditing
      ? `http://localhost:5000/api/todos/${currentTodo._id}`
      : "http://localhost:5000/api/todos";
    const method = isEditing ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoToSave),
      });
      const data = await response.json();

      if (isEditing) {
        setTodos(
          todos.map((todo) => (todo._id === currentTodo._id ? data : todo))
        );
        toast.success("Todo updated successfully!");
      } else {
        setTodos([...todos, data]);
        toast.success("Todo added successfully!");
      }

      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving todo:", error);
      toast.error("Failed to save todo!");
    }
  };

  // Delete Todo
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo!");
    }
  };

  // Edit Todo
  const handleEdit = (todo) => {
    setCurrentTodo({
      ...todo,
      title: todo.title || "",
    });
    setIsEditing(true);
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
    setCurrentTodo({
      title: "",
      todo: "",
      priority: "medium",
    });
    setIsEditing(false);
  };

  // Priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <DailyReminder />
      <ToastContainer />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">JARVIS Todo List</h1>
        <button
          onClick={() => setShowModal(true)}
          className="text-4xl hover:text-orange-600 text-orange-500"
        >
          <MdAddCircle />
        </button>
      </div>
      

      {/* Welcome message */}
      {userEmail && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            Welcome, <span className="font-semibold">{userName}</span>
          </p>
          <p className="text-sm text-blue-600">
            You have {todos.length} todo{todos.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Todo List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No todos yet. Add your first todo!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {todo.title?.trim() || "Untitled Todo"}
                  </h2>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getPriorityColor(
                      todo.priority
                    )}`}
                  >
                    {todo.priority}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{todo.todo}</p>
                <p className="mt-3 text-sm text-gray-500">
                  {todo.createdAt
                    ? new Date(todo.createdAt).toLocaleString()
                    : "No date"}
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#f6e7de] rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {isEditing ? "Edit Todo" : "Add New Todo"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              {/* Removed email input field */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={currentTodo.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Enter todo title"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="todo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description *
                </label>
                <textarea
                  id="todo"
                  name="todo"
                  rows="3"
                  value={currentTodo.todo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Enter todo description"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={currentTodo.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;