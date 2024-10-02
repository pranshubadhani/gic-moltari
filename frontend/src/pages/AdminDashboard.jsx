import React, { useState, useEffect } from "react";
import {
  getEnrollments,
  addEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../services/apiService";
import Carousel from "../components/Carousel";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "../firebase.js";

const AdminDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [year, setYear] = useState("");
  const [numberOfStudents, setNumberOfStudents] = useState("");
  const [editId, setEditId] = useState(null);

  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const storage = getStorage(app);

  useEffect(() => {
    // Fetch photos from Firebase Storage on component mount
    const fetchPhotos = async () => {
      try {
        const storageRef = ref(storage, "photos");
        const list = await listAll(storageRef);
        const photos = await Promise.all(
          list.items.map((item) => {
            return getDownloadURL(item);
          })
        );
        setPhotos(photos);
      } catch (error) {
        setErrorMessage("Failed to load photos.");
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const data = await getEnrollments();
      setEnrollments(data);
    };

    fetchEnrollments();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("Please select a file.");
      return;
    }

    try {
      const storageRef = ref(storage, `photos/${file.name}`);
      await uploadBytes(storageRef, file);
      setFile(null);
      const list = await listAll(ref(storage, "photos"));
      console.log(list);
      const photos = await Promise.all(
        list.items.map((item) => {
          return getDownloadURL(item);
        })
      );
      setPhotos(photos);
    } catch (error) {
      setErrorMessage("Upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateEnrollment(editId, year, numberOfStudents);
    } else {
      await addEnrollment(year, numberOfStudents);
    }
    setYear("");
    setNumberOfStudents("");
    setEditId(null);
    const data = await getEnrollments();
    setEnrollments(data);
  };

  const handleEdit = (enrollment) => {
    setYear(enrollment.year);
    setNumberOfStudents(enrollment.numberOfStudents);
    setEditId(enrollment._id);
  };

  const handleDelete = async (id) => {
    await deleteEnrollment(id);
    const data = await getEnrollments();
    setEnrollments(data);
  };

  // const handlePhotoDelete = (id) => {
  //   setPhotos(photos.filter((photo) => photo._id !== id));
  // };

  const handlePhotoDelete = async (photoUrl) => {
    try {
      const storageRef = ref(storage, photoUrl);
      await deleteObject(storageRef);
      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo !== photoUrl)
      );
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to delete photo.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md border border-gray-300 mt-4">
        <h2 className="text-lg font-bold mb-2">Enrollments Data</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="year" className="block text-gray-700">
              Year
            </label>
            <input
              type="number"
              id="year"
              className="w-full px-4 py-2 border rounded mt-1"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numberOfStudents" className="block text-gray-700">
              Number of Students
            </label>
            <input
              type="number"
              id="numberOfStudents"
              className="w-full px-4 py-2 border rounded mt-1"
              value={numberOfStudents}
              onChange={(e) => setNumberOfStudents(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            {editId ? "Update" : "Add"} Enrollment
          </button>
        </form>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Number of Students</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment._id}>
                <td className="border px-4 py-2">{enrollment.year}</td>
                <td className="border px-4 py-2">
                  {enrollment.numberOfStudents}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(enrollment)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(enrollment._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      {/* Upload Photo */}
      <div className="p-6 bg-gray-100 rounded-lg shadow-md border border-gray-300 mt-4">
        <h2 className="text-lg font-bold mb-2">Photo Gallery</h2>
        <form onSubmit={handleUpload} className="mb-4">
          <input type="file" onChange={handleFileChange} />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Upload Photo
          </button>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Carousel
          photos={photos}
          isAdmin={true}
          onPhotoDelete={handlePhotoDelete}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
