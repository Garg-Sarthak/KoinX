const mongoose = require('mongoose');

const dotenv = require('dotenv').config();
const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl);

const coinSchema = mongoose.Schema({
    coin_id : {type : String, index : true},
    current_price : Number,
    price_change_24h : Number,
    market_cap : Number,
    last_updated : {type : String, index : true}
})

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;