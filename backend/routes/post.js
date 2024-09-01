const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User ,Post} = require("../schema");
const authMiddleware = require("../middleware");
const multer  = require('multer')
const {storage}=require('../cloudConfig.js')
const upload = multer({ storage})
// const signupValidator = z.object({
//   username: z.string().min(3).max(30),
//   firstName: z.string().max(50),
//   lastName: z.string().max(50),
//   password: z.string().min(6),
//   bio:z.string().max(150).optional(),
//   gender:z.enum(["male","female"])
// });
const postValidator = z.object({
    location: z.string(),
    caption: z.string().max(50),
    media:z.string().optional(),
    activity:z.string().optional()
  });
// const signinValidator = z.object({
//   username: z.string(),
//   password: z.string(),
// });
// const updateValidator = z.object({
//   firstName: z.string().optional(),
//   lastName: z.string().optional(),
//   password: z.string().optional(),
  
// });

const router = express.Router();

router.get("/", async (req, res) => {
//   const { success } = signupValidator.safeParse(req.body);
//   if (!success) {
//     return res.status(411).json({ message: "Incorrect inputs" });
//   }
//   const userr = await User.findOne({ username: req.body.username });
//   if (userr) {
//     return res.status(411).json({ message: "Username already taken" });
//   }
//   const user = await User.create(req.body);
  const posts=await Post.find()
  if(!posts){
    return res.status(411).json({message:"Error finding posts"})
  }
  res.json({
    posts
  })
//   await Account.create({
//     userId: user._id,
//     balance: 1 + 10000 * Math.random(),
//   });

});
//!AGAR POST KO VIEW KRNA HOGA TO FRONTEND ME JAB POST PR CLICK HOGA TO USER KA DATA
router.post("/",authMiddleware, async (req, res) => {
  if (postValidator.safeParse(req.body).success == false) {
    return res.status(411).json({ message: "Something went wrong" });
  }
  const post=await Post.create({...req.body,username:req.userId});

    return res.json({ message: "Post created successfully",postId:post._id });
  
});
router.get('/:id',authMiddleware,async(req,res)=>{
    const post=await Post.findById(
        req.params.id
    );
    if(!post){
        return res.status(411).json({
            message:"Post not found"
        })
    }
    res.json(
        post
    )
})

//!POSTS EDIT KRNE KA BANANA H ABHI KE LIYE CANCELLED
// router.put("/", authMiddleware, async (req, res) => {
//   const success = updateValidator.safeParse(req.body).success;
//   if (success) {
//     await User.findOneAndUpdate({ _id: req.userId }, req.body);
//     return res.status(200).json({ message: "Updated successfully" });
//   } else {
//     return res.status(411).json({ message: "Error while finding information" });
//   }
// });
// router.get("/search", authMiddleware, async (req, res) => {
//   const filter = req.query.filter || "";
//   const users = await User.find({
//     $or: [
//       {
//         firstName: { $regex: filter },
//       },
//       {
//         lastName: { $regex: filter },
//       },
//     ],
//   });
//   res.json({
//     user: users.map((user) => ({
//       username: user.username,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       _id: user._id,
//     })),
//   });
// });

// router.get('/search/:id',authMiddleware,async(req,res)=>{
//     const user=await User.findOne({
//         _id:req.params.id
//     })
//     const posts=await Post.find({
//         username:req.params.id
//     })
//     res.json({
//         user,
//         posts:posts.map((post)=>{
//             return post
//         })
//     })
// })

module.exports = router;