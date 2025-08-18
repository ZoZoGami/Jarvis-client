import React, { useState, useEffect } from "react";
import { MdAddCircle } from "react-icons/md";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newLink, setNewLink] = useState({
    email: "",
    courseCode: "",
    link: "",
    description: "",
  });

  // Fetch all links
  const fetchLinks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/links");
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLink({
      ...newLink,
      [name]: value,
    });
  };

  // Create new link
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLink),
      });
      const data = await response.json();
      setLinks([...links, data]);
      setShowModal(false);
      setNewLink({
        email: "",
        courseCode: "",
        link: "",
        description: "",
      });
    } catch (error) {
      console.error("Error saving link:", error);
    }
  };

  // Delete link
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/links/${id}`, {
        method: "DELETE",
      });
      setLinks(links.filter((link) => link._id !== id));
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Course Links</h1>
        <button
          onClick={() => setShowModal(true)}
          className="text-4xl hover:text-orange-600 text-orange-500"
        >
          <MdAddCircle />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <div
            key={link._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {link.courseCode}
              </h2>
              {link.description && (
                <p className="mt-2 text-gray-600">{link.description}</p>
              )}
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-blue-600 hover:text-blue-800 break-words"
              >
                {link.link}
              </a>
              <p className="mt-3 text-sm text-gray-500">
                {new Date(link.createdAt).toLocaleString()}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleDelete(link._id)}
                  className="text-red-600 hover:text-red-800 border border-red-600 hover:border-red-800 px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Link Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#f6e7de] rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add New Link
              </h3>
              <button
                onClick={() => setShowModal(false)}
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
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newLink.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="courseCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Course Code
                </label>
                <input
                  type="text"
                  id="courseCode"
                  name="courseCode"
                  value={newLink.courseCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description (Optional)
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newLink.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Link URL
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={newLink.link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Links;
