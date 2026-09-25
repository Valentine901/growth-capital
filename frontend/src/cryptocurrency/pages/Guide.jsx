import {Wallet, UserPlus, ChartBarBigIcon, HandCoins } from "lucide-react";

const Guide = () => {
  return (
    <section id="guide" className="mx-auto  max-w-7xl px-6 py-24 flex flex-col items-center gap-4 w-full">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-1 text-3xl md:text-4xl font-bold text-amber-300 text-center">
            <h2>How It Works</h2>
            <div className="h-[3px] bg-amber-300 rounded-xl w-24"></div>
          </div>

          {/* Description */}
          <div className="max-w-xl mx-auto text-center w-full text-sm mt-2">
            <p>We've streamlined the investment process to be as secure and straightforward as possible. Follow these simple steps to start building your legacy with us.</p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-12 px-6 md:px-12">


            <div className="flex flex-col items-center text-center gap-3 w-full border border-amber-300/10 rounded-xl p-6 ">
              <div className="mb-2 border border-white/20 rounded-full text-amber-300 p-4 ">
                <UserPlus size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-white">Create Your Account</span>
                <p className="text-gray-400/90 text-sm leading-relaxed">Complete our secure registration form in under two minutes to establish your personal investment portal.</p>
              </div>
            </div>


            <div className="flex flex-col items-center text-center gap-3 w-full border border-amber-300/10 rounded-xl p-6 ">
              <div className="mb-2 border border-white/20 rounded-full text-amber-300 p-4 ">
                <Wallet size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-white">Choose a Plan & Fund</span>
                <p className="text-gray-400/90 text-sm leading-relaxed">Select an investment plan that fits your goals and make a deposit using our secured payment method.</p>
              </div>
            </div>


            <div className="flex flex-col items-center text-center gap-3 w-full border border-amber-300/10 rounded-xl p-6 ">
              <div className="mb-2 border border-white/20 rounded-full text-amber-300 p-4 ">
                <ChartBarBigIcon size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-white">Track Your Growth</span>
                <p className="text-gray-400/90 text-sm leading-relaxed">Log in to your dashboard to monitor your daily returns and watch your investment portfolio grow in real-time.</p>
              </div>
            </div>


            <div className="flex flex-col items-center text-center gap-3 w-full border border-amber-300/10 rounded-xl p-6 ">
              <div className="mb-2 border border-white/20 rounded-full text-amber-300 p-4 ">
                <HandCoins size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-white">Withdraw Securely</span>
                <p className="text-gray-400/90 text-sm leading-relaxed">Easily withdraw your profits and capital at the end of the term directly to your designated account.</p>
              </div>
            </div>

          </div>
        </section>
  )
}

export default Guide;