// const Home1 = () => {
//   return (
//     <section className='bg-[url(src/assets/tesla-images/tesla-home.jpg)] w-full min-h-screen bg-black bg-no-repeat bg-cover pt-60 sm:pt-43 lg:pt-30 px-4'>
//       {/* Added max-w-6xl so the layout stays contained and perfectly centered */}
//       <div className='flex flex-col text-center w-full max-w-6xl mx-auto'>
        
//         <span className="text-blue-800 text-sm md:text-base tracking-widest font-semibold uppercase mb-2">
//           Experience The Future
//         </span>

//         {/* Replaced 'w-5xl' with 'max-w-5xl' and changed line height to be responsive so it doesn't look stretched on mobile */}
//         <h1 className='text-5xl sm:text-7xl lg:text-[105px] font-black text-gray-100 max-w-5xl leading-tight lg:leading-32 mx-auto mb-6 tracking-tight drop-shadow-lg font-serif normal-case'>
//           DRIVE WHAT COMES NEXT
//         </h1>

//         <div className="flex flex-col text-2xl sm:text-3xl lg:text-4xl text-gray-100">
//           <p>Intelligent electric mobility engineered for a connected future.</p>
//           <p>Cutting-edge technology meets refined design.</p>
//         </div>

    
//         <div className='flex flex-col sm:flex-row w-full md:w-auto gap-4 mx-auto justify-center mt-10 font-semibold px-4 m:px-0'>
          
         
//           <a href="/vehicles" className='block w-full md:w-60 text-gray-100 text-xl py-4 px-8 rounded-lg bg-blue-600 hover:scale-105 transition-all duration-300 text-center'>
//             <span>Explore Vehicles</span>
//           </a>

//           <a href='/configurator' className='block w-full md:w-60 border-2 border-white text-gray-100 rounded-lg text-xl py-4 px-8 hover:bg-gray-100 hover:text-black transition-all duration-300 hover:scale-105 text-center'>
//             <span>Configure Yours</span>
//           </a>
          
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Home1







import React from 'react'

const Home1 = () => {
  return (
    <section className='bg-[url(src/assets/tesla-images/tesla-home.jpg)] w-full min-h-screen bg-black bg-no-repeat bg-cover pt-60 sm:pt-43 lg:pt-30 px-4 flex items-center justify-center'>
      {/* Container is wrapped to ensure perfect vertical and horizontal centering across all screen heights */}
      <div className='flex flex-col text-center w-full max-w-6xl mx-auto'>
        
        <span className="text-blue-800 text-sm md:text-base tracking-widest font-semibold uppercase mb-2">
          Experience The Future
        </span>

        <h1 className='text-5xl sm:text-7xl lg:text-[105px] font-black text-gray-100 max-w-5xl leading-tight lg:leading-32 mx-auto mb-6 tracking-tight drop-shadow-lg font-serif normal-case'>
          DRIVE WHAT COMES NEXT
        </h1>

        <div className="flex flex-col text-2xl sm:text-3xl lg:text-4xl text-gray-100">
          <p>Intelligent electric mobility engineered for a connected future.</p>
          <p>Cutting-edge technology meets refined design.</p>
        </div>

        {/* 
          - Fixed a typo: 'm:px-0' was corrected to 'sm:px-0'
          - Changed desktop breakpoint from 'md:w-auto' to 'sm:w-auto' to perfectly match the flex-row switch
        */}
        <div className='flex flex-col sm:flex-row w-full sm:w-auto gap-4 mx-auto justify-center mt-10 font-semibold px-4 sm:px-0'>
          
          {/* Changed desktop sizing from 'md:w-60' to 'sm:w-60' so your buttons size down accurately with the layout row shift */}
          <a href="/vehicles" className='block w-full sm:w-60 text-gray-100 text-xl py-4 px-8 rounded-lg bg-blue-600 hover:scale-105 transition-all duration-300 text-center'>
            <span>Explore Vehicles</span>
          </a>

          <a href='/configurator' className='block w-full sm:w-60 border-2 border-white text-gray-100 rounded-lg text-xl py-4 px-8 hover:bg-gray-100 hover:text-black transition-all duration-300 hover:scale-105 text-center'>
            <span>Configure Yours</span>
          </a>
          
        </div>
      </div>
    </section>
  )
}

export default Home1
