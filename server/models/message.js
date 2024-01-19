const mongoose = require("mongoose")
const massageScheema = new mongoose.Schema({
    title: String,
    file: String,
    sender: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    recipient:{type:mongoose.Schema.Types.ObjectId, ref: "User"}
},
{
    timestamps: true,
},
);
const massageModel = model("massage" , massageSchema);
module.exports = PostmassageModel;