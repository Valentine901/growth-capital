import PlanCard from "./PlanCard"
import { useInvestAuth } from "../context/AuthContext"


const Plans = () => {
    const { plans, loading } = useInvestAuth();


    if (!loading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
            {plans.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-zinc-950 border border-zinc-900 rounded-2xl text-zinc-500">
                    No active investment packages found.
                </div>
            ) : (
                plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} loading={loading} />
                ))
            )}
        </div>
    )

}

export default Plans