import { useState, useEffect, useCallback, useContext, createContext } from "react";
import { API } from "../../constants/API";

const TeslaQueryContext = createContext();

const QueryContextProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // error handle func
    const handelAxiosError = (errorMessage) => {
        if (errorMessage.response) {
            setError(errorMessage.response.data.detail);
        } else if (errorMessage.request) {
            setError(errorMessage.request);
        } else {
            setError("Server could not be reached.");
        }
    }

    const handleFetchVehicles = useCallback(async() => {
        setError("");
        setLoading(true);

        try{
            const response = await API.get("/vehicles/");
            setVehicles(response.data);
        } catch (error) {
            handelAxiosError(error);
        } finally{
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        handleFetchVehicles();
    }, [])

    return <TeslaQueryContext value={{handleFetchVehicles, vehicles}}>
        {children}
    </TeslaQueryContext>

}

export default QueryContextProvider;
export const useTeslaQueryContext = () => useContext(TeslaQueryContext);