const JWT = require("jsonwebtoken");

exports.EncodeToken = (email, user_id) => {

    let KEY = '123-ABC-XYZ'
    let EXPIRE = {expiresIn: '24h'}
    let PAYLOAD = {email:email, user_id: user_id}
    return JWT.sign(PAYLOAD, KEY, EXPIRE)
}

exports.DecodeToken = (token) => {
    try{
        let KEY = '123-ABC-XYZ'
        return JWT.verify(token, KEY)
    }catch(e){
        return null
    }
}