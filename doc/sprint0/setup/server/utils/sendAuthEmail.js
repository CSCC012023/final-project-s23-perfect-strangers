const nodemailer = require("nodemailer");

module.exports = async (email, title, text) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SERCUER),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: title,
            text: text
        });

        console.log("Email sent: ", text);
    }catch(error){
        console.log("Email failed to sent");
        console.log(error);
    }

}