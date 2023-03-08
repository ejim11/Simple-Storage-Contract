import { ethers, run, network } from "hardhat";

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );

    const simpleStorageContract = await SimpleStorageFactory.deploy();

    await simpleStorageContract.deployed();

    console.log(`address: ${simpleStorageContract.address}`);
    console.log(network.config);
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorageContract.deployTransaction.wait(6);
        await verify(simpleStorageContract.address, []);
    }

    const currentValue = await simpleStorageContract.retrieve();

    console.log(`  current Value: ${currentValue} `);

    const txResponse = await simpleStorageContract.store(77);

    await txResponse.wait(1);

    const newValue = await simpleStorageContract.retrieve();

    console.log(`updated value: ${newValue}`);
}

// verification fxn
async function verify(contractAddress: string, args: any[]) {
    console.log("verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified");
        } else {
            console.log(e);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

//address:  0xF9452A0EA1F1557C7Fff03806b2Ba56514e1d436
