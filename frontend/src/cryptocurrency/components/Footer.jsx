import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black p-6 grid grid-cols-2 lg:grid-cols-4 gap-6'>

      <div className='flex flex-col gap-6'>
        <a href="#home" className='text-amber-300'>
          Growth Capital
        </a>
        <p className='text-xs'>A premier global partner for diversified and resilient wealth creation, founded in 2019 in Switzerland.</p>
      </div>

      <div className='flex flex-col gap-6'>
        <h2 className='text-lg font-bold text-amber-300'>Quick Links</h2>
        <ul className='flex flex-col gap-2 text-xs'>
          <a href="#portfolio">Our Portfolio</a>
          <a href="#plans">Investment Plans</a>
          <a href="#our-team">Our Team</a>
        </ul>
      </div>


      <div className='flex flex-col gap-6'>
        <h2 className='text-lg font-bold text-amber-300'>Legal</h2>
        <ul className='flex flex-col gap-2 text-xs'>
          <span className='cursor-pointer'>Terms of Service</span>
          <span className='cursor-pointer'>Privacy Policy</span>
          <span className='cursor-pointer'>Risk Disclosure</span>
        </ul>
      </div>

      <div className='flex flex-col gap-6'>
        <h2 className='text-lg font-bold text-amber-300'>Market Insights</h2>
        <ul className='flex flex-col gap-2 text-xs'>
          <span className='cursor-pointer'>Subscribe for our weekly market analysis and compnay news.</span>
          <div className='flex gap-2'>
            <input type="text" placeholder='Your email addres' className='border border-amber-300/50 outline-none focus:ring-1 focus:ring-amber-300 focus:ring-offset-1 rounded-sm px-3 w-full py-2' />
            <button className='text-sm font-semibold text-black px-3 py-2 bg-amber-300 rounded-sm'>Subscribe</button>
          </div>
        </ul>
      </div>

    </div>
  )
}

export default Footer