import express from "express"
import { Express } from "express"
import { registerAccount, login, googleLogin } from "../controllers/auth.controller"
const router = express.Router()

const initAuthRoutes = (app: Express) => {
    router.post('/register', registerAccount)
    router.post('/login', login)
    router.post('/login/google', googleLogin)

    return app.use('/auth/', router)
}

export default initAuthRoutes