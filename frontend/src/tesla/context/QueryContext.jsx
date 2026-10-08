import { useState, useEffect, useCallback, useContext, createContext } from "react";
import { API } from "../../constants/API";

import tesla_v1 from "../../assets/tesla-images/premium_electric_sudan.jpg";
import tesla_SUV from "../../assets/tesla-images/premium_electric_suv.jpg";
import tesla_GT from "../../assets/tesla-images/sports_car_gt.jpg";

const TeslaQueryContext = createContext();

const QueryContextProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState([
        
        {
            id: "v1", name:"Performance Sedan", model:"TESLA NEURALINK V1", price: "$23,300", desc:"Premium electric sedan engineered for luxury and performance", image:tesla_v1

        },

        {
            id: "x", name:"Premium SUV", model:"TESLA NEURALINK X", price: "$35,600", desc:"Versatile electric SUV designed for adventure and family", image: tesla_SUV
        },

        {
            id: "gt", name:"Performance Flagship", model:"TESLA NEURALINK GT", price: "$48,500", desc:"High-performance flagship that pushes boundaries", image:tesla_GT
        },

    ]);



    return <TeslaQueryContext value={{vehicles}}>
        {children}
    </TeslaQueryContext>

}

export default QueryContextProvider;
export const useTeslaQueryContext = () => useContext(TeslaQueryContext);