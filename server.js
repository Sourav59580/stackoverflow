const express = require('express');
const bodyparser = require('body-parser');




const app = express();
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App is running at ${port}`);
})

app.get("/",(req,res)=>{
    res.send("hello sourav");
})