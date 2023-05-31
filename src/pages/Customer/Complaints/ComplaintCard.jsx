import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ComplaintCard = ({ complaintData, index }) => {
  console.log('complaintData', complaintData);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const redirect = () => {
    if (user.role === 1) {
      console.log('officer');
      navigate(`/fir/status/${complaintData.aadhar}/${index}`);
    } else navigate(`/complaint/status/${complaintData.aadhar}/${index}`);
  };
  return (
    <div
      onClick={redirect}
      className="flex flex-col w-full gap-4 px-6 py-4 my-8 text-white transition-transform bg-gray-700 rounded shadow-md cursor-pointer">
      <div className="flex justify-between header">
        <p className="text-sm">
          <strong className="text-yellow-400 font-title">Complainee Aadhar Id</strong>{' '}
          <span className="ml-4 font-content">{complaintData.aadhar}</span>{' '}
        </p>
        <p>
          <strong className="text-yellow-400 font-title">Date</strong> :{' '}
          <span className=" font-content">{complaintData.date || new Date().toDateString()} </span>
        </p>
      </div>
      <div className="content">
        <div className="flex justify-between">
          <h2 className="text-2xl font-title">City: {complaintData.city.toUpperCase()}</h2>
          <h4 className="text-xl font-title">
            Police Station : Sector - {complaintData.policeStation}
          </h4>
        </div>
        <div className="px-1 py-2 my-4 text-black rounded-md font-title bg-slate-200">
          <strong className="font-content">Description</strong> : <br />
          {complaintData.complaintDescription}
        </div>
        <div className="flex gap-2">
          <h4 className="mb-2 text-lg leading-6 text-yellow-400 font-content">Status: </h4>
          <p className="text-lime-500">
            {complaintData.isValid === null
              ? 'Complaint not processed'
              : !complaintData.isValid
              ? 'Complaint Marked Invalid'
              : 'Complaint Marked valid'}
          </p>
        </div>

        {complaintData.isValid ? (
          <h4 className="text-lg leading-6 text-yellow-400 font-content">
            FIR Status:{' '}
            <p className="text-gray-400">
              {complaintData.isCognizible
                ? complaintData.firFiled === null
                  ? 'FIR not processed'
                  : !complaintData.firFiled
                  ? 'FIR Not Filed'
                  : 'FIR Filed'
                : 'Complaint not accessed'}
            </p>
          </h4>
        ) : null}
      </div>
      {/* <div className="flex justify-between text-lg footer font-title ">
                <button className="hover:text-yellow-400 hover:ring-1 hover:ring-yellow-600 rounded-md px-1 py-0.5">
                    View
                </button>
                <button className="hover:text-yellow-400 hover:ring-1 hover:ring-yellow-600 rounded-md px-1 py-0.5">
                    Upload Documents
                </button>
                <button className="hover:text-yellow-400 hover:ring-1 hover:ring-yellow-600 rounded-md px-1 py-0.5">
                    Link Witness
                </button>
            </div> */}
    </div>
  );
};

export default ComplaintCard;
