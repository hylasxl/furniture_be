import { Request, Response } from "express";
import { ResponseData } from "../types/responseData.type";
import { fetchAllProductService, addNewProductService, orderService, fetchAllOrdersService } from "../services/productService";

export const fetchAllProduct = async (req: Request, res: Response) => {
    const returnedData: ResponseData = await fetchAllProductService()    
    return res.status(returnedData.statusCode).json(returnedData)
}

export const addNewProduct = async (req: Request, res: Response) => {
    const returnedData: ResponseData = await addNewProductService(req)    
    return res.status(returnedData.statusCode).json(returnedData)
}
export const order = async (req: Request, res: Response) => {
    const returnedData: ResponseData = await orderService(req.body)    
    return res.status(returnedData.statusCode).json(returnedData)
}

export const fetchAllOrder = async (req: Request, res: Response)=>{
    const data = await fetchAllOrdersService()
    return res.status(200).json(data)
}