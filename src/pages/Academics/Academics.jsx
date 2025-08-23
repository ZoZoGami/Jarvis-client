import React, { useState, useEffect } from 'react';
import { MdAddCircle, MdExpandMore, MdExpandLess } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const Academics = () => {
    const { user } = useAuth();
    const userEmail = user?.email;

    const [academicLinks, setAcademicLinks] = useState([]);
    const [groupedLinks, setGroupedLinks] = useState({});
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newLink, setNewLink] = useState({
        courseCode: '',
        link: '',
        description: ''
    });

    // Fetch academic links for the current user only
    const fetchAcademicLinks = async () => {
        if (!userEmail) return;
        
        try {
            const response = await fetch(`http://localhost:5000/api/academic-links/user/${userEmail}`);
            const data = await response.json();
            setAcademicLinks(data);
            
            // Group links by courseCode
            const grouped = data.reduce((acc, link) => {
                if (!acc[link.courseCode]) {
                    acc[link.courseCode] = [];
                }
                acc[link.courseCode].push(link);
                return acc;
            }, {});
            
            setGroupedLinks(grouped);
        } catch (error) {
            console.error('Error fetching academic links:', error);
        }
    };

    useEffect(() => {
        fetchAcademicLinks();
    }, [userEmail]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLink({
            ...newLink,
            [name]: value
        });
    };

    // Create new academic link
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userEmail) {
            alert("Please log in to add academic links!");
            return;
        }

        try {
            const linkToSave = {
                ...newLink,
                email: userEmail, // Automatically use authenticated user's email
            };

            const response = await fetch('http://localhost:5000/api/academic-links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(linkToSave),
            });
            const data = await response.json();
            fetchAcademicLinks(); // Refresh the list
            setShowModal(false);
            setNewLink({
                courseCode: '',
                link: '',
                description: ''
            });
        } catch (error) {
            console.error('Error saving academic link:', error);
        }
    };

    // Delete academic link
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/academic-links/${id}`, {
                method: 'DELETE'
            });
            fetchAcademicLinks(); // Refresh the list
        } catch (error) {
            console.error('Error deleting academic link:', error);
        }
    };

    // Toggle course expansion
    const toggleCourse = (courseCode) => {
        setExpandedCourse(expandedCourse === courseCode ? null : courseCode);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Academic Resources</h1>
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
                        Welcome, <span className="font-semibold">{userEmail}</span>
                    </p>
                    <p className="text-sm text-blue-600">
                        You have {academicLinks.length} academic resource{academicLinks.length !== 1 ? 's' : ''} across {Object.keys(groupedLinks).length} course{Object.keys(groupedLinks).length !== 1 ? 's' : ''}
                    </p>
                </div>
            )}

            <div className="space-y-4">
                {Object.keys(groupedLinks).length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No academic resources yet. Add your first link!</p>
                    </div>
                ) : (
                    Object.keys(groupedLinks).map((courseCode) => (
                        <div key={courseCode} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                            <button
                                onClick={() => toggleCourse(courseCode)}
                                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                            >
                                <h2 className="text-xl font-semibold text-gray-800">{courseCode}</h2>
                                {expandedCourse === courseCode ? (
                                    <MdExpandLess className="text-gray-500 text-2xl" />
                                ) : (
                                    <MdExpandMore className="text-gray-500 text-2xl" />
                                )}
                            </button>
                            
                            {expandedCourse === courseCode && (
                                <div className="px-6 pb-6 space-y-4">
                                    {groupedLinks[courseCode].map((link) => (
                                        <div key={link._id} className="border-t pt-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    {link.description && (
                                                        <p className="text-gray-700 mb-1">{link.description}</p>
                                                    )}
                                                    <a
                                                        href={link.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 break-words"
                                                    >
                                                        {link.link}
                                                    </a>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(link._id)}
                                                    className="text-red-600 hover:text-red-800 ml-4"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Added on {new Date(link.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Add Link Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#f6e7de] rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center border-b p-4">
                            <h3 className="text-lg font-semibold text-gray-800">Add New Academic Link</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4">
                            {/* Removed email input field */}
                            <div className="mb-4">
                                <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700 mb-1">
                                    Course Code *
                                </label>
                                <input
                                    type="text"
                                    id="courseCode"
                                    name="courseCode"
                                    value={newLink.courseCode}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    placeholder="e.g., CS101, MATH201"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={newLink.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Course materials, syllabus, assignments, etc."
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                                    Link URL *
                                </label>
                                <input
                                    type="url"
                                    id="link"
                                    name="link"
                                    value={newLink.link}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    placeholder="https://example.com/course-resources"
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

export default Academics;