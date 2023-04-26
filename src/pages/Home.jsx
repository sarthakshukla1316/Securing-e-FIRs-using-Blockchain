import React from "react";

import Carousel1 from "../assets/carousel-1.jpg";
import Carousel2 from "../assets/carousel-2.jpg";
import Carousel3 from "../assets/carousel-3.jpg";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

import NavImageLogo from "../assets/noida-profile-small.jpg";

const Home = () => {
  return (
    <div>
      <nav className="navbar bg-white w-full max-h-40 py-2 px-20 flex justify-between">
        <div className="brand text-2xl items-center flex gap-2 ">
          <img src={NavImageLogo} className="h-8 " />
          <h2 className="font-bold text-blue-800">Noida Police</h2>
        </div>
        <ul className="flex  justify-evenly  ">
          <li className="text-blue-600 hover:bg-[#16325d] hover:shadow-lg hover:text-white py-2 cursor-pointer px-4">
            Citizen Services
          </li>
          <li className="text-blue-600 hover:bg-[#16325d] hover:shadow-lg hover:text-white py-2 cursor-pointer px-4">
            Helpline
          </li>
          <li className="text-blue-600 hover:bg-[#16325d] hover:shadow-lg hover:text-white py-2 cursor-pointer px-4">
            <Link to="/customer/login">Customer Login</Link>
          </li>
          <li className="text-blue-600 hover:bg-[#16325d] hover:shadow-lg hover:text-white py-2 cursor-pointer px-4">
            <Link to="/officer/login">Personel Login</Link>
          </li>
          <li className="text-blue-600 hover:bg-[#16325d] hover:shadow-lg hover:text-white py-2 cursor-pointer px-4">
            Contact Us
          </li>
        </ul>
      </nav>
      <main>
        <div className="h-56 max-h-[600px] sm:h-64 xl:h-80 2xl:h-96">
          <Carousel
            autoPlay={true}
            renderThumbs={() => null}
            showIndicators={false}
            // renderArrowPrev={() => null}
            // renderArrowNext={() => null}
          >
            <div className="relative">
              {/* <div className="absolute text-2xl w-full h-full text-white bg-gradient-to-r from-slate-400 to-gray-50top-[50%] left-10">
                <div className="absolute">Your complaints are secured</div>
              </div> */}
              <img src={Carousel1} className="" />
            </div>
            <div>
              <img src={Carousel2} className="" />
              {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
              <img src={Carousel3} className="" />
              {/* <p className="legend">Legend 1</p> */}
            </div>
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default Home;
