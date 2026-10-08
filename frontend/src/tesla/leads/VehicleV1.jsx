import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';


const VehicleV1 = () => {
  return (
    <div>
      <Navbar />
      <Main />
      <Exterior />
      <Interior />
      <SmartTech />
      <Specification />
      <Safety />
      <ChargingExperience />
      <CompleteSpecification />
      <FutureExperience />
      <Footer />
    </div>
  )
}

export default VehicleV1;

import tesla_v1 from "../../assets/tesla-images/premium_electric_sudan.jpg";

const Main = () => {
  const navigate = useNavigate();

  return (
    <section className={`bg-[url(${tesla_v1})] w-full min-h-screen bg-black bg-no-repeat bg-cover px-4 flex flex-col gap-4 justify-center items-center pt-10`}>
      <h2 className='text-lg text-gray-300 text-center '>PERFORMANCE SEDAN</h2>
      <h1 className='text-gray-100 font-bold lg:font-extrabold text-center text-5xl md:text-6xl lg:text-7xl'>TESLA NEURALINK V1</h1>
      <span className='text-gray-300 text-lg md:text-2xl tracking-wider'>Luxury redefined with AI-integrated intelligence</span>
      <div className='flex flex-col gap-2 items-center'>
        <span className='font-body text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-800'>$23,300</span>
        <span className='text-xs text-gray-200'>Starting price</span>
      </div>

      <div className="mt-10 flex w-full items-center justify-center gap-4 px-4 font-semibold">
        <button
          onClick={() => navigate("/configurator")}
          className="w-full max-w-40 rounded-sm bg-blue-800 py-3 text-center text-sm text-gray-100
               transition duration-300 hover:bg-blue-700
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          Configure Yours
        </button>
        <button
          onClick={() => navigate("/test-drive")}
          className="w-full max-w-40 rounded-sm border border-white py-3 text-center text-sm text-gray-100
               transition duration-300 hover:bg-gray-100 hover:text-black
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Book Test drive
        </button>
      </div>
    </section>
  )
}

import v1_exterior from "../../assets/tesla-images/v1/v1_exterior.jpg";
const Exterior = () => {

  return (
    <section className='w-full min-h-screen bg-gray-100 flex flex-col gap-10 px-10 sm:px-20 pb-20 '>
      <div className='grid grid-cols-2 lg:grid-cols-4 w-full items-center justify-center mt-10 gap-5 mx-auto'>

        <div className='flex flex-col gap-1 mx-auto'>
          <span className='text-gray-600 text-xs'>Range (EPA)</span>
          <span className='text-blue-800 text-2xl font-bold font-numbers tabular-nums'>350 +</span>
          <span className='text-gray-600 text-xs'>miles</span>
        </div>

        <div className='flex flex-col gap-1 mx-auto'>
          <span className='text-gray-600 text-xs'>0-60 mph</span>
          <span className='text-blue-800 text-2xl font-semibold'>5.1</span>
          <span className='text-gray-600 text-xs'>seconds</span>
        </div>

        <div className='flex flex-col gap-1 mx-auto'>
          <span className='text-gray-600 text-xs'>Top Speed</span>
          <span className='text-blue-800 text-2xl font-semibold'>135</span>
          <span className='text-gray-600 text-xs'>mph</span>
        </div>

        <div className='flex flex-col gap-1 mx-auto'>
          <span className='text-gray-600 text-xs'>Fast Charge</span>
          <span className='text-blue-800 text-2xl font-semibold font-numbers'>25</span>
          <span className='text-gray-600 text-xs'>min (10-80%)</span>
        </div>

      </div>

      <div className='w-full mt-10'>
        <span className='text-4xl font-bold text-black '>Aerodynamics Exterior</span>
      </div>

      <div className='flex flex-col sm:flex-row gap-6'>
        <div className='flex flex-col gap-4'>
          <p className='text-md text-gray-600'>The TASLA NEURALINK V1 features an aerodynamic design language that maximizes efficiency while minimizing visual complexity. Every curve and surface is engineered for performance and aesthetics.</p>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>Aerodynamic Bodywork</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>Smooth Sculpted Surface</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>Flush Door Handles</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>Panoramic Glass Roof</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>Slim Futuristic LED Lighting</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>Integrated Charging Port</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>
                Premium Metallic Paint Options</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>

                Minimal Front Fascia Design</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>
                Active Air Management</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>
                Aerodynamic Side Skirts</span>
            </div>
          </div>
        </div>
        <div className='max-w-2xl w-full h-full'>
          <img className='w-full h-full rounded-xl min-h-120 object-cover' src={v1_exterior} alt="" />
        </div>

      </div>
    </section>
  )
}

