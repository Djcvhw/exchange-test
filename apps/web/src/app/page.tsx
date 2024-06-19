'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import withAuth from '../utils/withAuth';
import { useAuthStore } from '../providers/auth-provider';
import Nav from '../components/Nav';

function Main() {
  const [mainData, setMainData] = useState({});
  const { isAuth, resetAuth } = useAuthStore((state) => state);
  console.log('Main', { isAuth });

  const fetchMainData = async () => {
    try {
      const response = await axios.get('/api/profile', {
        withCredentials: true,
      });
      setMainData(response.data);
    } catch (error) {
      // resetAuth();
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchMainData();
  }, [isAuth]);

  if (Object.keys(mainData).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center h-screen flex-col">
        <h1 className="text-2xl font-bold">Main</h1>
        <p>
          <strong>User:</strong> {mainData?.name}
        </p>
        <p>
          <strong>Phone:</strong> {mainData?.phone}
        </p>
      </div>
    </>
  );
}

export default withAuth(Main);
