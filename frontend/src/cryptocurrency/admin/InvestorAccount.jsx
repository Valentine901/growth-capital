import { useState, useEffect } from "react";
import { APIInvest } from "../../constants/API";
import { ChartNoAxesCombined } from "lucide-react";
import TransactionCard from "./InvestorTransactionUpdate";

const InvestorAccount = ({ investor }) => {
  // /admin-view-user-transactions

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleFetchTransactions();
  }, [])

  const handleFetchTransactions = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await APIInvest.get(`/transactions/admin-view-user-transactions/${investor.id}`)
      setTransactions(response.data);
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

    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-xl min-h-[400px] scroll-auto">
      <div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {transactions.length === 0 ? (
            <div className="col-span-full text-center py-12 text-zinc-500">
              No active transactions yet.
            </div>
          ) : (
            transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
              />
            ))
          )}
        </div>

      </div>

    </div>
  )
}

export default InvestorAccount