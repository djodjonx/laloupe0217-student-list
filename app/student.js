import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Client from 'node-mjml-mustache-nodemailer';
const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    sexe: {
        type: String
    },
    birthdate: {
        type: Date,
        required: true
    },
    city: {
        type: String
    },
    zipcode: {
        type: String
    },
    adress: {
        type: String
    },
    github: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        validate: [function(email) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        }, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    }

});
let config = {
    // Default mail sender
    default_from: 'djo.moutier@gmail.com',
    // If true, template content are stored in memory
    // Default to process.env.NODE_ENV === 'production' ? true : false
    cache: false,
    // Nodemailer configuration
    // See [https://github.com/nodemailer/nodemailer#send-using-smtp](https://github.com/nodemailer/nodemailer#send-using-smtp)
    smtp: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: 'djo.moutier@gmail.com',
        pass: '19mars1985'
      }
  }
};

let client = new Client(config);

// Set template file path
let template_path = '/api/mailer/test.mjml';
let template_data = {
    username: 'jean pierre'
};

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'djo.moutier@gmail.com',
        pass: '19mars1985'
    }
});


let model = mongoose.model('Student', studentSchema);

export default class Student {

    create(req, res) {
        model.create(req.body, (err, student) => {
            if (err) {
                res.status(404).send(err.message);
            } else {
                res.json({
                    succes: true,
                    student: student
                });
            }
        });
    }
    getAll(req, res) {
        model.find({}, (err, students) => {

            if (err || !students) {
                res.sendStatus(403);
            } else {
                res.json({
                    students
                });
            }
        });
    }
    getMail(req, res) {
        console.log(req.params);
        model.findOne({
            email: req.params.email
        }, (err, student) => {

            if (err || !student) {
                res.sendStatus('nope');
            } else {
                console.log(student.email);
                // let mailOptions = {
                //     from: '"Djodjonx👻" <djo.moutier@mail.com>', // sender address
                //     to: student.email, // list of receivers
                //     subject: 'Test mail ✔', // Subject line
                //     text: "Who's the back boss??", // plain text body
                //     html: "<h1>You are Spammed !!!!</b>" // html body
                // };
                // transporter.sendMail( mailOptions, (error, info) => {
                //     if (error) {
                //         return console.log(error);
                //     }
                //     console.log('Message %s sent: %s', info.messageId, info.response);
                // });
                client.sendMail(template_path, template_data, {
                    to: student.email,
                    from: 'djo.moutier@gmail.com',
                    subject: 'test template'
                    // See [nodemailer options for more](https://github.com/nodemailer/nodemailer#tldr-usage-example)
                }).then(function(infos) {
                    // Email is sent
                }, function(err) {
                    // an error was occured
                });


            }
        });
    }

}
