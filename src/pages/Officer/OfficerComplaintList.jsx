import React, { useEffect, useState } from 'react';
import ComplaintCard from '../Customer/Complaints/ComplaintCard';

import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useOfficerComplaint from '../../api/personnel/useOfficerComplaint';
import Loader from '../../components/Loader/Loader';

const OfficerComplaintList = () => {
  const { complaintsData, complaintsDataLoading } = useOfficerComplaint();

  return (
    <div className="w-full min-h-[20vh] px-4 py-2 pt-4 ">
      <h2 className="text-4xl font-bold font-title">Complaints</h2>

      <div className="flex">
        {complaintsDataLoading ? (
          <Loader
            fontSize="60px"
            borderColor="red"
          />
        ) : (
          <div
            id="complaintsContainer "
            className="w-full gap-4">
            {complaintsData?.data.data
              .slice()
              .reverse()
              .map(({ complaint: complaintData, index }, id) => (
                <ComplaintCard
                  complaintData={complaintData}
                  key={id}
                  index={index}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficerComplaintList;
