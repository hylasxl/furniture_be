import { Request, Response } from "express"
import { ResponseData } from "../types/responseData.type"
import { fetchAllCategoryService } from "../services/categoryService"

export const fetchAllCategory = async (req: Request, res: Response) => {
    const returnedData: ResponseData = await fetchAllCategoryService()    
    return res.status(returnedData.statusCode).json(returnedData)
}