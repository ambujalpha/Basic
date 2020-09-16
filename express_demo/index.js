const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

/*
//methods of app
app.get()
app.post()
app.put()
app.delete()
*/

const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},
];

app.get('/', (req, res) => {
   res.send('Hello world');
});

app.get('/api/courses',(req,res)=>{
   res.send(courses);
});

app.post('/api/courses',(req,res)=>{
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

   const course={
       id: courses.length + 1,
       name: req.body.name
   };
   courses.push(course);
   res.send(course);
});

app.put('/api/courses/:id',(req,res)=>{
   //Look up the course
    //if not exist the 404
    const course = courses.find(c => c.id=== parseInt(req.params.id));
    if(!course) // 404
        res.status(404).send('The course with the given id was not found');

    //validate
    //if invalid, return 400
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //updated course
        course.name = req.body.name;
    //return updated course
        res.send(course);
});

function validateCourse(course){

     const name = { name: course };
    const schema = Joi.object({ name: Joi.string().min(3).required() });
    return schema.validate(name);
}
app.delete('/api/courses/:id',(req,res)=> {
    //Look up the course
    //if not exist the 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // 404
        return res.status(404).send('The course with the given id was not found');
    //validate
    //if invalid, return 400
    const {error} = validateCourse(req.body.name);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
});
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id=== parseInt(req.params.id));
    if(!course) // 404
        res.status(404).send('The course with the given id was not found');
    res.send(course);
});

// PORT
const port  = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));