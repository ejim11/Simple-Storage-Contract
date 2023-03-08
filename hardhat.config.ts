import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "@nomiclabs/hardhat-etherscan";
import "./tasks/block-number";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@typechain/hardhat";

/** @type import('hardhat/config').HardhatUserConfig */

const TEST_SEPOLIA_URL =
    process.env.TEST_SEPOLIA_URL || "https:\\eth-sepolia/example";
const TEST_PRIVATE_KEY = process.env.TEST_PRIVATE_KEY || "key";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY || "key";

module.exports = {
    defaultNetwork: "hardhat",
    solidity: "0.8.7",
    networks: {
        sepolia: {
            url: TEST_SEPOLIA_URL,
            accounts: [TEST_PRIVATE_KEY],
            chainId: 11155111,
            allowUnlimitedContractSize: true,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COIN_MARKET_CAP_API_KEY,
        token: "MATIC",
    },
};
