import React, { useEffect, useState } from "react";
import { getEnrollments } from "../services/apiService";

const EnrollmentTable = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await getEnrollments();
        setEnrollments(data);
      } catch (err) {
        setError("Failed to fetch enrollment data.");
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md w-">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        School Enrollment Data
      </h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-5 border-b text-center text-gray-700 font-medium">
                Year
              </th>
              <th className="py-3 px-5 border-b text-center text-gray-700 font-medium">
                Number of Students
              </th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr
                key={enrollment._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-5 border-b text-center text-gray-600">
                  {enrollment.year}
                </td>
                <td className="py-3 px-5 border-b text-center text-gray-600">
                  {enrollment.numberOfStudents}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollmentTable;
