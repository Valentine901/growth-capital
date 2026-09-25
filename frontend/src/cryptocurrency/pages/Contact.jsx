import { Mail, Map } from 'lucide-react';
import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className='mx-auto  max-w-7xl pb-14 pt-24 md:pt-6 flex flex-col items-center gap-4 w-full min-h-screen'>
      <div className='bg-amber-100/10 pt-6 md:pt-16 w-full px-6 grid md:flex gap-8 items-center mx-auto'>
        {/* contact form description */}
        <div className='flex flex-col gap-3 px-4'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-xl md:text-2xl font-bold text-amber-300'>Secure Your Future Today</h2>
            <p className='text-sm font-semibold '>Contact us to speak with a specialist and begin our journey towards lasting wealth. Our team is ready to assist you</p>
          </div>

          <div className='space-y-5 mt-2'>
            <div className='flex gap-4 px-2'>
              <Map size={24} />
              <div className='flex flex-col gap-1'>
                <h2 className='text-lg text-gray-100 font-semibold'>Headquarters</h2>
                <span className='text-sm text-gray-100'>Bahnhofstrasse 42, 8001 Zurich, Switzerland</span>
              </div>
            </div>
            <div className='flex gap-4 px-2'>
              <Mail size={24} />
              <div className='flex flex-col gap-1'>
                <h2 className='text-lg text-gray-100 font-semibold' >Email</h2>
                <span className='text-sm text-gray-100'>info@growthcapitallimited.com</span>
              </div>
            </div>

          </div>
        </div>

        {/* contact form */}
        <div className='bg-black/50 md:max-w-1/2 w-full items-center mx-auto rounded-lg px-6 my-4 py-4'>
          <form className='w-full gap-6'>

            <div className='flex flex-col gap-2 mb-4 w-full text-sm'>
              <label className='text-xs' htmlFor="fullname">Full Name</label>
              <input type="text" placeholder='Your Name' required className='px-3 py-2 rounded-md w-full border border-amber-300/50 outline-none focus:ring-1 focus:ring-yellow-500 focus:ring-offset-1' />
            </div>

            <div className=' flex flex-col gap-2 w-full mb-4 text-sm'>
              <label className='text-xs' htmlFor="fullname">Email Address</label>
              <input type="text" placeholder='Your email' required className='px-3 py-2 rounded-md w-full border border-amber-200/50 outline-none focus:ring-1 focus:ring-yellow-300 focus:ring-offset-1' />
            </div>

            <div className='flex flex-col gap-2 text-sm mb-4'>
              <label className='text-xs' htmlFor="fullname" >Message</label>
              <textarea required  name="message" id="message" placeholder='How can we assist you?' className='px-3 py-1 h-24 rounded-md w-full border border-amber-200/50 outline-none focus:ring-1 focus:ring-yellow-300 focus:ring-offset-1' />
            </div>

            <button className='w-full py-2 text-center text-black bg-amber-300 hover:bg-amber-200 mb-4 rounded-lg transition-all duration-300 text-sm font-bold'>
              Submit Inquiry
            </button>
            <span className='text-[10px] flex items-center justify-center'>By submitting, you agree to our Privacy Policy & Terms.</span>
          </form>
          
        </div>
      </div>
    </section>
  )
}

export default Contact;