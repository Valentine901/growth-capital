import React from "react";
import {
    Bitcoin,
    Coins,
    CircleDollarSign,
    Gem,
} from "lucide-react";


const CryptoNavbar = () => {

    const cryptoData = [
        {
            symbol: "SOL",
            price: "$114.62",
            change: "2.95%",
            icon: Coins,
        },
        {
            symbol: "ADA",
            price: "$0.2385",
            change: "4.94%",
            icon: CircleDollarSign,
        },
        {
            symbol: "GOLD",
            price: "$4,290.01",
            change: "1.51%",
            icon: Gem,
        },
        {
            symbol: "BTC",
            price: "$84,498.00",
            change: "2.05%",
            icon: Bitcoin,
        },
        {
            symbol: "ETH",
            price: "$2,678.07",
            change: "2.58%",
            icon: Coins,
        },
        {
            symbol: "XRP",
            price: "$1.50",
            change: "4.61%",
            icon: CircleDollarSign,
        },
        {
            symbol: "SOL",
            price: "$114.62",
            change: "2.95%",
            icon: Coins,
        },
        {
            symbol: "ADA",
            price: "$0.2385",
            change: "4.94%",
            icon: CircleDollarSign,
        },
    ];


    // Reusable crypto item
    const CryptoItem = ({ crypto }) => {

        const Icon = crypto.icon;

        return (
            <div className="crypto-item">

                {/* Cryptocurrency icon */}
                <Icon
                    className="crypto-icon"
                    size={14}
                    strokeWidth={2}
                />

                {/* Symbol */}
                <span className="crypto-symbol text-[10px]">
                    {crypto.symbol}
                </span>

                {/* Price */}
                <span className="crypto-price text-[10px]">
                    {crypto.price}
                </span>

                {/* Percentage change */}
                <span className="crypto-change text-[10px]">
                    ▼ {crypto.change}
                </span>

                {/* Divider */}
                <span className="crypto-divider">
                    •
                </span>

            </div>
        );
    };


    return (
        <div className="crypto-navbar z-9999 fixed -top-3  bg-black px-4 py-6 text-white sm:px-6  w-full">

            <div className="crypto-track">

                {/* First set */}
                <div className="crypto-group">

                    {cryptoData.map((crypto, index) => (
                        <CryptoItem
                            key={`first-${index}`}
                            crypto={crypto}
                        />
                    ))}

                </div>


                {/* Duplicate set
                    This creates the seamless loop */}
                <div
                    className="crypto-group"
                    aria-hidden="true"
                >

                    {cryptoData.map((crypto, index) => (
                        <CryptoItem
                            key={`second-${index}`}
                            crypto={crypto}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
};

export default CryptoNavbar;