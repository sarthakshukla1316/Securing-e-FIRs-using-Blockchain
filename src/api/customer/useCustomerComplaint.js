import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../../http';
import { toast } from 'react-toastify';

const COMPLAINT_TYPES = {
  NCR: 'ncr',
  FIR: 'fir',
  DISCARDED: 'discarded',
};

const postComplaintAPI = (data) => {
  return api.post('/api/customer/complaints', data);
};

const usePostComplaint = () => {
  const queryClient = useQueryClient('customer-complaints');
  const navigate = useNavigate();
  const {
    mutate: createComplaint,
    isLoading: createComplaintLoading,
    isSuccess,
  } = useMutation(postComplaintAPI, {
    onSuccess: (newComplaint) => {
      toast('Complaint Added');
      navigate('/');
      queryClient.setQueryData('customer-complaints', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, newComplaint.data.data],
        };
      });
    },
  });
  return {
    createComplaint,
    createComplaintLoading,
    isSuccess,
  };
};

const getCustomerComplaints = () => {
  return api.get('/customer/complaints');
};

const useGetComplaint = () => {
  return useQuery('customer-complaints', getCustomerComplaints);
};

export { useGetComplaint, usePostComplaint };
