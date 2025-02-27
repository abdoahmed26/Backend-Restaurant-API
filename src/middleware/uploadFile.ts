import multer from "multer"
import { UploadApiResponse, v2 } from "cloudinary"
import dotenv from "dotenv"
import { Readable } from "stream"

dotenv.config()

const storage = multer.memoryStorage()

export const upload = multer({storage})

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async(buffer:Buffer):Promise<UploadApiResponse | null> =>{
    try {
        const streamUpload = (buffer: Buffer): Promise<any> => {
            return new Promise((resolve, reject) => {
                const stream = v2.uploader.upload_stream(
                    { folder: process.env.CLOUDINARY_FOLDER_NAME },
                    (error, result) => {
                        if (result){
                            resolve(result);
                        }
                        else{
                            reject(error);
                        }
                    }
                );

                const readableStream = new Readable();
                readableStream.push(buffer);
                readableStream.push(null);
                readableStream.pipe(stream);
            });
        };
        const result = await streamUpload(buffer);
        return result
    } catch (error:any) {
        console.log(error.message);
        return null;
    }
}