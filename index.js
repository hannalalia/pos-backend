const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware.js')

const app = express();
const port = process.env.PORT || 3001;
const tokenExpiry = 259200; //259200 seconds = 3 days
const createToken = (username,password)=>{
    return jwt.sign({username,password},'pos super secret token',{
        expiresIn:tokenExpiry
    })
}
//middlewares
app.use(cors())
app.use(cookieParser());
//routes
app.get('/',requireAuth,(req,res)=>{
    res.send('You are logged in.')
})
app.get('/signup',(req,res)=>{
    const token = createToken('hannalalia','test123')
    res.cookie('auth',token);
    res.json(token);
});
app.get('/login',(req,res)=>{
    const token = createToken('hannalalia','test123')
    res.cookie('auth',token);
    res.send('logging in')
});

app.listen(port, ()=>{
    console.log(`Listening on localhost:${port}`)
})