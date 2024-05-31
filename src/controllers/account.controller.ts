import { Request, Response } from "express";
import { ResponseData } from "../types/responseData.type";
import { fetchAllAccountService } from "../services/accountService";

export const fetchAllAccount = async (req: Request, res: Response) => {
    const returnedData: ResponseData = await fetchAllAccountService()
    return res.status(returnedData.statusCode).json(returnedData)
}