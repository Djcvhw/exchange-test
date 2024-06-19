'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../../components/Nav';
import { common } from 'common-types';

const initialState = {
  image: '',
  content: ''
}

function AboutPage() {
  const [aboutData, setAboutData] = useState<common['AboutContent']>(initialState);

  useEffect(() => {
    const fetchAboutData = async () => {
      const response = await axios.get('/api/about');
      setAboutData(response.data);
    };

    fetchAboutData();
  }, []);

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
