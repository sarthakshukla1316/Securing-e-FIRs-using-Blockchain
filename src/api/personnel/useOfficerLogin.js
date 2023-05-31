import { useNavigate } from 'react-router-dom';
import api from '../../http/index';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../store/authSlice';
const officerLoginAPI = (loginObj) => {
  return api.post('/api/officer/login', loginObj);
};

const useOfficerLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    mutate: officerLoginHandler,
    isLoading: officerLoginLoading,
    isError: officerLoginError,
  } = useMutation(officerLoginAPI, {
    onSuccess: (data) => {
      dispatch(setAuth({ user: data.data.data }));
      navigate('/dashboard');
    },
  });

  return {
    officerLoginHandler,
    officerLoginLoading,
    officerLoginError,
  };
};

export default useOfficerLogin;
