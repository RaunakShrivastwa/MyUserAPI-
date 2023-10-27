const comment= require('../Model/comment');
const Post= require('../Model/post')

module.exports.saveComment=(req,res)=>{
    let p_id=req.params.id;
   Post.findById(p_id).then(post=>{
     if(post){
        comment.create({
           content: req.body.content,
           post: req.body.post,
           user: req.user._id
        }).then(data=>{
            post.comments.push(data);
            post.save();
            return res.json(data)
        }).catch(err=>{
            console.log(err)
            return res.send("there is problem with Save Comment ");
        })
     }
   })
}