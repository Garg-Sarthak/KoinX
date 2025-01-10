const express = require('express');
const cors = require('cors');
const {fetchData} = require('./fetchData/index.js')
const topRouter = require('./routes/index');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);

setInterval( async () => {
   await fetchData("usd")
},1000*60*60*2);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/",topRouter);
app.listen(8080)

