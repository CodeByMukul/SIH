const express = require("express");
const app = express();
const cors = require("cors");
const userRouter=require('./routes/users')
const postRouter=require('./routes/post')
// const mainRouter = require("./routes/index");
const JWT_SECRET = require("./config");
app.use(cors());
app.use(express.json());
app.use('/users',userRouter)
app.use('/posts',postRouter)
// app.use("/api/v1", mainRouter);

app.listen(3000, () => {
  console.log("app is running");
});

app.get('/',(req,res)=>{
  res.send('hi')
})

// / landing page
// /home   feed
// /users/user ka hash      user profile 
// 