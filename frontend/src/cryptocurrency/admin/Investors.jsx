import { useState, useEffect } from "react";
import { APIInvest } from "../../constants/API";
import { ChartNoAxesCombined } from "lucide-react";

const Investors = () => {
  const [investors, setInvestors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    handleFetchInvestor();
  }, [])

  const handleFetchInvestor = async () => {
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



  return (
     <div className='p-4 md:p-8 flex flex-col w-full min-h-screen items-start bg-black text-gray-100 font-body gap-6'>
    
          {/* Header Section */}
          <div className='flex flex-col max-w-7xl w-full p-6 bg-zinc-950 border border-amber-400/20 rounded-2xl h-fit shadow-2xl shadow-amber-400/5'>
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
    
          {/* Loading / Error States Handling */}
          {loading && (
            <div className="text-center w-full py-12 text-zinc-500 font-medium">Loading active investors...</div>
          )}
    
          {error && (
            <div className="w-full p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center text-red-400 font-medium text-sm">
              {error}
            </div>
          )}
    
          {/* Body Grid Display Layout Section */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
              {investors.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-zinc-950 border border-zinc-900 rounded-2xl text-zinc-500">
                  No active investors.
                </div>
              ) : (
                investors.map((investor) => (
                  <InvestorCard key={investor.id} investor={investor} loading={loading} setLoading={setLoading} setError={setError} error={error} />
                ))
              )}
            </div>
          )}
        </div>
  )
}

export default Investors

const InvestorCard = ({ investor }) => {
  return(
    <div className="p-4 rounded-lg border border-amber-300/20 max-w-md gap-4 flex flex-col">
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

      <button className="p-3 rounded-md bg-amber-300 hover:bg-amber-400 transition-all duration-300 text-black font-semibold">
        view account
      </button>

    </div>
  )
}