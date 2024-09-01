const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dillvpltk', 
    api_key: '342926712781676', 
    api_secret: 'tUd8tIpFU7HLWpCYrUwr8jPX5bY' 
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Raahi',
      allowedFormats: ["png","jpg","jpeg"],
    },
  });

  module.exports={
    cloudinary,
    storage
  }