import React, { useState } from 'react';
import { usePostComplaint, useGetComplaint } from '../api/customer/useCustomerComplaint';

const FileComplaint = () => {
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [policeStation, setPoliceStation] = useState('');
  const [complaintType, setComplaintType] = useState(null);
  const [description, setDescription] = useState('');
  const [complaintDocument, setComplaintDocument] = useState(null);
  const [securityPIN, setSecurityPIN] = useState('');

  const { createComplaint, createComplaintLoading } = usePostComplaint();

  const complaintSubmitHandler = () => {
    //TODO : Use form data in case of document upload case
    // const complaintFormData = new FormData();
    // complaintFormData.append('city', city);
    // complaintFormData.append('pincode', pincode);
    // complaintFormData.append('policeStation', policeStation);
    // complaintFormData.append('complaintType', complaintType);
    // complaintFormData.append('description', description);
    // complaintFormData.append('complaintDocument', complaintDocument);

    const complaintDataObject = {
      city,
      pincode,
      policeStation,
      description,
    };

    createComplaint(complaintDataObject);
  };

  return (
    <div className="flex h-[100vh] w-[100vw] justify-center items-center bgImg">
      <section class="flex justify-center items-centre shadow-xl bg-[#fff] w-full h-full">
        <div class="px-6 h-full text-gray-800  w-full">
          <div class=" flex flex-row justify-center mb-12 md:mb-0 overflow-y-auto w-full h-full mt-6">
            <form enctype="multipart/form-data">
              <h2 className="text-4xl font-bold mb-3">File Complaint</h2>
              <p class="text-lg text-[#aca9a9] font-semibold mt-4 mb-3 pt-1">
                Fill In Complaint Details.
              </p>
              <div class="flex flex-wrap mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name">
                    City
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                  <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name">
                    PIN Code
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type={'number'}
                    maxLength="6"
                    placeholder="PIN Code"
                    name="pinCode"
                    onChange={(e) => setPincode(e.target.value)}
                    value={pincode}
                  />
                </div>
              </div>
              <div class="flex flex-wrap mb-2">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state">
                    Police Station
                  </label>
                  <div class="relative">
                    <select
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="policeStation"
                      onChange={(e) => setPoliceStation(e.target.value)}
                      value={policeStation}>
                      <option value="62">Sector 62</option>
                      <option value="55">Sector 55</option>
                      <option value="120">Sector 120</option>
                      <option value="130">Sector 130</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap mb-2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name">
                  Complaint Description
                </label>
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your complaint description here..."
                  name="complaintDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}></textarea>
                <p class="text-red-500 text-xs italic">Please fill out this field.</p>
              </div>
              {/* <div class="flex flex-wrap mb-2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name">
                  Security PIN
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  name="securityPIN"
                  type="text"
                  value={securityPIN}
                  onChange={(e) => setSecurityPIN(e.target.value)}
                  placeholder="Security PIN"
                />
                <p class="text-red-500 text-xs italic">Please fill out this field.</p>
              </div>
              <div class="flex flex-wrap mb-2 px-3">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input">
                  Upload file
                </label>
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  name="complaintDocument"
                  type="file"
                  onChange={(event) => setComplaintDocument(event.target.files[0])}
                  // value={complaintDocument}
                />
                <p
                  class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help">
                  PNG, JPG
                </p>
              </div> */}
              <div class="text-center lg:text-left mb-8">
                <button
                  type="button"
                  class="w-full inline-block px-7 py-3 bg-[#174793] text-white font-medium text-lg leading-snug uppercase rounded shadow-md hover:bg-[#16325d] hover:shadow-lg focus:bg-[#174793] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#174793] active:shadow-lg transition duration-150 ease-in-out"
                  onClick={complaintSubmitHandler}>
                  {createComplaintLoading ? 'Saving...' : 'Submit Complaint'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FileComplaint;
