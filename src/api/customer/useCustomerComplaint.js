import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import api from "../../http";

const COMPLAINT_TYPES = {
  NCR: "ncr",
  FIR: "fir",
  DISCARDED: "discarded",
};

const createComplaintAPI = (data) => {
  return api({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "post",
    url: "/customer/complaint",
    data: data,
  });
};

const useCustomerComplaints = () => {
  const { mutate: createComplaint, isLoading: createComplaintLoading } =
    useMutation(createComplaintAPI, {
      onSuccess: () => {
        alert("Complaint Saved");
      },
    });
  return {
    createComplaint,
    createComplaintLoading,
  };
};

export default useCustomerComplaints;
