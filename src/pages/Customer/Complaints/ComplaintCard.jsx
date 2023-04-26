import React from 'react';

const ComplaintCard = () => {
  return (
    <div className="w-full px-6 py-4 rounded flex flex-col gap-4 bg-gray-700 my-8 text-white shadow-md  transition-transform">
      <div className="header flex justify-between">
        <p className="text-sm">
          <strong className="text-yellow-400 font-title">Complaint ID:</strong>{' '}
          <span className="ml-4 font-content"> 3342k7mw234sd23</span>{' '}
        </p>
        <p>
          <strong className="text-yellow-400 font-title">Date</strong> :{' '}
          <span className=" font-content">{'23 Mar, 2023'} </span>
        </p>
      </div>
      <div className="content">
        <h2 className="text-2xl font-title mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, amet?
        </h2>
        <h4 className="text-lg leading-6 text-gray-400 font-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, impedit sapiente? Sit
          adipisci voluptates totam, animi ea eveniet accusamus fugiat, quae laudantium atque labore
          blanditiis non facere nostrum assumenda? Laudantium?
        </h4>
      </div>
      <div className="footer  text-lg font-title flex justify-between ">
        <button className="hover:text-yellow-400 hover:ring-1 hover:ring-yellow-600 rounded-md px-1 py-0.5">
          View
        </button>
        <button className="hover:text-yellow-400 hover:ring-1 hover:ring-yellow-600 rounded-md px-1 py-0.5">
          Upload Documents
        </button>
        <button className="hover:text-yellow-400 hover:ring-1 hover:ring-yellow-600 rounded-md px-1 py-0.5">
          Link Witness
        </button>
      </div>
    </div>
  );
};

export default ComplaintCard;
