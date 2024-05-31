import { ResponseData } from "../types/responseData.type"
import accountModel, { IAccount } from "../models/account.model"
import accountInfoModel, { IAccountInfo } from "../models/accountInfo.model"

export const fetchAllAccountService = async () => {

    const accounts = await accountModel.find().populate({
        path: 'accountInfo',
        model: accountInfoModel,
    }).exec().catch((err) => {
        return {
            RC: 0,
            RD: {},
            RM: String(err),
            statusCode: 200
        }
    })

    const returnedData: ResponseData = {
        RC: 1,
        RD: accounts,
        RM: "Fetch Account Successfully",
        statusCode: 200
    }
    return returnedData
}