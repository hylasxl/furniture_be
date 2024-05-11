import express from "express"
import * as dotenv from "dotenv";

import corsMiddleware from "./configs/cors.config";
import helmetMiddleware from "./configs/helmet.config";
import { bodyParserJsonMiddleware, bodyParserUrlencodedMiddleware } from "./configs/bodyParser.config";
import cookieParserMiddleware from "./configs/cookieParser.config";

dotenv.config()

if (!process.env.PORT) process.exit(1)

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(corsMiddleware)
app.use(helmetMiddleware)
app.use(bodyParserJsonMiddleware)
app.use(bodyParserUrlencodedMiddleware)
app.use(cookieParserMiddleware)


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

