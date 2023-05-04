import nodemailer from 'nodemailer'
import * as path from 'path'
import hbs from 'nodemailer-express-handlebars';


const emailStatusUpdate = async (options) => {
   
    const transporter = nodemailer.createTransport({
        host: "smtp.outlook365.com",
        service: "outlook",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,  
        }
    });

    const handlebarOptions = {
        viewEngine:{
            extName:".handlebars",
            partialsDir: path.resolve('./views'),
            defaultLayout: false,
        },
        //use email template
        viewPath: path.resolve('./views'),
        extName: ".handlebars"
    }

    transporter.use('compile', hbs(handlebarOptions))

    const mailOptions = {
        from: 'NISF <emitremmus_@hotmail.com>',
        to: options.email,
        subject: options.subject,
        template: 'approvalEmail',
        context:{
            name: options.name,
        }       
    };
    //3 Send email
    await transporter.sendMail(mailOptions);
}

export default emailStatusUpdate
