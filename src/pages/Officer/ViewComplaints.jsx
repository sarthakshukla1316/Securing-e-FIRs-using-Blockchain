import React from "react";
import { Link } from "react-router-dom";

const ViewComplaints = () => {
  return (
    <div className="w-full h-full px-28 py-20">
      <div className="sidebar w-1/5">
        <ul>
          <li>
            <button>View all complaints</button>
          </li>
          <li>
            <button>Complaints with F.I.R.</button>
          </li>
          <li>
            <button>Complaints with N.C.R.</button>
          </li>
          <li>
            <button>View Discarded Complaints</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ViewComplaints;
