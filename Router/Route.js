const express = require('express');
const account = require('../Controller/Account');
const UserData = require('../Controller/UserController');
const passport = require('passport')
const router = express.Router();
const pass_local= require('../Config/passportAuthebtication')
const postController= require('../Controller/PostController')
const commentController= require('../Controller/CommentController')
console.log('Router Loded!!!!!');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/account', account.Account)

// for user route
router.post('/saveUser', UserData.createUser);
router.get('/getSingleUser/:id',passport.cheakAuthenticatedUser,UserData.getSingleUSer);
router.get('/deleteUser/:id',UserData.deleteUSer);
router.get('/listAllUSer',UserData.listAllUSer);
router.get('/updateUser/:id',passport.cheakAuthenticatedUser,UserData.updateUser);

router.get('/page', UserData.page);

//login and logout
router.post('/login', passport.authenticate('local'), UserData.login);
router.get('/logout',UserData.signout);

// for the post 
router.post('/savePost',postController.savePost)
router.get('/userPost',postController.userPost);
router.get('/getFullPost',postController.fullPost)
router.get('/deletePost/:id',postController.deletePostData)


// for the comment
router.post('/saveComment/:id',commentController.saveComment)
module.exports = router;