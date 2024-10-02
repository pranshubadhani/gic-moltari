// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";

import Carousel from "../components/Carousel";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import app from "../firebase.js";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const storage = getStorage(app);
  useEffect(() => {
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
        console.log(error);
        setErrorMessage("Failed to load photos.");
      }
    };

    fetchPhotos();
  }, []);
  return (
    <div>
      <Header />
      <section className="p-8 text-center bg-f2e9e4">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Carousel photos={photos} isAdmin={false} />
      </section>
    </div>
  );
};

export default Home;
