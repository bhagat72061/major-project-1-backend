// const passport=require('passport');

// const LocalStrategy= require('passport-local').Strategy;
// const User= require('../models/user');

// // //authentication using passport
// // passport.use(new LocalStrategy({
// //     usernameField:'email'
// //     },
// //     function(email,password, done){
// //         //find a user and establish the identity
// //         User.findOne({email:email},function(err,user){
// //             if(err){
// //                 console.log('error in finding user -->passport');
// //                 return done(err);
// //             }
// //             if(!user || user.password !=password){
// //                 console.log('invalid username /password');
// //                 return done (null,false);
// //             }
// //             return done(null,user);
// //         });
// //     }

// // ));

// //gpt
// passport.use(new LocalStrategy({
//     usernameField: 'email' // Field to identify the user
// }, async (email, password, done) => { // Change this to async
//     try {
//         // Find a user by email
//         const user = await User.findOne({ email: email });

//         if (!user) {
//             console.log('Invalid username/password');
//             return done(null, false, { message: 'Invalid username/password' });
//         }

//         // Compare the provided password with the hashed password
//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//             console.log('Invalid username/password');
//             return done(null, false, { message: 'Invalid username/password' });
//         }

//         // User authenticated successfully
//         return done(null, user);
//     } catch (err) {
//         console.log('Error in finding user --> passport:', err);
//         return done(err);
//     }
// }));

// //serializing the user to decide which key is to be kept in cookies
// passport.serializeUser(function(user,done){
//     done(null,user.id);
// });

// // deserializing the user from the key in the cookies
// passport.deserializeUser(function(id,done){
//     User.findById(id,function(err,user){
//         if(err){
//             console.log('error in finding user -->passport');
//             return done(err);
//         }
//         return done(null,user);
//     });
// });


// module.exports=passport

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email' // Field to identify the user
}, async (email, password, done) => { 
    try {
        // Find a user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            console.log('Invalid username/password');
            return done(null, false, { message: 'Invalid username/password' });
        }

        // Compare the provided password directly without hashing
        if (user.password !== password) {
            console.log('Invalid username/password');
            return done(null, false, { message: 'Invalid username/password' });
        }

        // User authenticated successfully
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> passport:', err);
        return done(err);
    }
}));

//serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// deserializing the user from the key in the cookies
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//         if (err) {
//             console.log('error in finding user -->passport');
//             return done(err);
//         }
//         return done(null, user);
//     });
// });

// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(new Error('User not found'));
        }
        return done(null, user);
    } catch (err) {
        console.log('error in finding user -->passport:', err);
        return done(err);
    }
});

//check if the user is authenticated 
passport.checkAuthentication = function(req,res,next){
    //if user is signed in , then pass on the request to the nest function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next();
}


module.exports = passport;
