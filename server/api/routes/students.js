import express from 'express';
import Student from '../models/student.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {



    var student = new Student();

    router.post('/', student.create);

    router.get('/', Auth.isAdministrator, student.getAll);

    router.get('/mail/:email', student.getMail);

    app.use('/students', router);

};
