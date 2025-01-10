const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Coin = require('../db.js');

const topRouter = express.Router();

mongoose.connect(process.env.MONGO_URL);

topRouter.get("/stats", async (req, res) => {
    const coin_id = req.query.coin;

    if (!coin_id){
        res.status(400).json({error : "No coin provided"});
        return;
    }

    try{
        const coinData = await Coin.findOne({coin_id}).sort({last_updated : -1});
    
        if (!coinData){
            res.status(404).json({error : "Coin not found"});
            return;
        }

        const response = {
            price : coinData.current_price,
            marketCap : coinData.market_cap,
            "24hChange" : coinData.price_change_24h
        }
    
        res.status(200).json(response);
    }catch(e){
        res.status(500).json({error : e.message});
    }
})

topRouter.get("/deviation", async (req, res) => {
    const coin_id = req.query.coin;
    if (!coin_id){
        res.status(400).json({error : "No coin provided"});
        return;
    }

    try{
        const coinData = await Coin.find({coin_id}).select('current_price last_updated').sort({last_updated : -1}).limit(100);

        if (!coinData){
            res.status(404).json({error : "Coin not found"});
            return;
        }

        let mean = coinData.reduce((a,b) => a + b.current_price, 0) / coinData.length;
        let deviation = coinData.map(coin => Math.abs(coin.current_price - mean));
        let stdDev = Math.sqrt(deviation.reduce((a,b) => a + (b**2),0) / deviation.length) ;


        res.status(200).json({
            deviation : stdDev
        });

    }catch(e){
        res.status(500).json({error : e.message});
    }
})

module.exports = topRouter;