'use client';
import { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import withAuth from '../../utils/withAuth';
import Nav from '../../components/Nav';
import PieChart from '../../components/PieChart';
import { chartData } from '../../utils/data';
import { CategoryScale } from 'chart.js';
import { Chart } from 'chart.js/auto';

Chart.register(CategoryScale);

const initialState = {
  balance: 0,
  transactions: 0
}

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(initialState);
  const [balance, setBalance] = useState(0);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard', {
        withCredentials: true,
      });
      setDashboardData(response.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleWithdraw = () => {
    if (balance > Number(dashboardData.balance)) {
      alert('Too big');
    } else if (balance > 0) {
      alert('Withdrawal successful');
    } else {
      alert('Insufficient balance');
    }
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center h-screen flex-col gap-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>
          <strong>Transactions:</strong> {dashboardData.transactions}
        </p>
        <p>
          <strong>Balance:</strong> {dashboardData.balance}
        </p>
        <div className="sm:col-span-3">
          <label
            htmlFor="withdraw"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Withdraw Balance
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="withdraw"
              id="withdraw"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="admin"
              onChange={(e: SyntheticEvent<HTMLInputElement>) =>
                setBalance(Number(e.currentTarget.value))
              }
              value={balance}
            />
          </div>
        </div>
        <button
          onClick={handleWithdraw}
          className="bg-green-500 text-white p-2 rounded"
        >
          Withdraw
        </button>
        <PieChart chartData={chartData} />
      </div>
    </>
  );
}

export default withAuth(DashboardPage);
