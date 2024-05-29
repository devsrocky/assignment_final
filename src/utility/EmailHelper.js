const nodemailer = require('nodemailer')

let SendEmail = async (mailTo, mailSub, mailText) => {
    let transporter = nodemailer.createTransport({
        host: 'mail.wp-codestudio.com',
        port: 465,
        secure: true,
        auth: {
            user: 'email@wp-codestudio.com',
            pass: '$yM.ANKa;6fz'
        },tls:{
            rejectunauthorized: false
        }
    })
    let mailOption = {
        from: 'MERN Ecommerce Solution <email@wp-codestudio.com>',
        to: mailTo,
        subject: mailSub,
        text: mailText
    }
    return transporter.sendMail(mailOption)
}

module.exports = SendEmail;