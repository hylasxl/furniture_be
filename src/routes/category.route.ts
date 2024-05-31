import express from "express"
import { Express } from "express"
import { fetchAllCategory } from "../controllers/category.controller"
const router = express.Router()

const initCategoryRoute = (app: Express) => {
    
    router.get('/fetch-all-categories',fetchAllCategory)

    return app.use('/category/', router)
}

export default initCategoryRoute