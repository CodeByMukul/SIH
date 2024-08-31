const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User ,Post} = require("../schema");
const authMiddleware = require("../middleware");
const signupValidator = z.object({
  username: z.string().min(3).max(30),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  password: z.string().min(6),
  bio:z.string().max(150).optional(),
  gender:z.enum(["male","female"])
});
const signinValidator = z.object({
  username: z.string(),
  password: z.string(),
});
const updateValidator = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
  
});

const router = express.Router();
router.get("/", (req, res) => {
  res.redirect("//127.0.0.1:3000");
});

//!SIGNUP, REQUIRES FRONTEND TO POST THE FORM DETAILS
router.post("/signup", async (req, res) => {
  const { success } = signupValidator.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }
  const userr = await User.findOne({ username: req.body.username });
  if (userr) {
    return res.status(411).json({ message: "Username already taken" });
  }
  const user = await User.create(req.body);
//   await Account.create({
//     userId: user._id,
//     balance: 1 + 10000 * Math.random(),
//   });
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
  );
  res.json({
    message: "user created successfully",
    token: token,
  });
});


//! REQUIRES FRONTEND TO POST DETAILS TO SIGN IN
router.post("/signin", async (req, res) => {
  if (signinValidator.safeParse(req.body).success == false) {
    return res.status(411).json({ message: "error while logging in" });
  }
  const user = await User.findOne(req.body);
  if (!user) {
    return res.status(411).json({ message: "error while logging in" });
  } else {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
    );
    return res.json({ token: [token] });
  }
});

//!EDIT ROUTER, NOT FINALISED
router.put("/", authMiddleware, async (req, res) => {
  const success = updateValidator.safeParse(req.body).success;
  if (success) {
    await User.findOneAndUpdate({ _id: req.userId }, req.body);
    return res.status(200).json({ message: "Updated successfully" });
  } else {
    return res.status(411).json({ message: "Error while finding information" });
  }
});

//!SEARCH ROUTE, /SEARCH?FILTER= username/firstname/lastname
router.get("/search", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: { $regex: filter },
      },
      {
        lastName: { $regex: filter },
      },
      {
      username:{$regex:filter}}
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});



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
router.get('/user/navbarinfosecretroute',authMiddleware,async(req,res)=>{
    const user=await User.findOne({
        _id:req.userId
    })

    res.json({
        name:user.firstName+" "+user.lastName,
        username:user.username,
        profilePicture:user.profile_pic.url
    })
})

router.get('/user',authMiddleware,async(req,res)=>{
    const user=await User.findOne({
        _id:req.userId
    })

    res.json(
        user
    )
})

router.get('/user/:username',authMiddleware,async(req,res)=>{
    const user=await User.findOne({
        username:req.params.username
    })
    if(!user){
        return res.status(411).json({
            msg:"User does not exist"
        })
    }

    const id=user._id;
    const posts=await Post.find({
        username:id
    })
    res.json({
        user,
        posts:posts.map((post)=>{
            return post
        })
    })
})





module.exports = router;