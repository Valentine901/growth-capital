import { useState, useEffect } from "react";
import { APIInvest } from "../../constants/API";
import { ChartNoAxesCombined } from "lucide-react";
import InvestorAccount from "./InvestorAccount";

const Investors = () => {
  const [investors, setInvestors] = useState([]);
  const [investor, setInvestor] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);


  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  }

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  }


  useEffect(() => {
    handleFetchInvestors();
  }, [])

  const handleFetchInvestors = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await APIInvest.get("/investment/users")
      setInvestors(response.data);
    } catch (error) {
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else if (error.request) {
        setError("Could not reach the server");
      } else {
        setError("Internet connection failure");
      }
    } finally {
      setLoading(false)
    }
  }


  const handleFetchInvestor = async (user_id) => {
    setLoading(true);
    setError("");
    try {
      const response = await APIInvest.get(`/investment/user/${user_id}`);
      setInvestor(response.data);
    } catch (error) {
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else if (error.request) {
        setError("Could not reach the server");
      } else {
        setError("Internet connection failure");
      }
    } finally {
      setLoading(false)
    }
  }

  const handleViewAccount = async (user_id) => {
    await handleFetchInvestor(user_id);
    handleNextStep();
  };



  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="flex flex-col gap-6 p-4 sm:p-8 w-full max-w-7xl">
        {/* Header Section */}
        <div className='flex flex-col p-6 bg-zinc-950 border border-amber-400/20 rounded-2xl h-fit shadow-2xl shadow-amber-400/5'>
          <div className='flex items-center gap-4 w-full'>
            <div className='w-14 h-14 bg-amber-400/10 border border-amber-400/30 items-center flex justify-center rounded-xl text-amber-400 shrink-0'>
              <ChartNoAxesCombined size={28} />
            </div>
            <div className='flex flex-col gap-1'>
              <h2 className='text-xl font-bold text-amber-400 tracking-tight'>Active Investors</h2>
              <p className='text-sm text-zinc-400 leading-relaxed'>View all investors.</p>
            </div>
          </div>
        </div>
       {step === 2 &&  <div className="max-w-25 w-full">
          <button onClick={handlePrevStep} className="bg-zinc-900/70 px-4 py-3 w-full rounded-full hover:bg-zinc-900 text-gray-500 cursor-pointer">Prev</button>
        </div>}
        {/* Loading / Error States Handling */}
        {step === 1 &&
          <div>
            {loading && (
              <div className="text-center w-full py-12 text-zinc-500 font-medium">Loading active investors...</div>
            )}

            {error && (
              <div className="w-full p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center text-red-400 font-medium text-sm">
                {error}
              </div>
            )}

            {/* Body Grid Display Layout Section */}
            <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-xl min-h-[400px] w-full scroll-auto">
              {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
                  {investors.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-zinc-950 border border-zinc-900 rounded-2xl text-zinc-500">
                      No active investors.
                    </div>
                  ) : (
                    investors.map((investor) => (
                      <InvestorCard
                        onView={handleViewAccount}
                        key={investor.id} investor={investor} loading={loading} setLoading={setLoading} setError={setError} error={error} />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        }

        {step === 2 && <InvestorAccount investor={investor} />}
      </div>
    </div>
  )
}

export default Investors

const InvestorCard = ({ investor, onView }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-lg border border-amber-300/20 gap-4 flex flex-col">
      <div className="flex flex-col gap-1">
        <label className="text-zinc-500 text-sm" htmlFor="firstname">First Name</label>
        <h2>{investor.first_name}</h2>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-zinc-500 text-sm" htmlFor="lastname">Last Name</label>
        <h2>{investor.last_name}</h2>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-zinc-500 text-sm" htmlFor="lastname">Email Address</label>
        <h2>{investor.email}</h2>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-zinc-500 text-sm" htmlFor="lastname">Phone</label>
        <h2>{investor.phone}</h2>
      </div>

      <button onClick={() => onView(investor.id)} className="p-3 rounded-md bg-amber-300 hover:bg-amber-400 transition-all duration-300 text-black font-semibold">
        view account
      </button>

    </div>
  )
}