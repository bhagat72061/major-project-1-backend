module.exports.home=function(req,res){
    //return res.end('<h1>home</h1>');
    res.cookie('dvsvdb',3456);
    console.log(req.cookies);
    return res.render('home',{
        title:"Home"
    });
}

//module.exports.actionName= function(req,res){}