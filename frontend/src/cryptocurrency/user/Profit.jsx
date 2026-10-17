import { useInvestAuth } from "../../cryptocurrency/context/AuthContext";

const Profit = () => {
  const { loading, profits } = useInvestAuth();


  return (
    <div className="w-full min-h-screen flex">
      <div className="flex flex-col gap-6 p-8 w-full max-w-7xl">
        <div className="max-w-xl w-full rounded-xl p-6 border border-amber-300/10 bg-zinc-900/30 flex flex-col gap-1.5">
          <h1 className="text-2xl font-semibold text-zinc-100">Your Profits</h1>
          <p className="text-sm text-zinc-400">View all your investment profits</p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-xl min-h-[400px] scroll-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {loading && (
              <div className="col-span-full text-center py-12 text-zinc-500">
                Loading profits...
              </div>
            )}

            {!loading && profits.length === 0 && (
              <div className="col-span-full text-center py-12 text-zinc-500">
                No profits yet.
              </div>
            )}

            {profits.map((profit) => (
              <ProfitCard key={`t-${profit.id}`} profit={profit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profit

const ProfitCard = ({ profit }) => {
  const amount = Number(profit.total_amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const date = profit.created_at
    ? new Date(profit.created_at).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    : null;

  return (
    <div className="rounded-xl p-5 border border-amber-300/10 bg-zinc-900/60 hover:border-amber-300/30 transition-colors flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-zinc-500">
          Profit earned
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Credited
        </span>
      </div>

      <p className="text-3xl font-semibold text-emerald-400">+${amount}</p>

      <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-800 pt-3">
        <span>Investment #{String(profit.investment_id).slice(0, 8)}</span>
        {date && <span>{date}</span>}
      </div>
    </div>
  );
};