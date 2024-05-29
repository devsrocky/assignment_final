const usersModel = require("../models/usersModel");
const SendEmail = require("../utility/EmailHelper");
const { EncodeToken } = require("../utility/TokenHelper");
const profileModel = require("../models/profileModel")

const userOTPService = async (req) => {
    try{

        let email = req.params.email;
        let otp = Math.floor(10000+Math.random()*90000)
        SendEmail(email, `5 digit otp code`, `Your otp code is ${otp}. don't share your otp with other's`)
        await usersModel.updateOne({email:email}, {$set: {otp:otp}}, {upsert: true})
        return {status: 'success', message: `We have sent 5 digit otp code to ${email}.`}

    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}


const VerifyLoginService = async (req) => {
    try{
        let email = req.params.email;
        let otp = req.params.otp;
        let total = await usersModel.find({email: email, otp:otp}).count()
        if(total === 1){
            let user_id = await usersModel.find({email: email, otp:otp}).select("_id")
            let token = EncodeToken(email, user_id[0]['_id'].toString())
            await usersModel.updateOne({email:email}, {$set: {otp:"0"}})
            return {status: 'success', message: 'Valid otp', token: token}
        }else{
            return {status: 'failed', message: 'Invalid otp'}
        }
    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}


const CreateProfileService = async (req) => {
    try{

        let user_id = req.headers['user_id']
        let reqBody = req.body;
        reqBody.userID = user_id;
        await profileModel.updateOne({userID: user_id}, {$set: reqBody}, {upsert: true})
        return {status: 'success', message: 'Profile has been created'}

    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}


const ReadProfileService = async (req) => {
    try{
        let user_id = req.headers['user_id']
        let data = await profileModel.find({userID: user_id})
        return {status: 'success', data: data}

    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}



module.exports = {
    userOTPService,
    VerifyLoginService,
    CreateProfileService,
    ReadProfileService
    
}