const express = require('express');
const router = express.Router();
const { data } = require('../data.json');
const { projects } = data;

router.get('/', (req, res) => {
    res.render('index', { projects });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/projects/:id', (req, res, next) => {
    const id = req.params.id;
    if(projects[id]){
        const project = projects[id];
        res.render('project', { project });
    } else {
        next();
    }
});

router.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "File Not Found";
    next(err);
});

router.use((err, req, res, next) => {
    res.locals.error = err;
    res.locals.message = err.message;

    console.log(res.locals.error.status);
    console.log(res.locals.message);
    next();
});

module.exports = router;