const express  = require('express');
const router = express.Router();
const Post = require('../models/Post');
//this is the same as the get posts in app.js but we want to import this behaviour into app.js

//GET ALL THE POSTS
router.get('/', async (req,res)=>{
    //no longer want to just say we are on posts:
    //res.send("We are on posts!");

    //we want to pull the data from the database:
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch (e) {
        res.json({ message: e});
    }
});


//SUBMIT A POST
//lets send some data to our Database:
// second option is to add an async
 router.post('/', async (req, res) =>{
    //console.log(req.body);
     //making a new Post object

     /* option 1 without the async above
     const post = new Post({
         title: req.body.title,
         description: req.body.description
     });

      */

     //option 2 with async above: slightly cleaner
     const post = new Post({
         title: req.body.title,
         description: req.body.description
     });
     try{
         const savedPost = await post.save();
         res.json(savedPost);
     }catch (e) {
         res.json({message: e});
     }

     //to save the above post into our database:
     /*
     post.save()//'then allows us to use the promise to render the data to screen.'
         .then(data => {
            res.json(data);
     }).catch(err => {
         res.json({message: err});
     })

      */

 });


//SPECIFIC POST
router.get('/:postId',async (req,res) =>{
    //find a specific post by the url:
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch (err) {
        res.json({ message: err});
    }
    //dynamic parameter to pass a value: can be accessed with req.params.postId or the url
    //console.log(req.params.postId);
});


//Deleting a Post
router.delete('/:postId',async (res,req) =>{
    try{
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    }catch (err) {
        res.json({ message: err});
    }
});

//update a post
router.patch('/:postId', async (req,res) =>{
    try{
        const updatePost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title} });
        res.json(updatePost);
    }catch (err) {
        res.json({ message: err});
    }
});

module.exports = router;
