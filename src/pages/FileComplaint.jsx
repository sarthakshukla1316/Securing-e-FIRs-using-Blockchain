import React, { useState } from "react";
import {
    usePostComplaint,
    useGetComplaint,
} from "../api/customer/useCustomerComplaint";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../http";
import { removeAuth } from "../store/authSlice";
import { MdAdd } from "react-icons/md";

const FileComplaint = () => {
    const user = useSelector((state) => state.auth.user);
    const { aadharNumber } = user || {};

    const initialState = {
        id: 133333,
        aadhar: aadharNumber,
        city: "",
        pincode: "",
        complaintDescription: "",
        isValid: null, //boolean
        reason: "",
        isCognizible: null, //boolean
        chargesheet: "",
        firFiled: null, //boolean
    };

    const [complaintDocument, setComplaintDocument] = useState(initialState);
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
        console.log(complaintDocument);
        complaintDocument.date = new Date().toDateString();
        const complaintDataObject = {
            complaintDocument,
        };

        createComplaint(complaintDataObject);
    };

    const handleForm = (event) => {
        const { name, value } = event.target;
        setComplaintDocument({ ...complaintDocument, [name]: value });
    };

    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await logout();
        if (response.status === 205) {
            removeAuth();
            navigate("/");
        }
    };

    return (
        <div>
            <div className="flex w-screen h-screen text-gray-700">
                <div className="flex flex-col w-56 border-r border-gray-300">
                    <button className="relative text-sm focus:outline-none group">
                        <div className="flex items-center justify-between w-full h-16 px-4 border-b border-gray-300 hover:bg-gray-300">
                            <span className=" text-2xl font-title font-semibold">
                                Dashboard
                            </span>
                            <svg
                                className="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="absolute z-10 flex-col items-start hidden w-full pb-1 font-title bg-white shadow-lg group-focus:flex">
                            <a
                                className="w-full px-4 py-2  text-left hover:bg-gray-300"
                                href="#"
                            >
                                Menu Item 1
                            </a>
                            <a
                                className="w-full px-4 py-2 text-left hover:bg-gray-300"
                                href="#"
                            >
                                Menu Item 1
                            </a>
                            <a
                                className="w-full px-4 py-2 text-left hover:bg-gray-300"
                                href="#"
                            >
                                Menu Item 1
                            </a>
                        </div>
                    </button>
                    <div className="flex flex-col flex-grow font-title  min-w-[500px]  p-4 overflow-auto">
                        {/* <a
                            className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
                            href="#"
                        >
                            <span className="leading-none font-title">
                                Item 1
                            </span>
                        </a> */}
                        {/* <a
                            className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
                            href="#"
                        >
                            <span className="leading-none font-title">
                                Item 2
                            </span>
                        </a> */}
                        {/* <a
                            className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
                            href="#"
                        >
                            <span className="leading-none font-title">
                                Item 3
                            </span>
                        </a> */}
                        {/* <a
                            className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
                            href="#"
                        >
                            <span className="leading-none font-title">
                                Item 4
                            </span>
                        </a> */}
                        {/* <a
                            className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
                            href="#"
                        >
                            <span className="leading-none font-title">
                                Item 5
                            </span>
                        </a> */}
                        {/* <a
                            className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300"
                            href="#"
                        >
                            <span className="leading-none font-title">
                                Item 6
                            </span>
                        </a> */}
                        <a
                            className="flex items-center flex-shrink-0 h-10 px-3 mt-auto text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
                            href="#"
                            onClick={handleLogout}
                        >
                            Logout
                        </a>
                    </div>
                </div>
                <div className="flex flex-col flex-grow">
                    <div className="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-300">
                        <h1 className="text-lg font-medium">
                            Welcome, {user?.name}
                        </h1>
                        <button className="flex items-center justify-center h-10 px-4 ml-auto text-sm font-medium rounded text-white bg-gray-600">
                            <MdAdd fontSize={"18px"} className="mr-1" />{" "}
                            <Link to="/complaint/new">New Complaint</Link>
                        </button>
                        {/* <button className="flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"></button> */}
                        <button className="relative ml-2 text-sm focus:outline-none group">
                            <div className="flex items-center justify-between w-10 h-10 rounded hover:bg-gray-300">
                                <svg
                                    className="w-5 h-5 mx-auto"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </div>
                            {/* <div className="absolute right-0 flex-col items-start hidden w-40 pb-1 bg-white border border-gray-300 shadow-lg group-focus:flex">
                <a
                  className="w-full px-4 py-2 text-left hover:bg-gray-300"
                  href="#"
                >
                  Menu Item 1
                </a>
                <a
                  className="w-full px-4 py-2 text-left hover:bg-gray-300"
                  href="#"
                >
                  Menu Item 1
                </a>
                <a
                  className="w-full px-4 py-2 text-left hover:bg-gray-300"
                  href="#"
                >
                  Menu Item 1
                </a>
              </div> */}
                        </button>
                    </div>
                    <div className="flex-grow p-6 overflow-auto bg-white">
                        <div className="flex h-full w-full justify-center items-center bgImg">
                            <section class="flex justify-center items-centre shadow-xl bg-[#fff] w-full h-full">
                                <div class="px-6 h-full text-gray-800  w-full">
                                    <div class=" flex flex-row justify-center mb-12 md:mb-0 overflow-y-auto w-full h-full mt-6">
                                        <form enctype="multipart/form-data">
                                            <h2 className="text-4xl font-bold mb-3">
                                                File Complaint
                                            </h2>
                                            <p class="text-lg text-[#aca9a9] font-semibold mt-4 mb-3 pt-1">
                                                Fill In Complaint Details.
                                            </p>
                                            <div class="flex flex-wrap mb-6">
                                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label
                                                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        for="grid-first-name"
                                                    >
                                                        City
                                                    </label>
                                                    <input
                                                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                        id="grid-first-name"
                                                        type="text"
                                                        name="city"
                                                        placeholder="City"
                                                        onChange={handleForm}
                                                    />
                                                    <p class="text-red-500 text-xs italic">
                                                        Please fill out this
                                                        field.
                                                    </p>
                                                </div>
                                                <div class="w-full md:w-1/2 px-3">
                                                    <label
                                                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        for="grid-last-name"
                                                    >
                                                        PIN Code
                                                    </label>
                                                    <input
                                                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="grid-last-name"
                                                        type={"number"}
                                                        maxLength="6"
                                                        placeholder="PIN Code"
                                                        name="pincode"
                                                        onChange={handleForm}
                                                    />
                                                </div>
                                            </div>
                                            <div class="flex flex-wrap mb-2">
                                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label
                                                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        for="grid-state"
                                                    >
                                                        Police Station
                                                    </label>
                                                    <div class="relative">
                                                        <select
                                                            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            id="grid-state"
                                                            name="policeStation"
                                                            onChange={
                                                                handleForm
                                                            }
                                                        >
                                                            <option value="62">
                                                                Sector 62
                                                            </option>
                                                            <option value="55">
                                                                Sector 55
                                                            </option>
                                                            <option value="120">
                                                                Sector 120
                                                            </option>
                                                            <option value="130">
                                                                Sector 130
                                                            </option>
                                                        </select>
                                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                            <svg
                                                                class="fill-current h-4 w-4"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-wrap mb-2 px-3">
                                                <label
                                                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    for="grid-last-name"
                                                >
                                                    Complaint Description
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows="4"
                                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Write your complaint description here..."
                                                    name="complaintDescription"
                                                    onChange={handleForm}
                                                ></textarea>
                                                <p class="text-red-500 text-xs italic">
                                                    Please fill out this field.
                                                </p>
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
                                                    onClick={
                                                        complaintSubmitHandler
                                                    }
                                                >
                                                    {createComplaintLoading
                                                        ? "Saving..."
                                                        : "Submit Complaint"}
                                                </button>
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
        className="fixed flex items-center justify-center h-8 pr-2 pl-1 bg-blue-600 rounded-full bottom-0 right-0 mr-4 mb-4 shadow-lg text-blue-100 hover:bg-blue-600"
        href="https://twitter.com/lofiui"
        target="_top"
      >
        <div className="flex items-center justify-center h-6 w-6 bg-blue-500 rounded-full">
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

export default FileComplaint;
