import express from "express"
import { Express } from "express"
import { registerAccount, login } from "../controllers/authController"
import { authenticateJWT } from "../middlewares/auth.middleware"
const router = express.Router()

const initAuthRoutes = (app: Express) => {
    router.post('/register', registerAccount)
    router.post('/login', login)

    return app.use('/auth/', router)
}

export default initAuthRoutes