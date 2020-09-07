var express= require('express');
var app=express();
const router= express.Router();
const port = 8000;
app.use(express.urlencoded({extended:true}));
const bodyParser = require('body-parser');
//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));  
//passport and jwt
const passport=require('passport');
const passportJWT=require('./config/passport-jwt-strategy');
app.use(passport.initialize());

const db=require('./config/mongoose');
app.use('/api',require('./routes'));

//running app on port 8000
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running server:${err}`);
        return;
    }
    console.log(`App running at: ${port}`);
})