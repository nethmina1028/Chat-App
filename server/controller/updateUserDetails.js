const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const UserModel = require("../models/UserModel")




async function updateUserDetails(req,res){    //update name and profile_pic
    try {
        const token = req.cookies.token || ""

        const user = await getUserDetailsFromToken(token)

        const { name, profile_pic } = req.body

        const updateUser = await UserModel.updateOne({ _id : user._id },{
            name,
            profile_pic
        })

        const userInfomation = await UserModel.findById(user._id)

        return res.json({
            message : "user update successfully",
            data : userInfomation,
            success : true
        })


    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = updateUserDetails