import React from 'react';
import ComplaintCard from './ComplaintCard';
import { useCustomerComplaintsList } from '../../../api/customer/useCustomerComplaint';

const CustomerComplaintsList = () => {
  const { data, isLoading, isError } = useCustomerComplaintsList();

  return (
    <div className="w-full min-h-[20vh] px-4 py-2 pt-4 ">
      <h2 className="text-4xl font-bold font-title">Your Complaints</h2>
      <div
        id="complaintsContainer "
        className="grid grid-cols-2 gap-4">
        <ComplaintCard />
        <ComplaintCard />
      </div>
    </div>
  );
};

export default CustomerComplaintsList;
