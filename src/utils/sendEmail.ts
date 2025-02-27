import { createTransport } from "nodemailer";

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
})

export const sendEmail = (email: string,subject:string,html:string)=>{
    const options = {
        from: process.env.USER,
        to: email,
        subject,
        html,
    }
    return transport.sendMail(options)
}