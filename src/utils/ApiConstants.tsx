export const BASE_URL =
  'https://api.nomics.com/v1/currencies/ticker?key=5ac5549f79f68746ca153cc3b80ac978f4356a0f&ids=HEX,NEXO,BCH,WBTC,PAXG,TIME5';
export const BASE_URL2 = 'https://api.coinstats.app/public/v1';
export const CRYPTO_PRICES = '/coins?currency=INR';
export const CRYPTO_NEWS = '/news';
export const STOCK_SITE = 'https://www.nseindia.com/';
export const PI_SITE = 'https://minepi.com/';
export const NFT_SITE = 'https://ethereum.org/en/nft/';
export const CRYPTO_SITE = 'https://crypto.com/';

export namespace STOCK_MARKET {
  export const STOCK_BASE_URL = 'https://finnhub.io/api/v1/';
  export const STOCK_NEWS_ENDPOINT = 'news?category=general&token=';
  export const STOCK_AUTH_KEY = 'cddvlr2ad3i4an25vli0cddvlr2ad3i4an25vlig';
}

export namespace NFT_APIS {
  export const NFT_BASE_URL = 'https://eth-mainnet.g.alchemy.com/nft/v2/';
  export const NFT_AUTH_KEY = 'J8b5EeSaKvp2OWnVKHav0tHcEg_3EZT1';
  export const GET_NFTS = 'getNFTs?owner=vitalik.eth';
}

export namespace BLOCK_DAEMON_NFT_APIS {
  export const NFT_BASE_URL =
    'https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/'; //ethereum = protocol , mainnet = network
  export const NFT_AUTH_KEY =
    'IrXIh8C2ItgpSIqvG1jD62q-ATQCZTMaKni3KOoEfKFgfIaR';
  export const NFT_COLLECTIONS = 'collections';
  export const NFT_ASSETS = 'assets';
}

//68a8d5ec-fa98-48ed-8f03-c42175d25622
//i7IFV8tnDZVkWnkbJNHBOhDfuHOyIMV4Xbf28shRikTc95YY

//IrXIh8C2ItgpSIqvG1jD62q-ATQCZTMaKni3KOoEfKFgfIaR

export const ADD_FUNDS_STRIPE = 'https://buy.stripe.com/bIY5krfKweVt8ZGdQR';

export namespace STRIPE {
  export const STRIPE_BASE_URL = 'https://api.stripe.com';
  export const LIST_ALL_PAYMENT = '/v1/payment_intents';
  export const LIST_ALL_CUSTOMER = '/v1/customers';
  export const TEST_SECRET_KEY =
    'sk_test_51LwrSPSAVqByLrShuSgGTzZW4s9fATSBwlGph1PzKhySvG9SYAYrj8HcLkhClzKrkM5SNKHEh1RxY2oWLJInsQej00ppGKdcGD';
  export const LIVE_SECRET_KEY =
    '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';
  export const PUBLISHABLE_KEY =
    'pk_test_51LwrSPSAVqByLrShxT1jdk9c8CPUbDW79MLodqzY11Gj7gRMVPRMRsx9omZcmRdd5SKaRHNjHFjREaXALaEyCQKf00eHMi72sg';
}
export namespace SCREEN_TITLE {
  export const Home_Title = 'Home';
  export const Profile_Title = 'Profile';
  export const News_Title = 'News';
  export const News_Details_Title = 'News Details';
  export const Prices_Title = 'Prices';
}

export namespace HOME_SCREEN {
  export const referAndEarn = 'Refer & earn ₹20 per referral';
  export const referAndEarnTitle = 'Refer & Earn';
  export const haveCouponCode = 'Have Coupon Code?';
  export const claimYourReward = 'Claim your reward';
  export const modernEraAstraS = "Modern Era Astra's";
  export const services = 'Services';
  export const apply = 'Apply';
  export const welcome = 'Welcome';
}

export namespace GA_CARD {
  export const myCoins = 'My Coins';
  export const staticGaCoins = 'Ga 1,000';
  export const staticMyFunds = '₹ 700';
  export const myFunds = 'My Funds';
  export const viewCard = 'View Card';
  export const visa = 'VISA';
  export const platinum = 'Platinum';
  export const expiry = 'EXPIRY';
  export const expiryDate = '22/27';
  export const cvv = 'CVV';
  export const cvvNumber = '394';
  export const accNumber = '1234 5678 9000 1234';
}

export namespace GA_CARD_DESCRIPTION {
  export const cardDesc =
    'The Gyan Astra (GA) card is a virtual card which facilitates the user for depositing and withdrawal of funds,it can be used in online shopping and trading without any additional charges of deposit and withdrawal or any other annual charges.';
  export const usageLabel = 'Usage Of Ga Card';
  export const use1 = 'Shopping';
  export const use2 = 'Trading';
  export const benefitLabel = 'Benefits Of Ga Card';
  export const benefit1 = 'No Annual charge';
  export const benefit2 = 'No Deposit Charge';
  export const benefit3 = 'No Withdrawal Charge';
}

export namespace COIN_BOTTOM_SHEET {
  //   currencyINR: '₹',
  //   percentage: '%',
  export const coinPerformance = 'Coin Performance';
  export const priceChange1Day = 'Price Change 1 Day';
  export const priceChange1Hour = 'Price Change 1 Hour';
  export const priceChange1Week = 'Price Change 1 Week';
  export const coinRank = 'Rank';
}

export namespace DESCRIPTION {
  export const WHAT_IS_STOCK = 'What Is the Stock Astra?';
  export const STOCK_DESC =
    'The term stock market refers to several exchanges in which shares of publicly held companies are bought and sold. Such financial activities are conducted through formal exchanges and via over-the-counter (OTC) marketplaces that operate under a defined set of regulations. \n' +
    '\n' +
    'Both “stock market” and “stock exchange” are often used interchangeably. Traders in the stock market buy or sell shares on one or more of the stock exchanges that are part of the overall stock market';