import v1_interior from "../../assets/tesla-images/v1/v1_interior.jpg";
import { BarChart, CircleCheck, Wifi, EvCharger, Zap } from 'lucide-react';
const Interior = () => {
  return (
    <section className='w-full min-h-screen bg-gray-100 flex flex-col gap-10 px-10 sm:px-20 pb-20'>

      <div className='w-full mt-10'>
        <span className='text-4xl font-bold text-black '>Minimalist Interior</span>
      </div>

      <div className='flex flex-col sm:flex-row-reverse gap-8'>
        <div className='flex flex-col gap-4'>
          <p className='text-md text-gray-600'>Step inside a refined sanctuary of technology and comfort. The minimalist dashboard puts the focus on the road ahead, while premium materials and thoughtful details elevate every journey.</p>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>Large Central Display (15" Touchscreen)</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>Digital Instrument Cluster</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>Ambient Interior Lighting</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>Climate-Controlled Seats</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>Minimalist Dashboard Architecture</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>Ambient Lighting Integration</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>
                Premium Material Trim</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800'>✓</span>
              <span className='text-gry-600 text-sm'>
                Panoramic Glass Roof Interior</span>
            </div>
          </div>
        </div>
        <div className='max-w-2xl w-full h-full'>
          <img className='w-full h-full rounded-xl min-h-120 object-cover' src={v1_interior} alt="" />
        </div>

      </div>
    </section>
  )
}

const SmartTech = () => {
  return (
    <section className='w-full min-h-screen bg-gray-100 flex flex-col gap-10 px-10 sm:px-20'>
      <div className='flex justify-center items-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-black flex text-center mx-auto'>Smart Technology</h2>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-8 justify-center'>
        <div className='flex flex-col gap-4 p-8 bg-gray-200/50  shadow-sm rounded-lg max-w-xl w-full'>
          <div className='bg-blue-500/10 p-2 w-10 items-center flex justify-center text-blue-800 rounded-lg text-extrabold'>
            <BarChart size={28} />
          </div>
          <h2 className='text-black font-bold text-xl'>Intelligent System</h2>
          <div className='flex flex-col gap-3'>
            <div className='flex gap-2 items-center text-gray-600 text-sm'>
              <li className='text-blue-800'></li>
              <span>Adaptice AI Voice Assistant</span>
            </div>
            <div className='flex gap-2 text-gray-600 text-sm items-center'>
              <li className='text-blue-800'></li>
              <span>
                Intelligent Navigation with Real-Time Updates</span>
            </div>
            <div className='flex gap-2 text-gray-600 text-sm items-center'>
              <li className='text-blue-800'></li>
              <span>Driver Profile Recognition</span>
            </div>
            <div className='flex gap-2 text-gray-600 text-sm items-center'>
              <li className='text-blue-800'></li>
              <span>Phone-as-Key NFC Technology</span>
            </div>
            <div className='flex gap-2 text-gray-600 text-sm items-center'>
              <li className='text-blue-800'></li>
              <span>
                Over-the-Air Software Updates</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 p-8 bg-gray-200/50  shadow-sm rounded-lg max-w-xl w-full'>
          <div className='bg-blue-500/10 p-2 w-10 items-center flex justify-center text-blue-800 rounded-lg text-extrabold'>
            <Wifi size={28} />
          </div>
          <h2 className='text-black font-bold text-xl'>Connectivity</h2>
          <div className='flex flex-col gap-3'>
            <div className='flex gap-2 items-center text-gray-600 text-sm'>
              <li className='text-blue-800'></li>
              <span>Advance Driver Monitoring</span>
            </div>
            <div className='flex gap-2 text-gray-600 text-sm items-center'>
              <li className='text-blue-800'></li>
              <span>

                Intelligent Parking Assistance</span>
            </div>
            <div className='flex gap-2 text-gray-600 text-sm items-center'>
              <li className='text-blue-800'></li>
              <span>Wireless Smartphone Integration</span>
            </div>
            <div className='flex gap-2 text-gray-600 text-sm items-center'>
              <li className='text-blue-800'></li>
              <span>
                Smart Climate Control</span>
            </div>
            <div className='flex gap-2 text-gray-600 text-sm items-center'>
              <li className='text-blue-800'></li>
              <span>
                Connected Home Integration</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  )
}

const Specification = () => {
  return (
    <section className='w-full min-h-screen bg-gray-100 flex flex-col gap-10 px-10 sm:px-20'>
      <div className='flex justify-center items-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-black flex text-center mx-auto'>Performance Specifications</h2>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-8 justify-center'>
        <div className='flex flex-col gap-4 p-8 bg-gray-50  shadow-xs rounded-lg max-w-xl w-full'>
          <h2 className='text-black font-bold text-xl'>Intelligent System</h2>

          <div className='flex flex-col gap-2'>
            <span className='text-xs text-gray-600'>0-60 mph Acceleration</span>
            <span className='text-blue-800 text-xl font-bold'>5.1s</span>
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-xs text-gray-600'>Top Speed</span>
            <span className='text-blue-800 text-xl font-bold'>135 mph</span>
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-xs text-gray-600'>Drivetrain</span>
            <span className='text-black text-xl font-semibold'>Dual Motor AWD</span>
          </div>
        </div>

        <div className='flex flex-col gap-4 p-8 bg-gray-50  shadow-xs rounded-lg max-w-xl w-full'>
          <h2 className='text-black font-bold text-xl'>Efficiency & Range</h2>

          <div className='flex flex-col gap-2'>
            <span className='text-xs text-gray-600'>EPA Range</span>
            <span className='text-blue-800 text-xl font-bold'>350 +</span>
            <span className='text-xs text-gray-600'>miles</span>
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-xs text-gray-600'>Energy Efficiency</span>
            <span className='text-black text-xl font-semibold'>0.26kWh/mi</span>
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-xs text-gray-600'>Battery Capacity</span>
            <span className='text-black text-xl font-semibold'>75 kWh</span>
          </div>

        </div>
      </div>

    </section>
  )
}

const Safety = () => {
  return (
    <section className='w-full min-h-screen bg-gray-100 flex flex-col gap-10 px-10 sm:px-20'>
      <div className='flex justify-center items-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-black flex text-center mx-auto'>Safety First</h2>
      </div>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 justify-center gap-6 px-2 sm:px-30'>
        <div className='flex gap-3 px-6 py-5 rounded-md bg-gray-200/80 border border-gray-600/10 shadow-xs items-center max-w-xl w-full'>
          <CircleCheck className='text-blue-800' size={16} />
          <span className='text-sm'>8 Airbags (Front, Side, Knee, Curtain)</span>
        </div>
        <div className='flex gap-3 px-6 py-5 rounded-md bg-gray-200 border border-gray-600/10 shadow-xs items-center max-w-xl w-full'>
          <CircleCheck className='text-blue-800' size={16} />
          <span className='text-sm'>Collision Avoidance Warning</span>
        </div>
        <div className='flex gap-3 px-6 py-5 rounded-md bg-gray-200 border border-gray-600/10 shadow-xs items-center max-w-xl w-full'>
          <CircleCheck className='text-blue-800' size={16} />
          <span className='text-sm'>Automatic Emergence Braking</span>
        </div>
        <div className='flex gap-3 px-6 py-5 rounded-md bg-gray-200 border border-gray-600/10 shadow-xs items-center max-w-xl w-full'>
          <CircleCheck className='text-blue-800' size={16} />
          <span className='text-sm'>Blind Spot Monitoring</span>
        </div>
        <div className='flex gap-3 px-6 py-5 rounded-md bg-gray-200 border border-gray-600/10 shadow-xs items-center max-w-xl w-full'>
          <CircleCheck className='text-blue-800' size={16} />
          <span className='text-sm'>Lane Keeping Assist</span>
        </div>
        <div className='flex gap-3 px-6 py-5 rounded-md bg-gray-200 border border-gray-600/10 shadow-xs items-center max-w-xl w-full'>
          <CircleCheck className='text-blue-800' size={16} />
          <span className='text-sm'>360° Camera System</span>
        </div>
        <div className='flex gap-3 px-6 py-5 rounded-md bg-gray-200 border border-gray-600/10 shadow-xs items-center max-w-xl w-full'>
          <CircleCheck className='text-blue-800' size={16} />
          <span className='text-sm'>Parking Assistance with Sensors</span>
        </div>
        <div className='flex gap-3 px-6 py-5 rounded-md bg-gray-200 border border-gray-600/10 shadow-xs items-center max-w-xl w-full'>
          <CircleCheck className='text-blue-800' size={16} />
          <span className='text-sm'>Driver Monitoring System</span>
        </div>
        <div className='flex gap-3 px-6 py-5 rounded-md bg-gray-200 border border-gray-600/10 shadow-xs items-center max-w-xl w-full'>
          <CircleCheck className='text-blue-800' size={16} />
          <span className='text-sm'>Reinforced Exoskeleton Frame</span>
        </div>
        <div className='flex gap-3 px-6 py-5 rounded-md bg-gray-200 border border-gray-600/10 shadow-xs items-center max-w-xl w-full'>
          <CircleCheck className='text-blue-800' size={16} />
          <span className='text-sm'>Impact-Absorbing Design</span>
        </div>
      </div>

    </section>
  )
}

const ChargingExperience = () => {
  return (
    <section className='w-full min-h-screen bg-gray-100 flex flex-col gap-10 px-10 sm:px-20 pt-20'>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-black flex text-center mx-auto'>Charging Experience</h2>
        <span className='text-gray-600 text-md'>The V1 supports DC fast charging at Tesla Supercharger-compatible networks and our TASLA NEURALINK Charging network. Home charging with our Wall Connector provides convenient overnight charging.</span>
      </div>


      <div className='w-full flex flex-col md:flex-row gap-8 justify-center'>
        <div className='flex flex-col gap-4 p-8 bg-gray-50  shadow-xs rounded-lg max-w-xl w-full'>

          <div className='flex gap-4 items-center'>
            <EvCharger className='text-blue-800' />
            <h2 className='text-black font-bold text-xl'>Home Charging</h2>
          </div>


          <div className='flex flex-col gap-2'>
            <span className='text-xs text-gray-600'>Full Charge Time</span>
            <span className='text-blue-800 text-xl font-bold'>9 hourse (full charge)</span>
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-xs text-gray-600'>Hourly Range Gain</span>
            <span className='text-black text-xl font-bold'>~30 miles/hours</span>
          </div>
          <hr className='border border-gray-600/10' />
          <div className='flex flex-col gap-2'>
            <span className='text-xs text-gray-600'>Install a TESLA Wall Connector for overnight charging convenience</span>
          </div>
        </div>

        <div className='flex flex-col gap-4 p-8 bg-gray-50  shadow-xs rounded-lg max-w-xl w-full'>
          <div className='flex gap-4 items-center'>
            <Zap className='text-blue-800' />
            <h2 className='text-black font-bold text-xl'>Fast Charging</h2>
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-xs text-gray-600'>10-80% Charge Time</span>
            <span className='text-blue-800 text-xl font-bold'>25 min</span>
          </div>

          <div className='flex flex-col gap-2'>
            <span className='text-xs text-gray-600'>Range Gained</span>
            <span className='text-black text-xl font-semibold'>280 miles in 25 min</span>
          </div>

          <hr className='border border-gray-600/10' />
          <div className='flex flex-col gap-2'>
            <span className='text-xs text-gray-600'>DC fast charging available at TESLA NEURALINK stations.</span>
          </div>

        </div>
      </div>

    </section>
  )
}

const CompleteSpecification = () => {
  return (
    <section className='w-full min-h-screen bg-gray-100 flex flex-col gap-10 px-10 sm:px-20 pt-20'>
      <div className='flex justify-center items-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-black flex text-center mx-auto'>Complete Specifications</h2>
      </div>


      <div className='w-full flex flex-col justify-center mx-auto items-center gap-6'>
        <div className='flex gap-3 p-3 justify-between rounded-md bg-gray-300/5 border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>Seating</span>
          <span className='text-sm'>5 passengers</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md  border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>EPA Range</span>
          <span className='text-sm'>350+ miles</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md bg-gray-300/5 border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>0-60 Acceleration</span>
          <span className='text-sm'>5.1 seconds</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>Top Speed</span>
          <span className='text-sm'>135 mph</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md bg-gray-300/5 border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>Battery Capacity</span>
          <span className='text-sm'>75kWh</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>Drivetrain</span>
          <span className='text-sm'>Bual Motor AWD</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md bg-gray-300/5 border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>Motors</span>
          <span className='text-sm'>2 motors</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>DC Charging Speed</span>
          <span className='text-sm'>DC 150kW</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md bg-gray-300/5 border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>Energy Efficieny</span>
          <span className='text-sm'>0.26 kWh/mi</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md  border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>Curb Weight</span>
          <span className='text-sm'>4,850 lbs</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md  border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>Cargo Capacity</span>
          <span className='text-sm'>28 cu ft</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md  border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>Length</span>
          <span className='text-sm'>193 in</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md  border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>Width</span>
          <span className='text-sm'>77 in</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md  border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>Height</span>
          <span className='text-sm'>56 in</span>
        </div>
        <div className='flex gap-3 p-3 justify-between rounded-md  border border-gray-600/10 shadow-xs items-center max-w-3xl w-full'>
          <span className='text-black text-sm font-bold'>Warranty</span>
          <span className='text-sm'>8 years / 120,000 miles</span>
        </div>
      </div>

    </section>
  )
}

const FutureExperience = () => {
  return (
    <section className='w-full bg-gray-100 flex flex-col gap-4 px-10 sm:px-20 py-20'>
      <div className='flex justify-center items-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-black flex text-center mx-auto'>Ready to Experience the Future?</h2>
      </div>
      <p className='text-gray-600 text-xl text-center'>Configure your perfect TESLA NEURALINK V1 or schedule a test drive today.</p>

      <div className="mt-5 flex w-full items-center justify-center gap-4 px-4 font-semibold">
        <button
          onClick={() => navigate("/configurator")}
          className="w-full max-w-40 rounded-sm bg-blue-800 py-3 text-center text-sm text-gray-100
               transition duration-300 hover:bg-blue-700
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          Configure Yours
        </button>
        <button
          onClick={() => navigate("/test-drive")}
          className="w-full max-w-40 rounded-sm border border-black py-3 text-center text-sm bg-gray-100
               transition duration-300 hover:bg-black text-black hover:text-gray-100
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Book Test drive
        </button>
      </div>

    </section>
  )
}