import React, { useEffect, useState } from 'react'
import { ChartNoAxesCombined } from "lucide-react";
import { APIInvest } from '../../constants/API';

const CreatePlan = () => {
  const [name, setName] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expectedReturn, setExpectedReturn] = useState(0);
  const [referralBonus, setReferrralBonus] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!name) {
      setError("Please select a plan name.");
      setLoading(false);
      return;
    }

    try {
     
      await APIInvest.post("/plans/create-plan", {
        plan_name:name,
        min_amount:min,
        max_amount:max,
        duration:duration,
        daily_profit_percentage: expectedReturn,
        referral_bonus: referralBonus
      });
      
      setSuccess("Plan created successfully");
      setName("");
      setMax(0);
      setMin(0);
      setReferrralBonus(0);
      setExpectedReturn(0);
      setDuration(0);

    } catch (error) {
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else if (error.request) {
        setError("Could not reach the server");
      } else {
        setError("Internet connection failure");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (error || success){
        setError("");
        setSuccess("");
      }
    }, 3500)
    return () => clearTimeout(timer);
  }, [error, success])

  return (
    <div className='p-4 md:p-8 flex w-full min-h-screen justify-center items-start bg-black text-gray-100 font-body'>
      <div className='flex flex-col gap-6 max-w-xl w-full mx-auto p-6 md:p-8 bg-zinc-950 border border-amber-400/20 rounded-2xl h-fit shadow-2xl shadow-amber-400/5'>

        {/* Header Section */}
        <div className='flex items-center gap-4 w-full border-b border-zinc-900 pb-5'>
          <div className='w-14 h-14 bg-amber-400/10 border border-amber-400/30 items-center flex justify-center rounded-xl text-amber-400 shrink-0'>
            <ChartNoAxesCombined size={28} />
          </div>
          <div className='flex flex-col gap-1'>
            <h2 className='text-xl font-bold text-amber-400 tracking-tight'>Create Investment Plan</h2>
            <p className='text-sm text-zinc-400 leading-relaxed'>Set up a new investment tier package for your client base.</p>
          </div>
        </div>

       {/* message */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-center text-red-400 font-medium text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-center text-green-400 font-medium text-sm">
            {success}
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>

          {/* Select Input Field Wrapper Container */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold tracking-wide text-zinc-300">Plan Name *</label>
            <select 
              name="plan_name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              id="name" 
              required
              className='w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-gray-100 placeholder:text-zinc-600 transition-all duration-200 cursor-pointer appearance-none'
            >
              {/* FIXED: value set to "" to correctly map the placeholder layer to initial state hook variables */}
              <option value="" disabled>Select Plan</option>
              <option value="Starter Plan">Starter Plan</option>
              <option value="Standard Plan">Standard Plan</option>
              <option value="Premium Plan">Premium Plan</option>
              <option value="Platinum Plan">Platinum Plan</option>
              <option value="GrandMaster Plan">GrandMaster Plan</option>
            </select>
          </div>

          {/* Amount Boundaries Grid */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="min" className="text-sm font-semibold tracking-wide text-zinc-300">Minimum Investment ($) *</label>
              <input
                type="number"
                id="min"
                required
                value={min || ""}
                onChange={(e) => setMin(Number(e.target.value))}
                placeholder='100'
                className='w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-gray-100 placeholder:text-zinc-600 transition-all duration-200'
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="max" className="text-sm font-semibold tracking-wide text-zinc-300">Maximum Investment ($) *</label>
              <input
                type="number"
                id="max"
                required
                value={max || ""}
                onChange={(e) => setMax(Number(e.target.value))}
                placeholder='500000'
                className='w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-gray-100 placeholder:text-zinc-600 transition-all duration-200'
              />
            </div>
          </div>

          {/* Metric Yield Grid */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="roi" className="text-sm font-semibold tracking-wide text-zinc-300">Expected Return (%) *</label>
              <input
                type="number"
                id="roi"
                required
                value={expectedReturn || ""}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                placeholder='15'
                className='w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-gray-100 placeholder:text-zinc-600 transition-all duration-200'
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="duration" className="text-sm font-semibold tracking-wide text-zinc-300">Duration (Days) *</label>
              <input
                type="number"
                id="duration"
                required
                value={duration || ""}
                onChange={(e) => setDuration(Number(e.target.value))}
                placeholder='7'
                className='w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-gray-100 placeholder:text-zinc-600 transition-all duration-200'
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="bonus" className="text-sm font-semibold tracking-wide text-zinc-300">Referral Bonus (%) *</label>
            <input
              type="number"
              id="bonus"
              required
              value={referralBonus || ""}
              onChange={(e) => setReferrralBonus(Number(e.target.value))}
              placeholder='5'
              className='w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-gray-100 placeholder:text-zinc-600 transition-all duration-200'
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className='w-full py-3.5 mt-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-black font-extrabold text-center text-sm tracking-wide shadow-lg shadow-amber-400/10'
          >
            {loading ? "Creating System Tier..." : "Create Plan Layout"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePlan;
