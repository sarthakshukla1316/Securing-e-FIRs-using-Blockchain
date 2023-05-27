import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FileFIR = () => {
    const { aadhar, id } = useParams();
    const initialState = {
        id: null,
        aadhar: null,
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
    const [filed, setFiled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleIsValid = (value, name) => {
        console.log(value, name);
        const newComp = complaint;
        newComp[name] = value;
        newComp.reason = value ? "" : complaint.reason;
        if (name === "isValid" && !value) {
            newComp.firFiled = false;
        }
        setComplaint({ ...newComp });
    };
    console.log(complaint);

    const fetch = () => {
        axios
            .get(
                `http://localhost:5000/api/customer/complaints/${aadhar}/${id}`
            )
            .then((response) => {
                const complaintDocument = response.data[8];

                const newComp = JSON.parse(complaintDocument);
                console.log(newComp);
                setFiled(newComp.firFiled);
                setComplaint(newComp);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetch();
    }, [aadhar]);

    const handleForm = (event) => {
        const { name, value } = event.target;
        if (name === "isCognizible") {
            if (filed) {
                return;
            }
            setComplaint({
                ...complaint,
                [name]: value === "true",
                reason: value ? "" : complaint.reason,
            });
            return;
        }
        setComplaint({ ...complaint, [name]: value });
    };

    const hanldeSubmit = () => {
        console.log(complaint);
        setLoading(true);
        axios
            .post("http://localhost:5000/api/customer/updateFIRDocument", {
                aadhar,
                id,
                complaintDocument: complaint,
            })
            .then(() => {
                fetch();
                setError(null);
                setSuccess("Complaint status updated successfully");
            })
            .catch(() => {
                setError("Some error occured");
                setSuccess(null);
            });
        setLoading(false);
    };

    return (
        <div className="flex h-[100vh] w-[100vw] justify-center items-center bgImg">
            <section className="flex justify-center items-centre shadow-xl bg-[#fff] w-full h-full">
                <div className="px-6 h-full text-gray-800  w-full">
                    <div className=" flex flex-row justify-center mb-12 md:mb-0 overflow-y-auto w-full h-full">
                        <form action="" className="w-[80%] mt-3 mb-3">
                            <h2 className="text-4xl font-bold mb-3">
                                Complaint
                            </h2>
                            <div className="flex flex-wrap mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-first-name"
                                    >
                                        City
                                    </label>
                                    <p>{complaint.city}</p>
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-first-name"
                                    >
                                        Pincode
                                    </label>
                                    <p>{complaint?.pincode}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap mb-5">
                                <div className="w-full px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-last-name"
                                    >
                                        Complaint Description
                                    </label>
                                    <p className="bg-gray-200 py-3 px-3">
                                        {complaint?.complaintDescription}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap mb-2">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <input
                                        // className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-last-name"
                                        type={"checkbox"}
                                        maxLength="6"
                                        defaultChecked={complaint.isValid}
                                        disabled={filed}
                                        onChange={(event) =>
                                            handleIsValid(
                                                event.target.checked,
                                                "isValid"
                                            )
                                        }
                                    />
                                    <label
                                        className="uppercase tracking-wide text-gray-700 ml-2 text-xs font-bold mb-2"
                                        htmlFor="grid-last-name"
                                    >
                                        Is Complaint valid
                                    </label>
                                </div>
                            </div>
                            {!complaint.isValid ? (
                                <div className="flex flex-wrap mb-2 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-last-name"
                                    >
                                        Reason
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        name="reason"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write your reason description here..."
                                        onChange={handleForm}
                                        defaultValue={complaint.reason}
                                    ></textarea>
                                    <p className="text-red-500 text-xs italic">
                                        Please fill out this field.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-4xl font-bold mt-3">
                                        Proceed with complaint
                                    </h2>
                                    <br />
                                    <div className="mb-6">
                                        <div className="w-full px-3 mb-6 md:mb-0">
                                            <h4 className="w-full font-bold mb-3">
                                                Select a complaint type
                                            </h4>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <input
                                                // className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-last-name"
                                                type={"radio"}
                                                name={"isCognizible"}
                                                value={true}
                                                onChange={handleForm}
                                                defaultChecked={
                                                    complaint.isCognizible
                                                }
                                                disabled={filed}
                                            />
                                            <label
                                                className="uppercase tracking-wide text-gray-700 text-xs font-bold ml-2"
                                                htmlFor="grid-first-name"
                                            >
                                                Cognizible
                                            </label>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <input
                                                // className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-last-name"
                                                type={"radio"}
                                                name={"isCognizible"}
                                                value={false}
                                                onChange={handleForm}
                                                defaultChecked={
                                                    complaint.isCognizible ===
                                                    false
                                                }
                                                disabled={filed}
                                            />
                                            <label
                                                className="uppercase tracking-wide text-gray-700 text-xs font-bold ml-2"
                                                htmlFor="grid-first-name"
                                            >
                                                Non-Cognizible
                                            </label>
                                        </div>
                                    </div>
                                    {complaint.isCognizible ===
                                    null ? null : !complaint.isCognizible ? (
                                        <div className="flex flex-wrap mb-2 px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-last-name"
                                            >
                                                Reason For complaint being
                                                incognizible
                                            </label>
                                            <textarea
                                                id="message"
                                                rows="4"
                                                name="reason"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Write your reason description here..."
                                                onChange={handleForm}
                                                defaultValue={complaint.reason}
                                            ></textarea>
                                            <p className="text-red-500 text-xs italic">
                                                Please fill out this field.
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex flex-wrap mb-2">
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <input
                                                        // className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                                                        disabled={filed}
                                                        defaultChecked={
                                                            complaint.firFiled
                                                        }
                                                    />
                                                    <label
                                                        className="uppercase tracking-wide text-gray-700 ml-2 text-xs font-bold mb-2"
                                                        htmlFor="grid-last-name"
                                                    >
                                                        Mark FIR Filed
                                                    </label>
                                                </div>
                                            </div>
                                            {complaint.firFiled ? (
                                                <div className="flex flex-wrap mb-2 mt-3 px-3">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="grid-last-name"
                                                    >
                                                        Create a chargesheet
                                                    </label>
                                                    <textarea
                                                        id="message"
                                                        rows="4"
                                                        name="chargesheet"
                                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Write your reason description here..."
                                                        onChange={handleForm}
                                                        defaultValue={
                                                            complaint.chargesheet
                                                        }
                                                    ></textarea>
                                                </div>
                                            ) : null}
                                        </>
                                    )}
                                </>
                            )}
                            <div className="text-center lg:text-left mb-8">
                                <button
                                    type="button"
                                    className="w-full inline-block px-7 py-3 bg-[#174793] text-white font-medium text-lg leading-snug uppercase rounded shadow-md hover:bg-[#16325d] hover:shadow-lg focus:bg-[#174793] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#174793] active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={hanldeSubmit}
                                >
                                    {loading ? "Updating...." : "Save"}
                                </button>
                                <p className="mt-2" style={{ color: "red" }}>
                                    {error || ""}
                                </p>
                                <p className="mt-2" style={{ color: "blue" }}>
                                    {success || ""}
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FileFIR;
