import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import compression from "compression"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import { errorHandle } from "./middleware/errorHandle"
// import { upload, uploadFile } from "./middleware/uploadFile"
// import { UploadApiResponse } from "cloudinary"
import { authRouter } from "./routes/auth"
import { userRouter } from "./routes/userRoute"
import { categoryRouter } from "./routes/categoryRoute"
import { foodsRouter } from "./routes/foodsRoute"
import { reviewsRouter } from "./routes/reviewsRoute"
import { cartRouter } from "./routes/cartsRoute"
import { checkoutRouter } from "./routes/checkoutRoute"
import { connectDB } from "./models/db"
import { wishlistsRouter } from "./routes/wishlistsRoute"
import { ordersRouter } from "./routes/ordersRoute"

dotenv.config()

const app = express()

connectDB()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message:"Many requests in few time. please try again in anther time"
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(compression())
app.use(helmet({xFrameOptions:{action:"deny"}}))
app.use(limiter)
app.use(errorHandle)

app.use("/api/v1/auth",authRouter)

app.use("/api/v1/user",userRouter)

app.use("/api/v1/categories",categoryRouter)

app.use("/api/v1/foods",foodsRouter)

app.use("/api/v1/reviews",reviewsRouter)

app.use("/api/v1/cart",cartRouter)

app.use("/api/v1/orders",ordersRouter)

app.use("/api/v1/wishlist",wishlistsRouter)

app.use("/api/v1/checkout",checkoutRouter)

// app.post("/uploads",upload.single("image"),async(req:Request,res:Response)=>{
//     try {
//         let result:UploadApiResponse | null = null
//         if(req.file){
//             console.log("req file => ",req.file);
//             result = await uploadFile(req.file.buffer)
//         }
//         console.log(result);
//         res.status(200).json({status:"success",message:"Uploaded file successfully"})
//     } catch (error:any) {
//         res.status(404).json({status:"error",message:error.message})
//     }
// })

app.all("*",(req,res,next)=>{
    res.status(404).json({
        status:"fail",
        message:"this route does not exist"
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port http://localhost:${process.env.PORT}`);
})