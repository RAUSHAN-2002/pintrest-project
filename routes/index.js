var express = require('express');
const passport = require('passport');
var router = express.Router();
const localStrategy = require("passport-local");
const userModel = require('./users')
const postModel = require('./post');
const upload = require('./mutler');


passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', isLoggedIn, async function(req, res, next) {
  const user  = await userModel.findOne({
       username: req.session.passport.user
       
  })
  .populate("posts");

  res.render("profile" ,{user})
});



router.get('/login',function(req,res,next){
  res.render('login' ,{error:req.flash('error')});
})

router.post('/register',function(req,res){
  var userdata = new userModel({
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
    fullName:req.body.fullName
    
  })
  userModel.register(userdata,req.body.password).then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('profile')
    })
  })
})

router.get("/feed",function(req,res){
  res.render('feed')
})

router.post('/upload',isLoggedIn,upload.single('file'), async function(req,res){
  if(!req.file){
    return res.status(404).send('No file were uploaded.')

  }
const user = await userModel.findOne({username:req.session.passport.user});
 const post = await  postModel.create({
    image:req.file.filename,
    imageText:req.body.filecaption,
    user: user._id
    
   })
   user.posts.push(post._id);
   await user.save();
   res.send("done");
 
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash:true
}),function(req,res){
  res.render("login")
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/")
}



router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect('/')
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/")
}


module.exports = router;
