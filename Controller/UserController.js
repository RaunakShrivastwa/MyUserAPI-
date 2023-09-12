const User = require('../Model/user');
// for the Creation USer
module.exports.createUser=(req,res)=>{
    User.findOne({email:req.body.email}).then(result=>{
        if(!result){
            User.create(req.body).then(data=>{
                return res.json(data);

            })
        }
        else{
            console.log("User Already Exist!!!!!!");
            res.send("User Already There")
            return;
        }
    }).catch(err=>{
        console.log("there is problem with Finding User!!!!!",err);
        res.send("There is problem with Request",err)
        return;
    })
}

// list of All User
module.exports.listAllUSer=(req,res)=>{
   User.find().then(result=>{
     return res.json(result);
   }).catch(err=>{
      return res.json("There is problem With Request");
   })
}

// getSingle USer
module.exports.getSingleUSer=(req,res)=>{
    User.findById(req.params.id).then(data=>{
       return res.json(data);
    }).catch(err=>{
        res.send("OOPS!! USer Not Exist")
       return;
    })
}

// delete USer
module.exports.deleteUSer=(req,res)=>{
   User.findByIdAndDelete(req.params.id).then(data=>{
      return res.json(data);
   }).catch(err=>{
      return res.send("There is problem with Deletion of User!!!!");
   })
}

// update User
module.exports.updateUser=(req,res)=>{
   User.findByIdAndUpdate(req.params.id,req.body).then(data=>{
      return res.json(req.body);
   }).catch(err=>{
      return res.send("There is Problem With Update User!!!!!!");
   })
}

module.exports.page=(req,res)=>{
    res.render('Page')
}


//  for the cheak login
module.exports.login=(req,res)=>{
  return res.send("User LogIN Successfully!!!!!");
}

module.exports.signout=(req,res)=>{
   req.logout((user=>{
      console.log(user);
      return;
      // req.flash('success','LogOut Successfully')
 
   }))
 
   return res.send('User LogOut Successfully');
   
 }