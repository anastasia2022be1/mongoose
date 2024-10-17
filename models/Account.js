import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    premiumMember: Boolean,
    memberSince: String,
    accountActive: Boolean
});

const Account = mongoose.model("Account", accountSchema);

export default Account;