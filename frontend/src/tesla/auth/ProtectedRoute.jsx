import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
    const { userData, loading } = useAuth();

    if (loading || userData === null) return <div className="w-full min-h-screen flex items-center justify-center text-center bg-gray-200">
        <h2 className="text-center text-blue-600 text-xl font-semibold">Loading...</h2>
    </div>
    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedRoute