import nodemailer from 'nodemailer';

export default async(subject, text = null, to = 'nikkitam1999@gmail.com') =>{
    const transporter = await nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: 'modaknikita3@gmail.com',
            pass: 'erqdtcvanrimvghd'
        }
    });

    const mailOptions = {
        from:{
            name:'Travel Hangouts',
            address:'nikkitam1999@gmail.com'
        },
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Email sent', + info.response);
        }
    });
}