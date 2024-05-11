import cors from 'cors';
import { Request } from 'express';

const API_CONNECTION_URL: string = String(process.env.API_URL)

const corsOptions: cors.CorsOptions = {
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: API_CONNECTION_URL, 
    preflightContinue: false,
};

const corsMiddleware = cors<Request>(corsOptions);

export default corsMiddleware;
