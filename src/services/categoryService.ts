import { ResponseData } from "../types/responseData.type";
import specificCategoryModel from "../models/specificCategory.model";
export const fetchAllCategoryService = async () => {
    const categories = await specificCategoryModel
        .aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $unwind: "$category",
            },
            {
                $group: {
                    _id: "$category.name",
                    specificCategories: {
                        $push: {
                            _id: "$_id",
                            name: "$name",
                            description: "$description",
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    specificCategories: 1,
                },
            },
        ])
        .exec()
        .catch((err) => {
            return {
                RC: 0,
                RM: String(err),
                RD: {},
                statusCode: 200,
            };
        });

    const returnedData: ResponseData = {
        RC: 1,
        RM: "Fetch Category Successfully",
        RD: categories,
        statusCode: 200,
    };
    return returnedData;
};
