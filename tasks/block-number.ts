import { task } from "hardhat/config";

task("block-number", "print the current block number").setAction(
    async (taskArgs, hre) => {
        // hre = hardhat runtime enviroment
        const blockNumber = await hre.ethers.provider.getBlockNumber();

        console.log(`curent block: ${blockNumber}`);
    }
);

export default task;
