let mongoose = require('mongoose');

let giftmodel = mongoose.Schema({
    name:String,
    retailer:String,
    price:String,
    discount:String,
    },
    {
        collections:"gifts"
    }
);
module.exports = mongoose.model('gifts',giftmodel);

