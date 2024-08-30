const mongoose = require("mongoose");
const { number } = require("zod");
const Schema = mongoose.Schema;

mongoose
  .connect(
    "mongodb+srv://ruchitkansal98:5IyDfSjvxsh9rFP3@cluster0.qhibb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => console.log("DB Connected!"));
// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//     minLength: 3,
//     maxLength: 30,
//   },
//   password: {
//     type: String,
//     required: true,
//     minLength: 6,
//   },
//   firstName: {
//     type: String,
//     required: true,
//     trim: true,
//     maxLength: 50,
//   },
//   lastName: {
//     type: String,
//     required: true,
//     trim: true,
//     maxLength: 50,
//   },
// });
const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    followers:{
        type: Number,
        default: 0

    },
    following: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        required: true,
        maxLength: 150,
        default: "",

    },
    profile_pic:{
        filename:{
            type:String,
            default:'profileimage'

        },
        url:{
            type:String,
            default:
                "https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png",
              set: (v) =>
                v === ""
                  ? "https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
                  : v,
        }
    },
    locationCount:{
        type:Number,
        default:0
    },
    postCount:{
        type:Number,
        default:0
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true
    },
    bookmarks:
      [
        {type:Schema.Types.ObjectId,
          ref:"Post"
        }
      ]
        //code to be added  ? << Rucht>>
        //also add bookmark count
      ,

  });
const postSchema = new mongoose.Schema({
    username:{
        type:Schema.Types.ObjectId,
        ref:"User",

    },
  location: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    // required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  caption: {
    type: String,
    required: true,
  },
  comments:{
    //code to be added ? <<Ruchit>>
    type: [{
      type:Schema.Types.ObjectId,
      ref:"Comment"
    }
    ]

  },

  uploadtime:{
    //code to be added
    //recheck this code <<Ruchit>> 
    type: Date,
    default: Date.now()
  },

  bookmarksCount:{
    type:Number,
    default:0
    //code to be added  ? << Rucht>>
    //also add bookmark count
  },

  media: {
    filename:{
      type:String,

  },
  url:{
      type:String,

  }
    //code to be added ? << Ruchit >> 
  }



});

const commentSchema = new mongoose.Schema(
  {
    text:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
  }
);

const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);
const Comment=mongoose.model("Comment",commentSchema);
module.exports = { User, Post,Comment };