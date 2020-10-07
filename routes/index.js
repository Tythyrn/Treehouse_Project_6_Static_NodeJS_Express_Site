const express = require('express');
const router = express.Router();
const { data } = require('../data.json');
const { projects } = data;

//root of the application.  Displays the index template
router.get('/', (req, res) => {
    res.render('index', { projects });
});

//Displays the about template
router.get('/about', (req, res) => {
    res.render('about');
});

//This route is dynamic to display the project depending on which project is viewed
router.get('/projects/:id', (req, res, next) => {
    const id = req.params.id;
    if(projects[id]){
        const project = projects[id];
        res.render('project', { project });
    } else {
        next();
    }
});

//This route is dynamic to display the project depending on which project is viewed
//It is the same as the one above but has the singular 'project' instead
router.get('/project/:id', (req, res, next) => {
    const id = req.params.id;
    if(projects[id]){
        const project = projects[id];
        res.render('project', { project });
    } else {
        next();
    }
});

//If no routes match then this runs and creates a 404 error
router.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "File Not Found";
    next(err);
});

//Routing error handler to handle any errors that come through
router.use((err, req, res, next) => {
    console.log(err.status);
    console.log(err.message);

    if (err.status === 404){
        res.render('page-not-found', { err });
    } else {
        res.render('error', { err });
    }
});

//Exports the router to be used by Express
module.exports = router;