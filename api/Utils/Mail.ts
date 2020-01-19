import * as nodemailer from 'nodemailer';

class Mail {
    private transporter:any;
    private to:Array<string>;
    private subject:string = 'Sakan_wallet Team ✔';
    private body:string = '<b>Hello world?</b>';


    constructor(to: Array<string>, subject?: string, body?: string) {
        this.to = to;
        this.subject = subject;
        this.body = body;
        // create reusable transporter object using the default SMTP transport
        this.transporter = nodemailer.createTransport({
            host: "smtp.aol.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'sakan_wallet', // generated ethereal user
                pass: 'bnp12345' // generated ethereal password
            }
        });
    }

    async sendEmail(): Promise<any>{
        // send mail with defined transport object
        return this.transporter.sendMail({
            from: 'sakan_wallet@aol.com', // sender address
            to: this.to, // list of receivers
            subject: this.subject, // Subject line
            // text: "Hello world?", // plain text body
            html: this.body // html body
        });
    }
}

export default Mail;