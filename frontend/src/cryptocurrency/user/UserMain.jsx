import { ArrowUpFromLine, ArrowDownToLine, Wallet, Coins, UsersRound } from "lucide-react";
import Plans from "./Plans";
import { useState, useEffect } from "react";
import { APIInvest } from "../../constants/API";



const UserMain = ({ setName }) => {
    const [walletBal, setWalletBal] = useState(0.0);
    const [loading, setLoading] = useState(false);

    const handleFetchWalletBalance = async () => {
        setLoading(false);
        try{
            const response = await APIInvest.get("/wallets/user-wallet");
            const bal = Number(response.data.balance);
            setWalletBal(bal);
        } catch (error) {
            console.log(error.response.data.detail)
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        handleFetchWalletBalance();
    }, [])


    return (
        <div className='flex-1 bg-zinc-900 w-full p-6 lg:p-8 overflow-y-auto'>
            <div className='max-w-7xl mx-auto'>

                <div className='grid grid-cols-2 lg:flex gap-3 mb-4'>
                    <div className="flex flex-col p-6 items-start rounded-lg border border-amber-300/30 gap-2 bg-black max-w-80 w-full">
                        <div className="items-center flex w-10 h-10 text-blue-600 bg-blue-500/10 rounded-md justify-center p-2">
                            <Wallet />
                        </div>
                        <span className="text-zinc-400/60 uppercase">Wallet Balance</span>
                        <span className="text-2xl font-bold">${walletBal.toFixed(2)}</span>

                    </div>
                    <div className="flex flex-col p-6 items-start rounded-lg border border-amber-300/30 gap-2 bg-black max-w-80 w-full">
                        <div className="items-center flex w-10 h-10 text-amber-600 bg-amber-500/10 rounded-md justify-center">
                            <ArrowUpFromLine />
                        </div>
                        <span className="text-zinc-400/60 uppercase">Withdrawals</span>
                        <span className="text-2xl font-bold">$0.00</span>
                    </div>
                    <div className="flex flex-col p-6 items-start rounded-lg border border-amber-300/30 gap-2 bg-black max-w-80 w-full">
                        <div className="items-center flex w-10 h-10 text-green-600 bg-green-500/10 rounded-md justify-center">
                            <Coins />
                        </div>
                        <span className="text-zinc-400/60 uppercase">Profit</span>
                        <span className="text-2xl font-bold">$0.00</span>
                    </div>
                    <div className="flex flex-col p-6 items-start rounded-lg border border-amber-300/30 gap-2 bg-black max-w-80 w-full">
                        <div className="items-center flex w-10 h-10 text-blue-600 bg-blue-500/10 rounded-md justify-center">
                            <UsersRound />
                        </div>
                        <span className="text-zinc-400/60 uppercase">Referrals</span>
                        <span className="text-2xl font-bold">$0.00</span>
                    </div>

                </div>

                <div className="flex mb-8 items-center space-x-2">
                    <button onClick={() => setName("deposit")} className="py-3 px-6 rounded-md border bg-amber-300 text-black font-semibold border-amber-300/30 w-full max-w-50 hover:bg-amber-300/80 transition-all duration-300"> Deposit</button>
                    <button onClick={() => setName("withdrawal")} className="py-3 px-6 rounded-md border border-amber-300/30 w-full max-w-50  hover:border-amber-300/60 transition-all duration-300 font-semibold">Withdraw</button>
                </div>

                <div className='p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl min-h-[400px] scroll-auto'>
                    {/* plans */}
                    <Plans />
                </div>
            </div>
        </div>
    )
}

export default UserMain;
