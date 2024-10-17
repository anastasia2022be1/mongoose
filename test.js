import mongoose from "mongoose";
import Account from "./models/Account.js";

async function main() {
    await mongoose.connect("mongodb://localhost:27017/myDB");

    const newAccounts = await Account.insertMany([
        {
            premiumMember: true,
            memberSince: "2022",
            accountActive: true
        },

        {
            premiumMember: false,
            memberSince: "2019",
            accountActive: true
        }
    ], { rawResult: true });

    const accounts = await Account.find();
    console.log(accounts)
}

main();