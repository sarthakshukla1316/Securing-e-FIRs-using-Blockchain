import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../../http';

const COMPLAINT_TYPES = {
  NCR: 'ncr',
  FIR: 'fir',
  DISCARDED: 'discarded',
};

const postComplaintAPI = (data) => {
  return api({
    method: 'post',
    url: '/complaint',
    data: data,
  });
};

const usePostComplaint = () => {
  const queryClient = useQueryClient('customer-complaints');

  const { mutate: createComplaint, isLoading: createComplaintLoading } = useMutation(
    postComplaintAPI,
    {
      onSuccess: (newComplaint) => {
        queryClient.setQueryData('customer-complaints', (oldQueryData) => {
          return { ...oldQueryData, data: [...oldQueryData.data, newComplaint.data.data] };
        });
      },
    }
  );
  return {
    createComplaint,
    createComplaintLoading,
  };
};

const getCustomerComplaints = () => {
  return api.get('/customer/complaints');
};

const useGetComplaint = () => {
  return useQuery('customer-complaints', getCustomerComplaints);
};

export { useGetComplaint, usePostComplaint };
