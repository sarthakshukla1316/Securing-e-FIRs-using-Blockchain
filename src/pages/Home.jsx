import React from 'react';

import Carousel1 from '../assets/carousel-1.jpg';
import Carousel2 from '../assets/carousel-2.jpg';
import Carousel3 from '../assets/carousel-3.jpg';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

import NavImageLogo from '../assets/noida-profile-small.jpg';

const Home = () => {
  return (
    <div>
      <nav className="flex justify-between w-full px-20 py-2 bg-white navbar max-h-40">
        <div className="flex items-center gap-2 text-2xl brand ">
          <img
            src={NavImageLogo}
            className="h-8 "
          />
          <h2 className="font-bold text-blue-800">Noida Police</h2>
        </div>
        <ul className="flex justify-evenly ">
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
            autoFocus={true}
            interval={2000}
            showStatus={false}
            renderThumbs={() => null}
            showIndicators={false}
            // renderArrowPrev={() => null}
            // renderArrowNext={() => null}
          >
            <div className="relative">
              <div className="absolute w-full h-screen  bg-gradient-to-r from-[rgba(23,21,21,0.9164915966386554)] 20% via-[rgba(42,42,42,0.8744747899159664)] 57% to-[rgba(255,255,253,0.11257002801120453)] 100% flex items-center tracking-wide select-none">
                <p className="my-auto ml-20 font-semibold leading-normal text-left text-white select-none text-8xl font-title lg:w-1/2">
                  Secure your FIR using{' '}
                  <span className="font-bold text-purple-900 font-title ">Blockchain</span>
                </p>
              </div>
              <img
                src={Carousel1}
                className="object-cover h-screen"
              />
            </div>
            <div className="relative">
              <div className="absolute w-full h-screen  bg-gradient-to-r from-[rgba(23,21,21,0.9164915966386554)] 20% via-[rgba(42,42,42,0.8744747899159664)] 57% to-[rgba(255,255,253,0.11257002801120453)] 100% flex items-center tracking-wide select-none">
                <p className="my-auto ml-20 font-semibold leading-normal text-left text-white select-none text-8xl font-title lg:w-1/2">
                  Complete transparency <br />
                  with <span className="font-bold text-purple-900 font-title ">Blockchain</span>
                </p>
              </div>
              <img
                src={Carousel2}
                className="object-cover h-screen"
              />
              {/* <p className="legend">Legend 1</p> */}
            </div>
            <div className="relative">
              <div className="absolute w-full h-screen  bg-gradient-to-r from-[rgba(23,21,21,0.9164915966386554)] 20% via-[rgba(42,42,42,0.8744747899159664)] 57% to-[rgba(255,255,253,0.11257002801120453)] 100% flex items-center tracking-wide select-none">
                <p className="my-auto ml-20 font-semibold leading-normal text-left text-white select-none text-8xl font-title lg:w-1/2">
                  Secure your FIR using{' '}
                  <span className="font-bold text-purple-900 font-title ">Blockchain</span>
                </p>
              </div>
              <img
                src={Carousel3}
                className="object-cover h-screen"
              />
              {/* <p className="legend">Legend 1</p> */}
            </div>
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default Home;
