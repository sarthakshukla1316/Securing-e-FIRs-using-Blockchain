import React from "react";
import logo from "../assets/logo.png";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setOtp } from "../store/authSlice";
import { login, verifyOtp } from "../http";
import OtpInput from "react-otp-input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [aadharNumber, setAadharNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const [OTP, setOTP] = useState("");

  const { hash } = useSelector((state) => state.auth.otp);

  const handleSendOtp = async () => {
    try {
      if (!aadharNumber) {
        return;
      }
      const response = await login({ aadharNumber });
      const { data } = response;
      console.log(data);
      if (response.status === 200) {
        dispatch(setOtp({ aadharNumber: data.aadharNumber, hash: data.hash }));
        setShowOtp(true);
      }
      console.log(response.data);
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log(err);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!aadharNumber || !OTP) {
        setError("All fields are required !");
        return;
      }
      if (OTP.length !== 6) {
        setError("Incomplete OTP!");
        return;
      }
      for (let i = 1; i <= 6; i++) {
        let as = OTP.charAt(i) - "0";
        if (as >= 0 && as <= 9) {
          continue;
        } else {
          setError("OTP must contain only numbers");
          return;
        }
      }
      const response = await verifyOtp({ otp: OTP, aadharNumber, hash });
      const { data } = response;

      if (response.status === 200) {
        dispatch(setAuth(data));
        navigate("/");
      }
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log(err);
    }
  };

  return (
    <div className="flex h-[100vh] w-[100vw] justify-center items-center bgImg ">
      <section class="h-[74vh] w-[80vw] shadow-xl bg-[#F8F8F8] opacity-[0.9] rounded-lg">
        <div class="px-6 h-full text-gray-800">
          <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img src={logo} class="w-[60%] mx-auto" alt="Police logo" />
            </div>
            <div class="xl:ml-10 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              {!showOtp ? (
                <form>
                  <h2 className="text-4xl font-bold mb-3">Sign In</h2>
                  <p class="text-lg text-[#aca9a9] font-semibold mt-4 mb-3 pt-1">
                    Don't have an account?
                    <Link
                      to="/register"
                      class="text-[#174793] pl-2 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Sign Up
                    </Link>
                  </p>

                  <div class="mb-6">
                    <input
                      type="text"
                      onChange={(e) => setAadharNumber(e.target.value)}
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      placeholder="Aadhar Number"
                    />
                  </div>

                  <div class="flex justify-between items-center mb-6">
                    <div class="form-group form-check"></div>
                    <a href="#!" class="text-gray-800">
                      Forgot password?
                    </a>
                  </div>

                  <div class="text-center lg:text-left">
                    <button
                      type="button"
                      onClick={() => handleSendOtp()}
                      class="w-full inline-block px-7 py-3 bg-[#174793] text-white font-medium text-lg leading-snug uppercase rounded shadow-md hover:bg-[#16325d] hover:shadow-lg focus:bg-[#174793] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#174793] active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Sign in
                    </button>
                  </div>

                  <p className="text-sm mt-6 text-[#808080] font-semibold">
                    <a className="text-[#0000ff]" href="">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a className="text-[#0000ff]" href="">
                      Terms of Service
                    </a>{" "}
                    apply
                  </p>
                </form>
              ) : (
                <form>
                  <h2 className="text-4xl font-bold mb-3">Verify Otp</h2>
                  <p class="text-lg text-[#aca9a9] font-semibold mt-4 mb-3 pt-1">
                    Don't have an account?
                    <Link
                      to="/register"
                      class="text-[#174793] pl-2 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Sign Up
                    </Link>
                  </p>

                  <OtpInput
                    value={OTP}
                    onChange={(otp) => setOTP(otp)}
                    numInputs={6}
                    separator={<span></span>}
                    containerStyle={{ marginLeft: "-10px" }}
                    inputStyle={{
                      border: "1px solid #999",
                      margin: 10,
                      marginBottom: 14,
                      width: "40px",
                      height: "40px",
                    }}
                  />

                  <div class="flex justify-between items-center mb-6">
                    <div class="form-group form-check"></div>
                    <a href="#!" class="text-gray-800">
                      Forgot password?
                    </a>
                  </div>

                  <div class="text-center lg:text-left">
                    <button
                      type="button"
                      onClick={() => handleVerifyOtp()}
                      class="w-full inline-block px-7 py-3 bg-[#174793] text-white font-medium text-lg leading-snug uppercase rounded shadow-md hover:bg-[#16325d] hover:shadow-lg focus:bg-[#174793] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#174793] active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Sign in
                    </button>
                  </div>

                  <p className="text-sm mt-6 text-[#808080] font-semibold">
                    <a className="text-[#0000ff]" href="">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a className="text-[#0000ff]" href="">
                      Terms of Service
                    </a>{" "}
                    apply
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
