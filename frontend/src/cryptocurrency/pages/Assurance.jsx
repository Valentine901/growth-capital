import {Lock, Landmark, Shield } from "lucide-react";

const Assurance = () => {
  return (
    <section id="assurance" className="mx-auto max-w-7xl px-6 py-24 flex flex-col items-center gap-4 w-full">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-1 text-3xl md:text-4xl font-bold text-amber-300 text-center">
            <h2 className="px-6 md:px-12">The Fortress of Security Protecting Your Assets</h2>
            <div className="h-[3px] bg-amber-300 rounded-xl w-24"></div>
          </div>

          {/* Description */}
          <div className="max-w-xl mx-auto text-center w-full text-sm md:text-md mt-2">
            <p>Your peace of mind is our priority. We employ a multi-layered security strategy, combining physical protection of our tangible assets with robust digital safeguards for all accounts.</p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12 px-6 md:px-12">


            <div className="flex flex-col items-center text-center gap-3 w-full border border-amber-300/30 rounded-xl p-6 ">
              <div className="mb-2 border border-white/20 rounded-full text-amber-300 p-4 bg-black/10">
                <Landmark size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-white">Tangible Asset Security</span>
                <p className="text-gray-400/90 text-sm leading-relaxed">Our physical gold holdings are stored in high-security, audited vaults. Agricultural and manufacturing assets are insured and managed by industry-leading partners.</p>
              </div>
            </div>


            <div className="flex flex-col items-center text-center gap-3 w-full border border-amber-300/30 rounded-xl p-6 bg-amber-300/5">
              <div className="mb-2 border border-white/20 rounded-full text-amber-300 p-4 bg-black/10">
                <Shield size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-white">Comprehensive Insurance</span>
                <p className="text-gray-400/90 text-sm leading-relaxed">All managed assets are covered by comprehensive insurance policies, protecting against unforeseen physical events and ensuring the stability of our investment base.</p>
              </div>
            </div>


            <div className="flex flex-col items-center text-center gap-3 w-full border border-amber-300/30 rounded-xl p-6 bg-amber-300/5">
              <div className="mb-2 border border-white/20 rounded-full text-amber-300 p-4 bg-black/10">
                <Lock size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-white">Advanced Digital Safeguards</span>
                <p className="text-gray-400/90 text-sm leading-relaxed">Your account and data are protected with bank-grade security, including 256-bit SSL encryption and mandatory <span className="text-amber-300">Two-Factor Authentication (2FA)</span>.</p>
              </div>
            </div>



          </div>
        </section>
  )
}

export default Assurance