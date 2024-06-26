const nodeMailer = require('nodemailer');
const SMTPConnection = require('nodemailer/lib/smtp-connection');
const sendEmail=async(options)=>{
   const transporter=nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    service:process.env.SMTP_SERVICE,
    secure: false,
port: 587,
       auth:{
        //    type:'OAuth2',
           user:'hverma0511@gmail.com',
           pass:'wrxq zerh fzvd fjlq',
       }, 
       debug: true, // Enable debug output
       logger: true 
   });
    const mailOptions={
         from:process.env.SMTP_EMAIL,
         to:options.email,
         subject:options.subject,
         text:options.message
    }
    await transporter.sendMail(mailOptions);
}

module.exports=sendEmail;