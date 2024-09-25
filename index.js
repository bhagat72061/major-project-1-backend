const express=require('express');
const cookieParser=require('cookie-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const app=express();
const port= 8000;
const expressLayouts= require('express-ejs-layouts');
const db=require('./config/mongoose');


app.use(express.urlencoded({extended:true}));

 app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts  from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//use expresss router
app.use('/', require('./routes'));

// set up view engine
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,function(err){
    if(err){
        console.log(`error in running th server: ${err}`);
        return;
    }
    console.log(`server is running on port:${port}`);

});