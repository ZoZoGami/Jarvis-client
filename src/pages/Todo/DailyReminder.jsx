import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const DailyReminder = () => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const [todayClasses, setTodayClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get today's day name
  const getToday = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  };

  // Fetch user's routine and filter today's classes
  const fetchTodaysClasses = async () => {
    if (!userEmail) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/routines/user/${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.routine) {
          const today = getToday();
          const todayRoutine = data.routine.find(day => day.day === today);
          
          if (todayRoutine) {
            // Filter out empty slots and add current time info
            const classes = todayRoutine.slots
              .filter(slot => slot.value && slot.value.trim() !== "")
              .map(slot => ({
                ...slot,
                time: slot.time,
                course: slot.value,
                isUpcoming: isTimeUpcoming(slot.time)
              }));
            
            setTodayClasses(classes);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching today's classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if a class time is upcoming today
  const isTimeUpcoming = (timeStr) => {
    const now = new Date();
    const time = convertTimeToDate(timeStr);
    return time > now;
  };

  // Convert time string to Date object for today
  const convertTimeToDate = (timeStr) => {
    const [time, modifier] = timeStr.toLowerCase().split(/(am|pm)/);
    let [hours, minutes] = time.split(':').map(Number);
    
    if (modifier === 'pm' && hours !== 12) hours += 12;
    if (modifier === 'am' && hours === 12) hours = 0;
    
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Format time for display
  const formatTime = (timeStr) => {
    return timeStr.replace(':00', '');
  };

  // Get time until class
  const getTimeUntil = (timeStr) => {
    const classTime = convertTimeToDate(timeStr);
    const now = new Date();
    const diffMs = classTime - now;
    
    if (diffMs <= 0) return "Ongoing";
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `in ${hours}h ${minutes}m`;
    return `in ${minutes}m`;
  };

  useEffect(() => {
    fetchTodaysClasses();
    
    // Refresh every minute to update time until
    const interval = setInterval(fetchTodaysClasses, 60000);
    return () => clearInterval(interval);
  }, [userEmail]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const today = getToday();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-orange-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          📚 Today's Classes ({today})
        </h2>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>

      {todayClasses.length === 0 ? (
        <div className="text-center py-6">
          <div className="text-4xl mb-3">🎉</div>
          <p className="text-gray-600 font-medium">No classes scheduled for today!</p>
          <p className="text-sm text-gray-500 mt-1">Enjoy your free day!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todayClasses.map((classItem, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                classItem.isUpcoming 
                  ? "bg-blue-50 border-blue-200" 
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {classItem.course}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatTime(classItem.time)}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    classItem.isUpcoming 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-green-100 text-green-800"
                  }`}>
                    {classItem.isUpcoming ? "Upcoming" : "Ongoing/Completed"}
                  </div>
                  {classItem.isUpcoming && (
                    <p className="text-xs text-gray-500 mt-1">
                      {getTimeUntil(classItem.time)}
                    </p>
                  )}
                </div>
              </div>
              
              {classItem.isUpcoming && (
                <div className="mt-3 pt-3 border-t border-blue-100">
                  <div className="flex items-center text-sm text-blue-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Starts {getTimeUntil(classItem.time)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Based on your routine • Auto-updates every minute
        </div>
      </div>
    </div>
  );
};

export default DailyReminder;