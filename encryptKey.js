require("dotenv").config();
const ethers = require("ethers");
const fs = require("fs-extra");

async function encryptKey() {
    const wallet = new ethers.Wallet(process.env.TEST_PRIVATE_KEY);

    const encryptedKey = await wallet.encrypt(process.env.TEST_PASSWORD);

    console.log(encryptedKey);

    fs.writeFileSync("./.encryptedJson.json", encryptedKey);
}

encryptKey();
