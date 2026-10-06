import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
    const { userData, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <p className="text-gray-600 font-heading animate-spin font-bold">
                    <Loader2 size={64} />
                </p>
            </div>
        );
    }

    if(!userData || userData === null) return <Navigate to="/account" />;

    return children;
}

export default ProtectedRoute