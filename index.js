const express = require('express');
const cors = require('cors');
const {fetchData} = require('./fetchData/index.js')
const topRouter = require('./routes/index');

setInterval(() => {
    fetchData("usd")
},1000*10);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/",topRouter);
app.listen(8080)

