import { ResponseData } from "../types/responseData.type";
import productModel, { IProduct } from "../models/product.model";
import { Request } from "express";
import fs from "fs";
import cloudinaryInstance from "../configs/cloudinary.configs";
import orderModel, { IProducts } from "../models/order.model";
import { order } from "../controllers/product.controller";

export const fetchAllProductService = async () => {
    try {
        const products = await productModel.find().exec();
        return {
            RC: 1,
            RM: "Fetch Product Successfully",
            RD: products,
            statusCode: 200
        };
    } catch (err) {
        return {
            RC: 0,
            RM: String(err),
            RD: {},
            statusCode: 200
        };
    }
};

export const addNewProductService = async (data: Request) => {
    const formData = data.body;
    const imageFilePath: string = data.file?.path as string;

    try {
        // Upload image to Cloudinary
        const result = await cloudinaryInstance.uploader.upload(imageFilePath, {
            folder: "VivaFurniture/Products"
        });

        // Prepare product data
        const newProduct = {
            name: formData.name,
            specificCategoryId: formData.specificCategoryId,
            originalPrice: formData.originalPrice,
            currentPrice: formData.originalPrice,
            thumbnailURL: result.url,
            stock: formData.stock,
            producer: formData.producer,
            color: formData.color,
            size: {
                width: formData['size.width'],
                length: formData['size.length'],
                height: formData['size.height']
            },
            warrantyDuration: 0
        };

        // Insert product data into database
        const insertedData = await productModel.insertMany([newProduct]);

        // Delete local image file after upload
        if (imageFilePath) {
            fs.unlinkSync(imageFilePath);
        }

        return {
            RC: 1,
            RM: "Add Product Successfully",
            RD: insertedData,
            statusCode: 200
        };
    } catch (error) {
        // Handle errors
        if (imageFilePath) {
            fs.unlinkSync(imageFilePath); // Ensure local file is deleted even if there's an error
        }

        return {
            RC: 0,
            RM: "Cannot add new product",
            RD: {},
            statusCode: 200
        };
    }
};
export const orderService = async (data: { userId: string, [key: string]: any }): Promise<ResponseData> => {
    try {
        // Extract products from the data object
        const products: { id: string, quantity: number, price: number }[] = Object.values(data).filter(item => typeof item === 'object' && item.hasOwnProperty('id'));
        
        // Extract userId from the data object
        const userId: string = data.userId;

        // Check if products array exists and is not empty
        if (!products || products.length === 0) {
            throw new Error("Products data is missing or empty");
        }

        // Calculate total price and format products data
        let totalPrice = 0;
        const formattedProducts: IProducts[] = products.map((product: any) => {
            totalPrice += product.quantity * product.price;
            return {
                productId: product.id,
                quantity: product.quantity
            };
        });

        // Insert order into the database
        const order = await orderModel.insertMany({
            accountId: userId,
            products: formattedProducts,
            totalPrice,
            orderDate: new Date(),
            deliveryDate: new Date(),
            status: "Pending"
        });

        return {
            RM: "Đặt hàng thành công",
            RC: 1,
            statusCode: 200,
            RD: order // You might want to return just the order ID or a success message here
        };
    } catch (error) {
        console.error("Error inserting order:", error);
        return {
            RM: "Đặt hàng thất bại",
            RC: -1,
            statusCode: 500,
            RD: {} // You might want to return more detailed error information here
        };
    }
};


export const fetchAllOrdersService = async()=>{
    return await orderModel.find().exec()
}