// const API_URL = 'http://localhost:5000/api';

const API_URL = 'https://gic-moltari.onrender.com/api';

export const loginAdmin = async (username, password) => {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
  }
  return { status: response.ok, data };
};

const getAuthToken = () => localStorage.getItem("token");

export const getEnrollments = async () => {
  const response = await fetch(`${API_URL}/enrollments`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch enrollments");
  }
  return response.json();
};

export const addEnrollment = async (year, numberOfStudents) => {
  const response = await fetch(`${API_URL}/enrollments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ year, numberOfStudents }),
  });
  if (!response.ok) {
    throw new Error("Failed to add enrollment");
  }
  return response.json();
};

export const updateEnrollment = async (id, year, numberOfStudents) => {
  const response = await fetch(`${API_URL}/enrollments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ year, numberOfStudents }),
  });
  if (!response.ok) {
    throw new Error("Failed to update enrollment");
  }
  return response.json();
};

export const deleteEnrollment = async (id) => {
  const response = await fetch(`${API_URL}/enrollments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete enrollment");
  }
  return response;
};

export const uploadPhoto = async (formData) => {
  const response = await fetch(`${API_URL}/photo/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Upload failed");
  }
  return response.json();
};

export const getPhotos = async () => {
  const response = await fetch(`${API_URL}/photo/fetch`, {});
  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }
  return response.json();
};

export const deletePhoto = async (id) => {
  const response = await fetch(`${API_URL}/photo/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error("Delete failed");
  }
  return response.json();
};
