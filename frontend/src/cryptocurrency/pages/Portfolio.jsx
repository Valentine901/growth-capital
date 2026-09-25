
const Portfolio = () => {

const portfolioCard = [
    { image: "src/assets/metal-gold.png", label: "Precious Metals & Gold", desc: "We secure tangible wealth by investing in physical gold bullion and other precious metals. This serves as a timeless hedge against inflation and market volatility, forming the bedrock of a stable portfolio.", revenueGeneration: "Profits are generated from the long-term appreciation of metal prices, strategic arbitrage in global markets, and secured lending against our physical reserves" },

    {
      image: "src/assets/factory-manufacturing.webp",
      label: "Advanced Manufacturing",
      desc: "We invest in the engine of the global economy by taking equity stakes in innovative manufacturing firms, focusing on robotics, sustainable technologies, and efficient supply chains that produce high-value goods.",
      revenueGeneration: "Returns come from the growth and profitability of our partner companies, generating dividends, and capital appreciation from our equity holdings."
    },

    {
      image: "src/assets/agric-factory.webp",
      label: "Global Agriculture",
      desc: "We invest in the future of food by financing sustainable agriculture projects and Agri-Tech innovations. Our focus is on enhancing crop yields, improving food distribution, and securing a vital global resource.",
      revenueGeneration: "Profit is derived from commodity trading, appreciation of land assets, and investing in Agri-Tech companies that are revolutionizing the food supply chain."
    },

    {
      image: "src/assets/trade-digital-asset.webp",
      label: "Crypto & Digital Assets",
      desc: "We navigate the frontier of finance by strategically trading and holding a diversified portfolio of leading digital assets like Bitcoin and Ethereum. Our approach balances long-term growth potential with active trading strategies.",
      revenueGeneration: "Income is generated through capital gains from price appreciation, staking and yield farming rewards, and high-frequency arbitrage trading across various exchanges."
    },

    {
      image: "src/assets/forext-trading.avif",
      label: "Forex Trading",
      desc: "Our expert analysts operate in the world's largest financial market—Foreign Exchange. We leverage geopolitical insights and quantitative analysis to trade major and minor currency pairs, capitalizing on global economic shifts.",
      revenueGeneration: "Profits are realized from capturing the spread between currency pairs (pips), executing speculative trades based on market volatility, and providing hedging services."
    },


  ];


  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-6 py-24 flex gap-8 flex-col min-h-screen">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-300 px-6 md:px-12">Our Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full px-6 md:px-12">
            {portfolioCard.map((card) => (
              <div key={card.label} className="max-w-xl w-full border border-amber-300/10 bg-[#080808]/90 overflow-hidden flex flex-col justify-between rounded-lg mx-auto">
                <div className="mx-auto">
                  <img className="w-full h-58 object-cover rounded-t-lg" src={card.image} alt={card.label} />
                  <div className="p-4 flex flex-col w-full">
                    <h2 className="text-amber-200 text-xl font-bold mb-2 px-3">{card.label}</h2>
                    <p className="text-gray-300 px-3 text-sm md:text-base leading-relaxed">{card.desc}</p>

                    <hr className="border-amber-300/10 my-6 mx-3" />

                    <h2 className="text-amber-200 text-xl font-bold mb-2 px-3">How We Generate Returns:</h2>
                    <p className="text-gray-300 px-3 text-sm md:text-base leading-relaxed">{card.revenueGeneration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
  )
}

export default Portfolio