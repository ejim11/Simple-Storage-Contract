import { ethers } from "hardhat";
import { assert } from "chai";
import { SimpleStorage } from "../typechain-types";
import { SimpleStorage__factory } from "../typechain-types/factories";

describe("SimpleStorage Contract", function () {
    let SimpleStorageFactory: SimpleStorage__factory,
        simpleStorageContract: SimpleStorage;

    beforeEach(async function () {
        SimpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory;
        simpleStorageContract = await SimpleStorageFactory.deploy();
        await simpleStorageContract.deployed();
    });

    it("shouldl start with a favourite number of 1323", async function () {
        const currentValue = await simpleStorageContract.retrieve();
        const expectedValue: any = 1323;
        assert.equal(
            currentValue.toString(),
            expectedValue,
            "value is not 1323"
        );
    });

    it("should modify the value of the favourite number", async function () {
        const value: any = 77;
        await simpleStorageContract.store(value);

        const updatedValue = await simpleStorageContract.retrieve();

        assert.equal(
            value,
            updatedValue.toString(),
            "favourite number was not modified"
        );
    });

    it("should add a new person", async function () {
        await simpleStorageContract.addPerson("frank", 245);

        const people = await simpleStorageContract.retrievePeople();

        console.log(people);
        assert.equal(people[0].name, "frank");
    });
});
