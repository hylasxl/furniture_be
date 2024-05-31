import express from "express"
import { Express } from "express"
import { fetchAllProduct } from "../controllers/product.controller"
import { addNewProduct } from "../controllers/product.controller"
import multer from "multer"
import { order } from "../controllers/product.controller"
import { fetchAllOrder } from "../controllers/product.controller"
const upload = multer({dest :"uploads/"})

const router = express.Router()

const initProductRoute = (app: Express) => {
    
    router.get('/fetch-all-products',fetchAllProduct)
    router.post('/add-new-product', upload.single('thumbnailURL'), addNewProduct )
    router.post('/order', order)
    router.get('/get-order',fetchAllOrder)
    return app.use('/product/', router)
}

export default initProductRoute