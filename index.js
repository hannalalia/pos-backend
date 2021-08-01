const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

//middlewares
app.use(cors())
//routes
app.get('/',(req,res)=>{
    res.send('Hello World')
});

app.listen(port, ()=>{
    console.log(`Listening on localhost:${port}`)
})