import {useInvestAuth} from "../../cryptocurrency/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const InvestProtectedRoute = ({ children }) => {
    const { userData, loading } = useInvestAuth();
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <p className="text-amber-400 font-heading animate-spin font-bold">
                    <Loader2 size={64} />
                </p>
            </div>
        );
    }

    if(userData === null) return <Navigate to="/invest/login" />;

    return children;
}

export default InvestProtectedRoute