import React from 'react'
import { Check } from 'lucide-react'

const PlanCard = ({ plan }) => {
  return (
        <div className='border-t-4 border-amber-300 rounded-t-lg py-3 max-w-120'>
          <div className='flex flex-col gap-4 bg-black w-full'>

            <h2 className='text-amber-300 text-2xl text-center font-bold'>{plan.plan_name}</h2>
            <div>
              <div className='flex flex-col items-center mx-auto text-center justify-center rounded-full w-25 h-25 bg-amber-300 mb-1'>
                <div className='flex items-center gap-2 text-black font-extrabold mx-auto'>
                 <h2 className='text-3xl'>{plan.daily_profit_percentage}</h2>
                 %
                </div>
               
                <span className='text-gray-100 font-semibold text-sm'>Daily</span>
              </div>
              <div className='flex flex-col gap-1 items-center'>
                <p className='text-amber-300 font-semibold'>Min: <span className='text-gray-100'>${plan.min_amount}</span></p>
                <p className='text-amber-300 font-semibold'>Max: <span className='text-gray-100'>${plan.max_amount}</span></p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-5 px-2'>

            <div className='flex w-full justify-between bg-black py-2'>
              <span>Duration</span>
              <span className='font-bold'>{plan.duration} Days</span>
            </div>

            <div className='flex w-full justify-between bg-black py-2'>
              <span>Capital In Return</span>
              <span className='flex text-green-600 items-center gap-1 font-bold'><Check size={18} /> Yes</span>
            </div>

            <div className='flex w-full justify-between bg-black py-2 text-amber-300'>
              <span>Referral Bonus</span>
              <span className='font-bold'>{plan.referral_bonus}%</span>
            </div>

            <button className='border border-amber-300 w-full p-2 rounded-lg bg-black text-center font-bold '>
              Invest Now
            </button>

          </div>

        </div>
  )
}

export default PlanCard