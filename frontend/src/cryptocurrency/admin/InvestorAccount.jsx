import { useState, useEffect } from "react";
import { APIInvest } from "../../constants/API";
import TransactionCard from "./InvestorTransactionUpdate";
import { WithdrawalCard } from "./InvestorTransactionUpdate";

const InvestorAccount = ({ investor }) => {
  // /admin-view-user-transactions

  const [transactions, setTransactions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleFetchTransactions();
    handleFetchInvestorWithdrawals()
  }, [])

  const handleFetchInvestorWithdrawals = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await APIInvest.get(`/withdrawals/admin-view-user-withdrawals/${investor.id}`)
      setWithdrawals(response.data);
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
          {transactions.length === 0 && (withdrawals?.length ?? 0) === 0 && (
            <div className="col-span-full text-center py-12 text-zinc-500">
              No transactions yet.
            </div>
          )}

          {transactions.map((transaction) => (
            <TransactionCard key={`t-${transaction.id}`} transaction={transaction} />
          ))}

          {withdrawals?.map((withdraw) => (
            <WithdrawalCard key={`w-${withdraw.id}`} withdrawal={withdraw} />
          ))}
        </div>

      </div>

    </div>
  )
}

export default InvestorAccount