const cloudinary = require('cloudinary');
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.createImage = async (request, response) => {
  try {
    
    cloudinary.v2.uploader.upload(request.body.image,{ 
      public_id: Date.now()
    }, function(error, result) {
      response.send(result);
    });

  } catch (error) {
    response.status(500).send("Cloudinary Upload Error!!")
  }
};

exports.removeImage = async (request, response) => {
  try {
    let image_id = request.body.public_id
    cloudinary.uploader.destroy(image_id,(result)=>{
      response.send(result)
    });
  } catch (error) {
    response.status(500).send("Cloudinary Remove Error!!")
  }
};