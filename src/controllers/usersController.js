const {userOTPService, VerifyLoginService, CreateProfileService, ReadProfileService} = require("../services/userService")

exports.UserOTP = async (req, res) => {
    let data = await userOTPService(req)
    res.status(200).json(data)
}


exports.VerifyLogin = async (req, res) => {
    let data = await VerifyLoginService(req)
    if(data['status'] === "success"){
        let cookieOption = {
            expires: new Date(Date.now() + 24*6060*1000),
            httpOnly: false
        }
        res.cookie('token', data['token'], cookieOption)
        res.status(200).json(data)
    }else{
        res.status(200).json(data)
    }
}

exports.UserLogout = async (req, res) => {

    let cookieOption = {
        expires: new Date(Date.now() - 24*6060*1000),
        httpOnly: false
    }
    res.cookie('token', "", cookieOption)
    res.status(200).json({status: 'success', message: 'Logout'})

}

exports.CreateProfile = async (req, res) => {
    let data = await CreateProfileService(req)
    res.status(201).json(data)
}

exports.UpdateProfile = async (req, res) => {
    let data = await CreateProfileService(req)
    res.status(201).json(data)
}

exports.ReadProfile = async (req, res) => {

    let data = await ReadProfileService(req)
    res.status(200).json(data)
}