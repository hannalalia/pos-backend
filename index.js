const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware.js');
const {sequelize, User, Sales} = require('./models');
const { v4 } = require('uuid')

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
app.use(express.json({extended:true}))
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
app.get('/logout',(req,res)=>{
    res.cookie('auth','',{maxAge:1});
    res.send('logged out')
});

app.get('/users',async (req,res)=>{
    try{
        const users = await User.findAll();
        return res.status(200).json(users);
    }catch(err){
        console.log(err);
        return res.status(400).json({error:"Something went wrong."})
    }
    
})
app.get('/users/:id',async (req,res)=>{
    const _id = req.params.id;
    try{
        const users = await User.findOne({
            where: { _id }
        });
        return res.status(200).json(users);
    }catch(err){
        console.log(err);
        return res.status(400).json({error:"Something went wrong."})
    }
    
})

app.post('/users',async(req,res)=>{
    const {username, email, password,firstName,lastName} = req.body;
    const _id = v4();
    try{
        const user = await User.create({
                _id,
                username,
                email, 
                password,
                firstName,
                lastName
        })
        return res.status(201).json(user);
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
})
app.delete('/users/:id',async (req,res)=>{
    const _id = req.params.id;
    try{
        await User.destroy({
            where: { _id }
        });
        return res.status(200).json({message:"User deleted successfuly."});
    }catch(err){
        console.log(err);
        return res.status(400).json({error:"Something went wrong."})
    }  
});
app.get('/sales',async(req,res)=>{
    try{
        const sales = await Sales.findAll();
        return res.status(200).json(sales);
    }catch(err){
        return res.status(400).json({error:"Something went wrong."});
    }
})
app.get('/sales/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const sales = await Sales.findOne({
            where:{
                transaction_id:id
            }
        });
        return res.status(200).json(sales);
    }catch(err){
        return res.status(400).json({error:"Something went wrong."});
    }
});

app.post('/sales',async(req,res)=>{
    const {transaction_datetime,transaction_total_price} = req.body;
    const transaction_id = v4();
    try{
        const sales = await Sales.create({
            transaction_id,
            transaction_datetime,
            transaction_total_price
        })
        return res.status(200).json(sales)

    }catch(err){
        res.status(400).json({error:"Something went wrong."});
    }
})

app.delete('/sales/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        await User.destroy({
            where:{
                transaction_id:id
            }
        });
        return res.status(200).json({message:"Sales transaction successfuly deleted."})
    }catch(err){
        return res.status(400).json({error:"Something went wrong."})
    }
})

app.listen(port, async ()=>{
    console.log(`Listening on localhost:${port}`);      
    await sequelize.authenticate().then(()=>{
        console.log('Database Connected.')
    }).catch(err=>{
        console.log('Database connection failed: ',err)
    })
})

