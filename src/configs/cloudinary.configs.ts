import cloudinary from "cloudinary";
import { config as configDotenv } from "dotenv";

configDotenv();

const cloudinaryInstance = cloudinary.v2;
cloudinaryInstance.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET,
    secure: true
});

export default cloudinaryInstance;
