import React from 'react';
import logo from '../../assets/logo.png';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useOfficerLogin from '../../api/personnel/useOfficerLogin';
import Loader from '../../components/Loader/Loader';

const OfficerLogin = () => {
  // const [officerID, setOfficerID] = useState('');
  // const [password, setPassword] = useState('');
  const { register, handleSubmit } = useForm();
  const { officerLoginHandler, officerLoginError, officerLoginLoading } = useOfficerLogin();

  if (officerLoginError) {
    toast.error('Something went wrong');
  }

  const officerLoginSubmitHandler = (data) => {
    for (let input in data) {
      if (data[input].length === 0) {
        toast.warn('Fill all the fields');
        return;
      }
    }
    officerLoginHandler(data);
  };

  return (
    <div className="flex h-[100vh] w-[100vw] justify-center items-center bgImg ">
      <section class="h-90vh md:h-[74vh] w-[80vw] shadow-xl bg-[#F8F8F8] opacity-[0.9] rounded-lg">
        <div class="px-6 h-full text-gray-800">
          <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src={logo}
                className="w-[128px] md:w-[60%] mx-auto"
                alt="Police logo"
              />
            </div>
            <div class="xl:ml-10 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form action="">
                <h2 className="text-4xl font-bold ">Police Login</h2>
                <p class="text-lg text-[#aca9a9] font-semibold mb-8 pt-1">Enter your credentials</p>
                <div class="flex flex-wrap mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block  text-gray-700 text-xs font-bold mb-2"
                      htmlFor="officerIDInput">
                      Officer ID
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight  focus:outline-none focus:bg-white"
                      id="officerIDInput"
                      type="text"
                      {...register('officerID')}
                    />
                    {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                  </div>
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block  text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name">
                      Password
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="password"
                      {...register('password')}
                    />
                    {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                  </div>
                </div>
                <div class="flex flex-wrap mb-6 px-3">
                  <label
                    class="block  text-gray-700 text-xs font-bold mb-2"
                    for="officerIDInput">
                    Enter security key:
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight  focus:outline-none focus:bg-white"
                    id="officerIDInput"
                    type="text"
                    {...register('securityKey')}
                  />
                </div>
                <div class="text-center lg:text-left">
                  <button
                    type="button"
                    onClick={handleSubmit(officerLoginSubmitHandler)}
                    class="w-full inline-block px-7 py-3 bg-[#174793] text-white font-medium text-lg leading-snug  rounded shadow-md hover:bg-[#16325d] hover:shadow-lg focus:bg-[#174793] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#174793] active:shadow-lg transition duration-150 ease-in-out"
                    disabled={officerLoginLoading}>
                    {officerLoginLoading ? <Loader fontSize="20px" /> : 'Sign In'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OfficerLogin;
