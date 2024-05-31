import express from "express"
import { Express } from "express"
import { fetchAllAccount } from "../controllers/account.controller"
const router = express.Router()

const initAccountRoute = (app: Express) => {
    
    router.get('/fetch-all-accounts', fetchAllAccount)

    return app.use('/account/', router)
}

export default initAccountRoute