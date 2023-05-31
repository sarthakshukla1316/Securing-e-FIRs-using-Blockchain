import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { logout } from '../../http';
import { removeAuth } from '../../store/authSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const FileFIR = () => {
  const navigate = useNavigate();
  const { aadhar, id } = useParams();
  const initialState = {
    id: null,
    aadhar: null,
    city: '',
    pincode: '',
    complaintDescription: '',
    isValid: null, //boolean
    reason: '',
    isCognizible: null, //boolean
    chargesheet: '',
    firFiled: null, //boolean
  };
  const [complaint, setComplaint] = useState(initialState);
  const [filed, setFiled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleIsValid = (value, name) => {
    if (filed) {
      toast.error('FIR has been filed, cannot change status now');
    }
    const newComp = complaint;
    newComp[name] = value;
    newComp.reason = value ? '' : complaint.reason;
    if (name === 'isValid' && !value) {
      newComp.firFiled = false;
    }
    setComplaint({ ...newComp });
  };
  console.log(complaint);

  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    const response = await logout();
    if (response.status === 205) {
      removeAuth();
      navigate('/');
    }
  };
  const fetch = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/customer/complaints/${aadhar}/${id}`)
      .then((response) => {
        const complaintDocument = response.data[8];

        const newComp = JSON.parse(complaintDocument);
        console.log(newComp);
        setFiled(newComp.firFiled);
        setComplaint(newComp);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch();
  }, [aadhar]);

  const handleForm = (event) => {
    const { name, value } = event.target;
    if (name === 'isCognizible') {
      if (filed) {
        toast.error('FIR has been filed, cannot change status now');
        return;
      }
      setComplaint({
        ...complaint,
        [name]: value === 'true',
        reason: value ? '' : complaint.reason,
      });
      return;
    }
    setComplaint({ ...complaint, [name]: value });
  };

  const hanldeSubmit = () => {
    console.log(complaint);
    setLoading(true);
    axios
      .post('http://localhost:5000/api/customer/updateFIRDocument', {
        aadhar,
        id,
        complaintDocument: complaint,
      })
      .then(() => {
        fetch();
        setError(null);
        setSuccess('Complaint status updated successfully');
      })
      .catch(() => {
        setError('Some error occured');
        setSuccess(null);
      })
      .finally(() => setLoading(false));
  };

  const hanldeFieldClick = () => {
    if (filed) {
      toast.error('FIR has been filed, cannot change status now');
    }
  };

  return (
    <div>
      <div className="flex w-screen h-screen text-gray-700">
        <div className="flex flex-col w-56 border-r border-gray-300">
          <button className="relative text-sm focus:outline-none group">
            <div className="flex items-center justify-between w-full h-16 px-4 border-b border-gray-300 hover:bg-gray-300">
              <span className="text-2xl font-semibold font-title">Dashboard</span>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white shadow-lg font-title group-focus:flex">
              <a
                className="w-full px-4 py-2 text-left hover:bg-gray-300"
                href="#">
                Menu Item 1
              </a>
              <a
                className="w-full px-4 py-2 text-left hover:bg-gray-300"
                href="#">
                Menu Item 1
              </a>
              <a
                className="w-full px-4 py-2 text-left hover:bg-gray-300"
                href="#">
                Menu Item 1
              </a>
            </div>
          </button>
          <div className="flex flex-col flex-grow font-title  min-w-[500px]  p-4 overflow-auto">
            <a
              className="flex items-center flex-shrink-0 h-10 px-3 mt-auto text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
              href="#"
              onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-300">
            <h1 className="text-lg font-medium">Welcome, Officer #{user?.officerID}</h1>
            <button className="flex items-center justify-center h-10 px-4 ml-auto text-sm font-medium text-white bg-gray-600 rounded"></button>
            {/* <button className="flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"></button> */}
            <button className="relative ml-2 text-sm focus:outline-none group"></button>
          </div>
          <div className="flex-grow p-6 overflow-auto bg-white">
            <div className="flex h-[100vh]  justify-center items-center bgImg">
              <section className="flex justify-center items-centre shadow-xl bg-[#fff] w-full h-full">
                <div className="w-full h-full px-6 text-gray-800">
                  <div className="flex flex-row justify-center w-full h-full mb-12 overflow-y-auto md:mb-0">
                    <form
                      action=""
                      className="w-[80%] mt-12 mb-3">
                      <h2 className="mb-3 text-4xl font-bold font-title">Update Complaint</h2>
                      <div className="flex flex-wrap mt-10 mb-6">
                        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                          <label
                            className="block mb-2 text-sm font-bold tracking-wide text-gray-700 font-content"
                            htmlFor="grid-first-name">
                            City
                          </label>
                          <p>{complaint.city}</p>
                        </div>
                        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                          <label
                            className="block mb-2 text-sm font-bold tracking-wide text-gray-700 font-content"
                            htmlFor="grid-first-name">
                            Pincode
                          </label>
                          <p>{complaint?.pincode}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap mb-5">
                        <div className="w-full px-3 mb-6 md:mb-0">
                          <label
                            className="block mb-2 text-sm font-bold tracking-wide text-gray-700 font-content"
                            htmlFor="grid-last-name">
                            Complaint Description
                          </label>
                          <p className="px-3 py-3 bg-gray-200">{complaint?.complaintDescription}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap mb-2">
                        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                          <input
                            // className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type={'checkbox'}
                            maxLength="6"
                            defaultChecked={complaint.isValid}
                            disabled={filed}
                            onChange={(event) => handleIsValid(event.target.checked, 'isValid')}
                            onClick={hanldeFieldClick}
                          />
                          <label
                            className="mb-2 ml-2 text-sm font-bold tracking-wide text-gray-700 "
                            htmlFor="grid-last-name">
                            Is Complaint valid
                          </label>
                        </div>
                      </div>
                      {!complaint.isValid ? (
                        <div className="flex flex-wrap px-3 mb-2">
                          <label
                            className="block mb-2 text-sm font-bold tracking-wide text-gray-700 "
                            htmlFor="grid-last-name">
                            Reason
                          </label>
                          <textarea
                            id="message"
                            rows="4"
                            name="reason"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your reason description here..."
                            onChange={handleForm}
                            defaultValue={complaint.reason}></textarea>
                          {/* <p className="text-sm italic text-red-500">
                                        Please fill out this field.
                                    </p> */}
                        </div>
                      ) : (
                        <>
                          <h2 className="mt-3 text-4xl font-bold font-title">
                            Proceed with complaint
                          </h2>
                          <br />
                          <div className="mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                              <h4 className="w-full mb-3 font-bold">Select a complaint type</h4>
                            </div>
                            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                              <input
                                // className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name"
                                type={'radio'}
                                name={'isCognizible'}
                                value={true}
                                onChange={handleForm}
                                defaultChecked={complaint.isCognizible}
                                disabled={filed}
                                onClick={hanldeFieldClick}
                              />
                              <label
                                className="ml-2 text-sm font-bold tracking-wide text-gray-700 "
                                htmlFor="grid-first-name">
                                Cognizible
                              </label>
                            </div>
                            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                              <input
                                // className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name"
                                type={'radio'}
                                name={'isCognizible'}
                                value={false}
                                onChange={handleForm}
                                defaultChecked={complaint.isCognizible === false}
                                disabled={filed}
                                onClick={hanldeFieldClick}
                              />
                              <label
                                className="ml-2 text-sm font-bold tracking-wide text-gray-700 "
                                htmlFor="grid-first-name">
                                Non-Cognizible
                              </label>
                            </div>
                          </div>
                          {complaint.isCognizible === null ? null : !complaint.isCognizible ? (
                            <div className="flex flex-wrap px-3 mb-2">
                              <label
                                className="block mb-2 text-sm font-bold tracking-wide text-gray-700 "
                                htmlFor="grid-last-name">
                                Reason For complaint being incognizible
                              </label>
                              <textarea
                                id="message"
                                rows="4"
                                name="reason"
                                className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write your reason description here..."
                                onChange={handleForm}
                                defaultValue={complaint.reason}></textarea>
                              {/* <p className="text-sm italic text-red-500">
                                                Please fill out this field.
                                            </p> */}
                            </div>
                          ) : (
                            <>
                              <div className="flex flex-wrap mb-2">
                                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                                  <input
                                    // className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name"
                                    type={'checkbox'}
                                    maxLength="6"
                                    placeholder="PIN Code"
                                    onChange={(event) =>
                                      handleIsValid(event.target.checked, 'firFiled')
                                    }
                                    disabled={filed}
                                    defaultChecked={complaint.firFiled}
                                    onClick={hanldeFieldClick}
                                  />
                                  <label
                                    className="mb-2 ml-2 text-sm font-bold tracking-wide text-gray-700 "
                                    htmlFor="grid-last-name">
                                    Mark FIR Filed
                                  </label>
                                </div>
                              </div>
                              {complaint.firFiled ? (
                                <div className="flex flex-wrap px-3 mt-3 mb-2">
                                  <label
                                    className="block mb-2 text-sm font-bold tracking-wide text-gray-700 "
                                    htmlFor="grid-last-name">
                                    Create a chargesheet
                                  </label>
                                  <textarea
                                    id="message"
                                    rows="4"
                                    name="chargesheet"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your reason description here..."
                                    onChange={handleForm}
                                    defaultValue={complaint.chargesheet}></textarea>
                                </div>
                              ) : null}
                            </>
                          )}
                        </>
                      )}
                      <div className="mb-8 text-center lg:text-left">
                        <button
                          type="button"
                          className="w-full inline-block px-7 py-3 bg-[#174793] text-white font-medium text-lg leading-snug  rounded shadow-md hover:bg-[#16325d] hover:shadow-lg focus:bg-[#174793] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#174793] active:shadow-lg transition duration-150 ease-in-out"
                          onClick={hanldeSubmit}>
                          {loading ? 'Updating....' : 'Save'}
                        </button>
                        {/* <p className="mt-2" style={{ color: "red" }}>
                                    {error || ""}
                                </p> */}
                        <p
                          className="mt-2"
                          style={{ color: 'blue' }}>
                          {success || ''}
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      {/* <a
        className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-4 mr-4 text-blue-100 bg-blue-600 rounded-full shadow-lg hover:bg-blue-600"
        href="https://twitter.com/lofiui"
        target="_top"
      >
        <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
      </a> */}
    </div>
  );
};

export default FileFIR;
