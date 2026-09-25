import React from 'react'

const OurTeam = () => {
  return (
    <section id="our-team" className="mx-auto max-w-7xl px-6 py-24 flex flex-col items-center gap-4 w-full">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-1 text-3xl md:text-4xl font-bold text-amber-300 text-center">
        <h2>Our Executive Team</h2>
        <div className="h-0.75 bg-amber-300 rounded-xl w-24"></div>
      </div>

      {/* Description */}
      <div className="max-w-xl mx-auto text-center w-full text-sm mt-2">
        <p>Meet the seasoned experts steering Growth Capital LImited to the forefront of the global investment market.</p>
      </div>

      {/* team cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-24 px-6 md:px-12'>
        {/* team1 */}
        <div className='flex flex-col p-3 rounded-xl bg-amber-300/5 text-white gap-2 max-w-lg mx-auto'>
          <div className="w-full h-64 md:h-48 rounded-xl bg-gray-700/20 border-none">
            <img src="src/assets/test1.jpg" className='w-full h-full rounded-xl border-none object-cover' alt="" />
          </div>
          <div className='gap-5 mr-3'>
            <h2 className='font-bold text-white text-lg'>John Hunt</h2>
            <span className='text-gray-500 text-sm capitalize'>Chief Executive Manager</span>
            <p className='text-xs my-2 text-gray-300'>PhD in Economics, leading our analytics team to identify cross-sector trends. Former portfolio manag...</p>
          </div>
        </div>

        {/* team2 */}
        <div className='flex flex-col p-3 rounded-xl bg-amber-300/5 text-white gap-2 max-w-lg mx-auto'>
          <div className="w-full h-64 md:h-48 rounded-xl bg-gray-700/20 border-none">
            <img src="src/assets/test2.jpg" className='w-full h-full rounded-xl border-none object-cover' alt="" />
          </div>
          <div className='gap-5 mr-3'>
            <h2 className='font-bold text-white text-lg'>John Hunt</h2>
            <span className='text-gray-500 text-sm capitalize'>Chief Executive Manager</span>
            <p className='text-xs my-2 text-gray-300'>PhD in Economics, leading our analytics team to identify cross-sector trends. Former portfolio manag...</p>
          </div>
        </div>

        {/* team3 */}
        <div className='flex flex-col p-3 rounded-xl bg-amber-300/5 text-white gap-2 max-w-lg mx-auto'>
          <div className="w-full h-64 md:h-48 rounded-xl bg-gray-700/20 border-none">
            <img src="src/assets/test3.jpg" className='w-full h-full rounded-xl border-none object-cover' alt="" />
          </div>
          <div className='gap-5 mr-3'>
            <h2 className='font-bold text-white text-lg'>John Hunt</h2>
            <span className='text-gray-500 text-sm capitalize'>Chief Executive Manager</span>
            <p className='text-xs my-2 text-gray-300'>PhD in Economics, leading our analytics team to identify cross-sector trends. Former portfolio manag...</p>
          </div>
        </div>

        {/* team4 */}
        <div className='flex flex-col p-3 rounded-xl bg-amber-300/5 text-white gap-2 max-w-lg mx-auto'>
          <div className="w-full h-64 md:h-48 rounded-xl bg-gray-700/20 border-none">
            <img src="src/assets/team.jpg" className='w-full h-full rounded-xl border-none object-cover' alt="" />
          </div>
          <div className='gap-5 mr-3'>
            <h2 className='font-bold text-white text-lg'>John Hunt</h2>
            <span className='text-gray-500 text-sm capitalize'>Chief Executive Manager</span>
            <p className='text-xs my-2 text-gray-300'>PhD in Economics, leading our analytics team to identify cross-sector trends. Former portfolio manag...</p>
          </div>
        </div>


      </div>

    </section>

  )
}

export default OurTeam;