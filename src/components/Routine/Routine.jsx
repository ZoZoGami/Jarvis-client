// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Routine = () => {
//   const [routine, setRoutine] = useState([]);

// //   useEffect(() => {
// //     // Fetch routine from backend API
// //     axios.get('/api/routines')
// //       .then(response => setRoutine(response.data))
// //       .catch(error => console.log(error));
// //   }, []);

//   return (
//     <div className='pt-24'>
//       <h2>Your Routine</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Course</th>
//             <th>Room</th>
//             <th>Day</th>
//             <th>Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {routine.map((item) => (
//             <tr key={item._id}>
//               <td>{item.courseTitle}</td>
//               <td>{item.room}</td>
//               <td>{item.day}</td>
//               <td>{item.time}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Routine;
import React from 'react';

const Routine = () => {
  return (
    <div className='pt-24 px-8 bg-gray-900 text-white'>
      
      <div className="mt-8">
        <table className="min-w-full bg-gray-800 border-collapse">
          <thead>
            <tr className="border-b bg-gray-700">
              <th className="px-4 py-2 text-left text-gray-400">Day</th>
              <th className="px-4 py-2 text-left text-gray-400">8:00am</th>
              <th className="px-4 py-2 text-left text-gray-400">9:30am</th>
              <th className="px-4 py-2 text-left text-gray-400">11:00am</th>
              <th className="px-4 py-2 text-left text-gray-400">12:30pm</th>
              <th className="px-4 py-2 text-left text-gray-400">2:00pm</th>
              <th className="px-4 py-2 text-left text-gray-400">3:30pm</th>
              <th className="px-4 py-2 text-left text-gray-400">5:00pm</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-900">
              <td className="px-4 py-2 text-gray-300">Sunday</td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
            </tr>
            <tr className="bg-gray-800">
              <td className="px-4 py-2 text-gray-300">Monday</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
            </tr>
            <tr className="bg-gray-900">
              <td className="px-4 py-2 text-gray-300">Tuesday</td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
            </tr>
            <tr className="bg-gray-800">
              <td className="px-4 py-2 text-gray-300">Wednesday</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
            </tr>
            <tr className="bg-gray-900">
              <td className="px-4 py-2 text-gray-300">Thursday</td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
            </tr>
            <tr className="bg-gray-800">
              <td className="px-4 py-2 text-gray-300">Friday</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
            </tr>
            <tr className="bg-gray-900">
              <td className="px-4 py-2 text-gray-300">Saturday</td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
              <td className="px-4 py-2 text-gray-300"></td>
              <td className="px-4 py-2 text-gray-300">Cse470(7H-28C)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Routine;

