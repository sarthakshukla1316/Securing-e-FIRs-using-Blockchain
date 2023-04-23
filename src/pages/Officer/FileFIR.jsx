import React from "react";
import { useState } from "react";

const FileFIR = () => {
    const initialState = {
        city: "",
        pincode: "",
        complaintDescription: "",
        isValid: null, //boolean
        reason: "",
        isCognizible: null, //boolean
        chargesheet: "",
        firFiled: null, //boolean
    };
    const [complaint, setComplaint] = useState(initialState);

    const handleIsValid = (value, name) => {
        setComplaint({ ...complaint, [name]: value });
    };

    const handleForm = (event) => {
        const { name, value } = event.target;
        if (name === "isCognizible") {
            setComplaint({ ...complaint, [name]: value === "true" });
            return;
        }

        setComplaint({ ...complaint, [name]: value });
    };

    const hanldeSubmit = () => {
        console.log(complaint);
    };

    return (
        <div className="flex h-[100vh] w-[100vw] justify-center items-center bgImg">
            <section class="flex justify-center items-centre shadow-xl bg-[#fff] w-full h-full">
                <div class="px-6 h-full text-gray-800  w-full">
                    <div class=" flex flex-row justify-center mb-12 md:mb-0 overflow-y-auto w-full h-full">
                        <form action="" className="w-[80%] mt-3 mb-3">
                            <h2 className="text-4xl font-bold mb-3">
                                Complaint
                            </h2>
                            <div class="flex flex-wrap mb-6">
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="grid-first-name"
                                    >
                                        City
                                    </label>
                                    <p>{complaint.city}</p>
                                </div>
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="grid-first-name"
                                    >
                                        Pincode
                                    </label>
                                    <p>{complaint?.pincode}</p>
                                </div>
                            </div>
                            <div class="flex flex-wrap mb-2">
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="grid-last-name"
                                    >
                                        Complaint Description
                                    </label>
                                    <p>{complaint?.complaintDescription}</p>
                                </div>
                            </div>
                            <div class="flex flex-wrap mb-2">
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <input
                                        // class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-last-name"
                                        type={"checkbox"}
                                        maxLength="6"
                                        placeholder="PIN Code"
                                        onChange={(event) =>
                                            handleIsValid(
                                                event.target.checked,
                                                "isValid"
                                            )
                                        }
                                    />
                                    <label
                                        class="uppercase tracking-wide text-gray-700 ml-2 text-xs font-bold mb-2"
                                        for="grid-last-name"
                                    >
                                        Is Complaint valid
                                    </label>
                                </div>
                            </div>
                            {!complaint.isValid ? (
                                <div class="flex flex-wrap mb-2 px-3">
                                    <label
                                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="grid-last-name"
                                    >
                                        Reason
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        name="reason"
                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write your reason description here..."
                                        onChange={handleForm}
                                    ></textarea>
                                    <p class="text-red-500 text-xs italic">
                                        Please fill out this field.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-4xl font-bold mt-3">
                                        Proceed with complaint
                                    </h2>
                                    <br />
                                    <div class="mb-6">
                                        <div class="w-full px-3 mb-6 md:mb-0">
                                            <h4 className="w-full font-bold mb-3">
                                                Select a complaint type
                                            </h4>
                                        </div>
                                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <input
                                                // class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-last-name"
                                                type={"radio"}
                                                name={"isCognizible"}
                                                value={true}
                                                onChange={handleForm}
                                            />
                                            <label
                                                class="uppercase tracking-wide text-gray-700 text-xs font-bold ml-2"
                                                for="grid-first-name"
                                            >
                                                Cognizible
                                            </label>
                                        </div>
                                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <input
                                                // class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-last-name"
                                                type={"radio"}
                                                name={"isCognizible"}
                                                value={false}
                                                onChange={handleForm}
                                            />
                                            <label
                                                class="uppercase tracking-wide text-gray-700 text-xs font-bold ml-2"
                                                for="grid-first-name"
                                            >
                                                Non-Cognizible
                                            </label>
                                        </div>
                                    </div>
                                    {complaint.isCognizible ===
                                    null ? null : !complaint.isCognizible ? (
                                        <div class="flex flex-wrap mb-2 px-3">
                                            <label
                                                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                for="grid-last-name"
                                            >
                                                Reason for complaint being
                                                incognizible
                                            </label>
                                            <textarea
                                                id="message"
                                                rows="4"
                                                name="reason"
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Write your reason description here..."
                                                onChange={handleForm}
                                            ></textarea>
                                            <p class="text-red-500 text-xs italic">
                                                Please fill out this field.
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div class="flex flex-wrap mb-2">
                                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <input
                                                        // class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="grid-last-name"
                                                        type={"checkbox"}
                                                        maxLength="6"
                                                        placeholder="PIN Code"
                                                        onChange={(event) =>
                                                            handleIsValid(
                                                                event.target
                                                                    .checked,
                                                                "firFiled"
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        class="uppercase tracking-wide text-gray-700 ml-2 text-xs font-bold mb-2"
                                                        for="grid-last-name"
                                                    >
                                                        Mark FIR Filed
                                                    </label>
                                                </div>
                                            </div>
                                            {complaint.firFiled ? (
                                                <div class="flex flex-wrap mb-2 mt-3 px-3">
                                                    <label
                                                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        for="grid-last-name"
                                                    >
                                                        Create a chargesheet
                                                    </label>
                                                    <textarea
                                                        id="message"
                                                        rows="4"
                                                        name="chargesheet"
                                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Write your reason description here..."
                                                        onChange={handleForm}
                                                    ></textarea>
                                                </div>
                                            ) : null}
                                        </>
                                    )}
                                </>
                            )}
                            <div class="text-center lg:text-left mb-8">
                                <button
                                    type="button"
                                    class="w-full inline-block px-7 py-3 bg-[#174793] text-white font-medium text-lg leading-snug uppercase rounded shadow-md hover:bg-[#16325d] hover:shadow-lg focus:bg-[#174793] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#174793] active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={hanldeSubmit}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FileFIR;
