const Post = require('../Model/post');
const Comment = require('../Model/comment')

module.exports.savePost = (req, res) => {
   console.log('data')
   const data = {
      content: req.body.content,
      user: req.user._id
   };

   Post.create(data).then(result => {
      // console.log("post Added successfully!!!");
      //  res.send('post Added successfully!!!')
      return res.json(result)
   }).catch(err => {
      console.log("there is problem with post added", err);
      return res.send(err);
   })
}

module.exports.userPost = (req, res) => {
   Post.find({ user: req.user }).then(ans => {
      return res.json(ans);
   }).catch(err => {
      return res.send(err)
   })
}

module.exports.fullPost = async (req, res) => {
   console.log("data")
   try {
      let data = await Post.find({})
         // .populate('user')
         .populate({
            path: 'comments',
            populate: {
               path: 'user'
            }
         });
      console.log(data)
      return res.json(data);
   } catch (err) {
      console.log("There is problem with Home", err);
      return;
   }
}

module.exports.deletePostData=(req,res)=>{
   console.log(req.params.id)
   Post.findById(req.params.id).then(post=>{
      console.log(post.user.id)
      if(post.user == req.user.id){
          post.deleteOne()
         Comment.deleteMany({post: req.params.id}).then(data=>{
            return res.json(data);
         }).catch(err=>{
            console.log("There is problem with Deleting of post");
            return;
         })
      }
      else{
         return res.send('not')
      }
   }).catch(err=>{
      console.log("there is problem with finding post",err);
      return;
   })
}
