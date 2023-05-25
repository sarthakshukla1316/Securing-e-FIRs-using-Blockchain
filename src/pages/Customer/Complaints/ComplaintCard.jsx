import React from "react";
import { useNavigate } from "react-router-dom";

const ComplaintCard = ({ complaintData, index }) => {
    const navigate = useNavigate();

    const redirect = () => {
        navigate(`/complaint/status/${complaintData.aadhar}/${index}`);
    };
    return (
        <div
            onClick={redirect}
            className="w-full px-6 py-4 rounded flex flex-col gap-4 bg-gray-700 my-8 text-white shadow-md  transition-transform"
        >
            <div className="header flex justify-between">
                <p className="text-sm">
                    <strong className="text-yellow-400 font-title">
                        Complainee Aadhar Id
                    </strong>{" "}
                    <span className="ml-4 font-content">
                        {complaintData.aadhar}
                    </span>{" "}
                </p>
                <p>
                    <strong className="text-yellow-400 font-title">Date</strong>{" "}
                    :{" "}
                    <span className=" font-content">
                        {complaintData.date || new Date().toDateString()}{" "}
                    </span>
                </p>
            </div>
            <div className="content">
                <h2 className="text-2xl font-title mb-2">
                    City: {complaintData.city}
                </h2>
                <h4 className="text-lg text-yellow-400 mb-2 leading-6 font-content">
                    Status:{" "}
                    <p className="text-gray-400">
                        {complaintData.isValid === null
                            ? "Complaint not processed"
                            : !complaintData.isValid
                            ? "Complaint Marked Invalid"
                            : "Complaint Marked valid"}
                    </p>
                </h4>
                {complaintData.isValid ? (
                    <h4 className="text-lg text-yellow-400 leading-6 font-content">
                        FIR Status:{" "}
                        <p className="text-gray-400">
                            {complaintData.isCognizible
                                ? complaintData.firFiled === null
                                    ? "FIR not processed"
                                    : !complaintData.firFiled
                                    ? "FIR Not Filed"
                                    : "FIR Filed"
                                : "Complaint not accessed"}
                        </p>
                    </h4>
                ) : null}
            </div>
            {/* <div className="footer  text-lg font-title flex justify-between ">
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
