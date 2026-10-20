import { useState, useEffect } from "react";
import { APIInvest } from "../../constants/API";

const STATUS_STYLES = {
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
  cancelled: "bg-zinc-800 text-zinc-400 border-zinc-700",
};

const TYPE_STYLES = {
  deposit: { icon: "↓", style: "bg-emerald-500/10 text-emerald-400" },
  withdrawal: { icon: "↑", style: "bg-red-500/10 text-red-400" },
};

const formatDate = (value) => {
  if (!value) return "—";
  const str = String(value);
  const hasTimezone = /(Z|[+-]\d{2}:?\d{2})$/i.test(str);
  const date = new Date(hasTimezone ? str : `${str}Z`);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const TransactionCard = ({ transaction }) => {
  const { transaction_type, amount, created_at } = transaction;

  const initialStatus = String(transaction.payment_status || "").toLowerCase();
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [selected, setSelected] = useState(initialStatus);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const type = String(transaction_type || "").toLowerCase();
  const status = currentStatus;

  const typeInfo = TYPE_STYLES[type] || { icon: "•", style: "bg-zinc-800 text-zinc-400" };
  const statusStyle = STATUS_STYLES[status] || "bg-zinc-800 text-zinc-400 border-zinc-700";

  const formattedAmount = Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await APIInvest.put(
        `/transactions/update-transaction-status/${transaction.id}`,
        null,
        { params: {payment_status: selected }}
      );
      setCurrentStatus(selected);
      setSuccess("Status updated");
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(
        typeof detail === "string"
          ? detail
          : detail?.[0]?.msg ?? "Could not update status"
      );
    } finally {
      setLoading(false);
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            if (error || success){
                setError("");
                setSuccess("");
            }
        }, 3500)
        return () => clearTimeout(timer);
    }, [error || success])

  };

  

  return (
    <div className="w-full p-5 rounded-xl border border-amber-300/10 bg-zinc-950 hover:border-amber-300/40 transition-all flex flex-col gap-4">
      {/* Top row: type + status */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-lg font-bold ${typeInfo.style}`}
          >
            {typeInfo.icon}
          </span>
          <span className="text-sm font-semibold text-zinc-200 capitalize truncate">
            {type || "Transaction"}
          </span>
        </div>

        <span
          className={`px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${statusStyle}`}
        >
          {status || "unknown"}
        </span>
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
          Amount
        </span>
        <span className="text-2xl sm:text-3xl font-semibold text-zinc-100 break-all">
          {formattedAmount}
        </span>
      </div>

      {/* Created at */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-800">
        <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
          Transaction made on
        </span>
        <span className="text-xs sm:text-sm text-zinc-400 text-right">
          {formatDate(created_at)}
        </span>
      </div>

      {/* Change status */}
      <div className="flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="py-2 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 focus:outline-none focus:border-amber-300"
          >
            <option value="pending">PENDING</option>
            <option value="completed">COMPLETED</option>
            <option value="failed">FAILED</option>
            <option value="cancelled">CANCELLED</option>
          </select>
          <button
            type="submit"
            disabled={loading || selected === currentStatus}
            className="py-2 px-6 rounded-full bg-zinc-800 hover:bg-zinc-900 disabled:opacity-50 transition duration-300 text-sm text-zinc-200"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
        {success && <p className="text-xs text-emerald-400">{success}</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default TransactionCard;









export const WithdrawalCard = ({ withdrawal }) => {
  const { amount, created_at } = withdrawal;
  const withdrawal_type = "Withdrawal";
  const initialStatus = String(withdrawal.payment_status || "").toLowerCase();
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [selected, setSelected] = useState(initialStatus);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const type = String(withdrawal_type || "").toLowerCase();
  const status = currentStatus;

  const typeInfo = TYPE_STYLES[type] || { icon: "•", style: "bg-zinc-800 text-zinc-400" };
  const statusStyle = STATUS_STYLES[status] || "bg-zinc-800 text-zinc-400 border-zinc-700";

  const formattedAmount = Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await APIInvest.put(
        `/withdrawals/update-withdrawal-status/${withdrawal.id}`,
        null,
        { params: {payment_status: selected }}
      );
      setCurrentStatus(selected);
      setSuccess("Status updated");
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(
        typeof detail === "string"
          ? detail
          : detail?.[0]?.msg ?? "Could not update status"
      );
    } finally {
      setLoading(false);
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            if (error || success){
                setError("");
                setSuccess("");
            }
        }, 3500)
        return () => clearTimeout(timer);
    }, [error || success])

  };

  

  return (
    <div className="w-full p-5 rounded-xl border border-amber-300/10 bg-zinc-950 hover:border-amber-300/40 transition-all flex flex-col gap-4">
      {/* Top row: type + status */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-lg font-bold ${typeInfo.style}`}
          >
            {typeInfo.icon}
          </span>
          <span className="text-sm font-semibold text-zinc-200 capitalize truncate">
            {type || "Withdrawal"}
          </span>
        </div>

        <span
          className={`px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${statusStyle}`}
        >
          {status || "unknown"}
        </span>
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
          Amount
        </span>
        <span className="text-2xl sm:text-3xl font-semibold text-zinc-100 break-all">
          {formattedAmount}
        </span>
      </div>

      {/* Created at */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-800">
        <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
          Withdrawal made on
        </span>
        <span className="text-xs sm:text-sm text-zinc-400 text-right">
          {formatDate(created_at)}
        </span>
      </div>

      {/* Change status */}
      <div className="flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="py-2 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 focus:outline-none focus:border-amber-300"
          >
            <option value="pending">PENDING</option>
            <option value="completed">COMPLETED</option>
            <option value="failed">FAILED</option>
            <option value="cancelled">CANCELLED</option>
          </select>
          <button
            type="submit"
            disabled={loading || selected === currentStatus}
            className="py-2 px-6 rounded-full bg-zinc-800 hover:bg-zinc-900 disabled:opacity-50 transition duration-300 text-sm text-zinc-200"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
        {success && <p className="text-xs text-emerald-400">{success}</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
};

