const STATUS_STYLES = {
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
};

const TYPE_STYLES = {
  deposit: { icon: "↓", style: "bg-emerald-500/10 text-emerald-400" },
  withdrawal: { icon: "↑", style: "bg-red-500/10 text-red-400" },
};

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const WithdrawalCard = ({ withdraw }) => {
  const { amount, created_at} = withdraw;

  const type = String("withdrawal").toLowerCase();
  const status = String("completed").toLowerCase();

  const typeInfo = TYPE_STYLES[type] || { icon: "•", style: "bg-zinc-800 text-zinc-400" };
  const statusStyle = STATUS_STYLES[status] || "bg-zinc-800 text-zinc-400 border-zinc-700";

  const formattedAmount = Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

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
    </div>
  );
};

export default WithdrawalCard;