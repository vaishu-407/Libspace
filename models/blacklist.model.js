
const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
 token:String
});

module.exports = mongoose.model("Blacklist",blacklistSchema);
