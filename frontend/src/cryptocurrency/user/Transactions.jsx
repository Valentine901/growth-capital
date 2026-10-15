import { useInvestAuth } from "../context/AuthContext"
import { useState, useEffect } from "react";
import { APIInvest } from "../../constants/API";
import TransactionCard from "./TransactionCard";
import WithdrawalCard from "./WithdrawalCard";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { withdrawals } = useInvestAuth();

    const handleFetchTransactions = async () => {
        setError('');
        setLoading(true);

        try {
            const response = await APIInvest.get("/transactions/user-transactions");
            setTransactions(response.data);
           
        } catch (error) {
            console.log(error.response.data.detail);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleFetchTransactions();
    }, [])


    return (
        <div className="w-full min-h-screen flex">
            <div className="flex flex-col gap-6 p-8 w-full max-w-7xl">
                <div className="max-w-xl w-full rounded-xl p-6 border border-amber-300/10 bg-zinc-900/30 flex flex-col gap-1.5">
                    <h1 className="text-2xl font-semibold text-zinc-100">Your transactions</h1>
                    <p className="text-sm text-zinc-400">View all your transactions below</p>
                </div>

                <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-xl min-h-[400px] scroll-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {transactions.length === 0 && (withdrawals?.length ?? 0) === 0 && (
                            <div className="col-span-full text-center py-12 text-zinc-500">
                                No transactions yet.
                            </div>
                        )}

                        {transactions.map((transaction) => (
                            <TransactionCard key={`t-${transaction.id}`} transaction={transaction} />
                        ))}

                        {withdrawals?.map((withdraw) => (
                            <WithdrawalCard key={`w-${withdraw.id}`} withdraw={withdraw} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transactions