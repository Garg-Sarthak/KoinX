const axios = require('axios');
const mongoose = require('mongoose');
const Coin = require('../db.js');
const dotenv = require('dotenv').config();

const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl);

const fetchData = async(vs_currency) => {
    try{
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets",{params : {
            vs_currency,
            ids : "bitcoin,matic-network,ethereum"
        }})

        // res format = [{coin_id,...},{},{}]

        for (const coin of res.data){
            await Coin.create({
                coin_id : coin.id,
                current_price : coin.current_price,
                price_change_24h : coin.price_change_24h,
                market_cap : coin.market_cap,
                last_updated : coin.last_updated
            })
        }
    }catch(e){
        console.log(e);
    }
}
module.exports = fetchData;