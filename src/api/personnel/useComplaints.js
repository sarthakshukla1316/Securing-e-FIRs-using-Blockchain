import axios from "axios";
import { useQuery } from "react-query";

const COMPLAINT_TYPES = {
  NCR: "ncr",
  FIR: "fir",
  DISCARDED: "discarded",
};

const fetchComplaintsAPI = () => {
  return axios.get("/officer/complaints?type");
};

const useComplaints = ({ enabled }) => {
  const [complaintType, setComplaintType] = useState(null);

  const { data: complaintsData, isLoading: complaintsDataLoading } = useQuery(
    "",
    {
      enabled,
    }
  );

  return {
    complaintType,
    setComplaintType,
    complaintsData,
    complaintsDataLoading,
  };
};

export default useComplaints;
