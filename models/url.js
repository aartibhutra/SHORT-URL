const mongoose = require('mongoose'); 

//Schema:
const urlSchema = new mongoose.Schema({
    shortId : {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timeStamp: { type: Number }}],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
},
    {timestamps: true}
);

const urls = mongoose.model('url',urlSchema);

module.exports = urls;