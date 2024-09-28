const express=require('express');
const cookieParser=require('cookie-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const app=express();
const port= 8000;
const expressLayouts= require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const { ModifiedPathsSnapshot } = require('mongoose');
const sassMiddleware= require('node-sass-middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded({extended:true}));

 app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts  from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




// set up view engine
app.set('view engine','ejs');
app.set('views','./views');

//after // mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //todo change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({    
        mongoUrl: 'mongodb://localhost/codeial_development',    
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use expresss router
app.use('/', require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`error in running th server: ${err}`);
        return;
    }
    console.log(`server is running on port:${port}`);

});