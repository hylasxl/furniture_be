import express from "express"
import * as dotenv from "dotenv";

import corsMiddleware from "./configs/cors.config";
import helmetMiddleware from "./configs/helmet.config";
import { bodyParserJsonMiddleware, bodyParserUrlencodedMiddleware } from "./configs/bodyParser.config";
import cookieParserMiddleware from "./configs/cookieParser.config";
import { connectDatabase } from "./configs/mongodb.config";
import initAuthRoutes from "./routes/auth.route";

dotenv.config()

if (!process.env.PORT) process.exit(1)

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(corsMiddleware)
app.use(helmetMiddleware)
app.use(bodyParserJsonMiddleware)
app.use(bodyParserUrlencodedMiddleware)
app.use(cookieParserMiddleware)

connectDatabase()

initAuthRoutes(app)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

