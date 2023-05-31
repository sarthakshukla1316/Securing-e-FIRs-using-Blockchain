import React from 'react';
import { MdAdd } from 'react-icons/md';

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeAuth } from '../../store/authSlice';
import { logout } from '../../http';
import CustomerComplaintsList from './Complaints/CustomerComplaintsList';

import { useGetComplaint } from '../../api/customer/useCustomerComplaint';

const CustomerDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await logout();
    if (response.status === 205) {
      removeAuth();
      navigate('/');
    }
  };

  return (
    <div>
      <div className="flex w-screen h-screen text-gray-700">
        <div className="flex flex-col w-56 border-r border-gray-300">
          <button className="relative text-sm focus:outline-none group">
            <div className="flex items-center justify-between w-full h-16 px-4 border-b border-gray-300 hover:bg-gray-300">
              <span className="text-2xl font-semibold font-title">Dashboard</span>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white shadow-lg font-title group-focus:flex"></div>
          </button>
          <div className="flex flex-col flex-grow font-title  min-w-[500px]  p-4 overflow-auto">
            {/* <a
              className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
              href="#">
              <span className="leading-none font-title">Item 1</span>
            </a>
            <a
              className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
              href="#">
              <span className="leading-none font-title">Item 2</span>
            </a>
            <a
              className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
              href="#">
              <span className="leading-none font-title">Item 3</span>
            </a>
            <a
              className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
              href="#">
              <span className="leading-none font-title">Item 4</span>
            </a>
            <a
              className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
              href="#">
              <span className="leading-none font-title">Item 5</span>
            </a>
            <a
              className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
              href="#">
              <span className="leading-none font-title">Item 6</span>
            </a> */}
            <a
              className="flex items-center flex-shrink-0 h-10 px-3 mt-auto text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
              href="#"
              onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-300">
            <h1 className="text-lg font-medium">Welcome, {user?.name}</h1>
            <button className="flex items-center justify-center h-10 px-4 ml-auto text-sm font-medium text-white bg-gray-600 rounded">
              <MdAdd
                fontSize={'18px'}
                className="mr-1"
              />{' '}
              <Link to="/complaint/new">New Complaint</Link>
            </button>
            {/* <button className="flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"></button> */}
            <button className="relative ml-2 text-sm focus:outline-none group">
              <div className="flex items-center justify-between w-10 h-10 rounded hover:bg-gray-300">
                <svg
                  className="w-5 h-5 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </div>
              {/* <div className="absolute right-0 flex-col items-start hidden w-40 pb-1 bg-white border border-gray-300 shadow-lg group-focus:flex">
                <a
                  className="w-full px-4 py-2 text-left hover:bg-gray-300"
                  href="#"
                >
                  Menu Item 1
                </a>
                <a
                  className="w-full px-4 py-2 text-left hover:bg-gray-300"
                  href="#"
                >
                  Menu Item 1
                </a>
                <a
                  className="w-full px-4 py-2 text-left hover:bg-gray-300"
                  href="#"
                >
                  Menu Item 1
                </a>
              </div> */}
            </button>
          </div>
          <div className="flex-grow p-6 overflow-auto bg-white">
            <CustomerComplaintsList />
          </div>
        </div>
      </div>
      {/* <a
        className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-4 mr-4 text-blue-100 bg-blue-600 rounded-full shadow-lg hover:bg-blue-600"
        href="https://twitter.com/lofiui"
        target="_top"
      >
        <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
      </a> */}
    </div>
  );
};

export default CustomerDashboard;
