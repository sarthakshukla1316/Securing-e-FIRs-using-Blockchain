import api from '../../http/index';
import { useQuery } from 'react-query';

// const COMPLAINT_TYPES = {
//   NCR: "ncr",
//   FIR: "fir",
//   DISCARDED: "discarded",
// };

const fetchComplaintsAPI = () => {
  return api.get('/api/officer/complaints');
};

const useOfficerComplaint = () => {
  const { data: complaintsData, isLoading: complaintsDataLoading } = useQuery(
    '',
    fetchComplaintsAPI
  );

  return {
    complaintsData,
    complaintsDataLoading,
  };
};

export default useOfficerComplaint;
