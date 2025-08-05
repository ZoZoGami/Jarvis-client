import React from 'react';

const Routine = () => {
  return (
    <div className='pt-24 px-8 bg-[#f6e7de] text-gray-800'>
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
            <tr className="border-b hover:bg-orange-50">
              <td className="px-6 py-4 font-medium">Sunday</td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
            </tr>
            <tr className="border-b hover:bg-orange-50">
              <td className="px-6 py-4 font-medium">Monday</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
            </tr>
            <tr className="border-b hover:bg-orange-50">
              <td className="px-6 py-4 font-medium">Tuesday</td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
            </tr>
            <tr className="border-b hover:bg-orange-50">
              <td className="px-6 py-4 font-medium">Wednesday</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
            </tr>
            <tr className="border-b hover:bg-orange-50">
              <td className="px-6 py-4 font-medium">Thursday</td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
            </tr>
            <tr className="border-b hover:bg-orange-50">
              <td className="px-6 py-4 font-medium">Friday</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
            </tr>
            <tr className="hover:bg-orange-50">
              <td className="px-6 py-4 font-medium">Saturday</td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Cse470(7H-28C)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Routine;