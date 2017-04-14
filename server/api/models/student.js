import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
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


// Set template file path
var template_path = '/api/mailer/test.mjml';
var template_data = {
    username: 'jean pierre'
};

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'djo.moutier@gmail.com',
        pass: '19mars1985'
    }
});

transporter.use('compile', hbs(options));

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
                
                let mail = {
                    from: '"Djodjonx👻" <djo.moutier@mail.com>', // sender address
                    to: student.email, // list of receivers
                    subject: 'Test mail ✔', // Subject line
                    template: 'email', // plain text body
                    context:{
                      name: 'Name'
                    } // html body
                };
                transporter.sendMail( mail, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });



            }
        });
    }

}
