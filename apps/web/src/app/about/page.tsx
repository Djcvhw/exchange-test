'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../../components/Nav';

function AboutPage() {
  const [aboutData, setAboutData] = useState({});

  useEffect(() => {
    const fetchAboutData = async () => {
      const response = await axios.get('/api/about');
      setAboutData(response.data);
    };

    fetchAboutData();
  }, []);
  if (Object.keys(aboutData).length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Nav />
      <div
        className="flex justify-center items-center h-screen bg-cover text-white"
        style={{ backgroundImage: `url(${aboutData.image})` }}
      >
        <div className="p-6 rounded shadow-md w-96">
          <h1 className="text-xl font-bold mb-4">About Us</h1>
          <p>{aboutData.content}</p>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
