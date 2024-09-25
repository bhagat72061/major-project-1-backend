const User =require('../models/user');

module.exports.profile=function(req,res){
    //return res.end('<h1>user profile</h1>');
   return res.render('user_profile',{
        title: 'user profle'
})
};

// module.exports.post=function(req,res){
//     res.end('<h1>user post</h1>');
// }

//render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"codeial | Sign Up"
    })
};

//render the sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"codeial | Sign In"
    })
};


//get the sign up data
// module.exports.create=function(req,res){
//     //to do
//     if(req.body.password !=req.body.confirm_password){
//         return res.redirect('back');
//     }
//     User.findOne({email:req.body.email},function(err,user){
//         if(err){
//             console.log('error in finding user in signing up');
//             return;
//         }
//         if(!user){
//             User.create(req.body,function(err,res){
//                 if(err){
//                     console.log('error in creating user while signing up');
//                     return;
//                 } 
//                 return res.redirect('/user/sigin-in');
//             })
//         }else{
//             return(res.redirect('back'));
//         }
//     });
// }

// module.exports.create = async function(req, res) {
//     // to do
//     console.log(req.body);
//     if (req.body.password != req.body.confirm_password) {
//         return res.redirect('back');
//     }

//     try {
//         // Find if the user already exists
//         let user = await User.findOne({ email: req.body.email });
        
//         if (!user) {
//             // If user doesn't exist, create a new user
//             await User.create(req.body);
//             return res.redirect('/users/sign-in');
//         } else {
//             return res.redirect('back');
//         }
//     } catch (err) {
//         console.log('Error in finding/creating user:', err);
//         return res.redirect('back');
//     }
// };

module.exports.create = async function(req, res) {
    console.log(req.body);  // Log the body of the request to the console

    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            // Create a new user with the received body
            await User.create({
                name: req.body.name,          // Ensure the name is included
                email: req.body.email,        // Ensure the email is included
                password: req.body.password    // Ensure the password is included
            });
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in finding/creating user:', err);
        return res.redirect('back');
    }
};


module.exports.createSession=function(req,res){
    //to do
};