  export const KEY_LABEL = 'KEY TAKEAWAYS';
  export const KEY_STOCK_1 =
    '• Stock markets are venues where buyers and sellers meet to exchange equity shares of public corporations.';
  export const KEY_STOCK_2 =
    '• Stock markets are screens of a free-market economy because they enable democratized access to investor trading and exchange of capital.';
  export const KEY_STOCK_3 =
    '• Stock markets create efficient price discovery and efficient dealing.';

  export const WHAT_IS_PI = 'What Is the PI Astra?';
  export const PI_DESC =
    'Pi Network is a digital currency project that aims to keep cryptocurrency mining accessible, as the centralisation of first-generation currencies like Bitcoin (BTC) has put mining them beyond the reach of many everyday users.\n' +
    '\n' +
    'The Pi Network, developed by a team of Stanford University graduates, enables users to mine PI cryptocurrency coins using its desktop and mobile phone apps, validating transactions on a distributed record.\n' +
    '\n' +
    'Unlike nodes on networks such as Bitcoin that use proof-of-work (PoW) protocols, Pi nodes use an algorithm based on the Stellar Consensus Protocol (SCP). Pi Nodes validate transactions on a distributed ledger and reach a consensus on the order of new transactions that the ledger records.\n';

  export const KEY_PI_1 =
    '• As with other cryptos such as Bitcoin, Pi was designed to undergo regular ‘halving’ to protect its scarcity. Halving is when the number of coins a miner receives for processing new transactions is reduced by half. This usually occurs when a certain milestone is reached.';
  export const KEY_PI_2 =
    '• PI’s mining rate halved from 1.6 π to 0.8 π an hour when it reached 100,000 users, halved again to 0.4 π an hour when it reached 1 million, and halved again to 0.2 π when it reached 10 million users. The rewards will continue to halve, reaching zero when the network reaches 1 billion users';
  export const WHAT_IS_NFT = 'What Is the nft Astra?';
  export const NFT_DESC =
    'nft means non-fungible tokens (NFTs), which are generally created using the same type of programming used for cryptocurrencies. In simple terms these cryptographic assets are based on blockchain technology. They cannot be exchanged or traded equivalently like other cryptographic assets.\n' +
    '\n' +
    'Like Bitcoin or Ethereum. The term nft clearly represents it can neither be replaced nor interchanged because it has unique properties. Physical currency and cryptocurrency are fungible, which means that they can be traded or exchanged for one another.';
  export const KEY_NFT_1 =
    '• Digital Asset - nft is a digital asset that represents Internet collectibles like art, music, and games with an authentic certificate created by blockchain technology that underlies Cryptocurrency.';
  export const KEY_NFT_2 =
    '• Unique - It cannot be forged or otherwise manipulated';
  export const KEY_NFT_3 =
    '• Exchange - nft exchanges take place with cryptocurrencies such as Bitcoin on specialist sites';
  export const WHAT_IS_CRYPTO = 'What Is the Crypto Astra?';
  export const CRYPTO_DESC =
    "Cryptocurrency is a digital payment system that doesn't rely on banks to verify transactions. It’s a peer-to-peer system that can enable anyone anywhere to send and receive payments. Instead of being physical money carried around and exchanged in the real world, cryptocurrency payments exist purely as digital entries to an online database describing specific transactions. When you transfer cryptocurrency funds, the transactions are recorded in a public ledger. Cryptocurrency is stored in digital wallets.\n" +
    '\n' +
    'Cryptocurrency received its name because it uses encryption to verify transactions. This means advanced coding is involved in storing and transmitting cryptocurrency data between wallets and to public ledgers. The aim of encryption is to provide security and safety.\n' +
    '\n' +
    'The first cryptocurrency was Bitcoin, which was founded in 2009 and remains the best known today. Much of the interest in cryptocurrencies is to trade for profit, with speculators at times driving prices skyward.';

  export const KEY_CRYPTO_1 =
    '• They are secured by cryptography codes and locked using a public cryptographic system. Every owner has a private key. So, no one can access that private key other than the owner.';
  export const KEY_CRYPTO_2 =
    '• One of their disadvantages is the irreversibility of transactions';
  export const KEY_CRYPTO_3 =
    '• There is no need for permission: You do not need to take a permit from anybody while using it';
  export const KEY_CRYPTO_4 =
    '• Super-fast: Another great feature is that they are super-fast. If you initiate a transaction, it is immediately caught up in the network and confirmed within two minutes.';
  export const KEY_CRYPTO_5 =
    '• These currencies do not care about the specific location: Cryptocurrencies do not care about the owner’s physical location';
}

export namespace SERVICE_DATA {
  export const DEPOSIT_FUND = 'Deposit Funds';
  export const WITHDRAW_FUND = 'Withdraw Funds';
  export const PRICE_ALERTS = 'Price Alerts';
  export const ORDERS = 'Orders';
  export const LEND_AND_EARN = 'Lend and Earn';
  export const EXCHANGE_COINS = 'Exchange Coins';
}

export namespace OTHER_ASTRAS {
  export const NFT_ASTRA = 'nft Astra';
  export const CRYPTO_ASTRA = 'Crypto Astra';
  export const PI_ASTRA = 'PI Astra';
  export const STOCK_ASTRA = 'Stock Astra';
}

export namespace TOAST_MSG {
  export const COMING_SOON = 'Coming Soon';
}

export namespace USER_SAVED {
  export const USER = 'user';
}
