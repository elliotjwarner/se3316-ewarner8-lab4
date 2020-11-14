const express = require('express');
const router = express.Router();
const Joi = require('joi'); //for security
const app = express();
const port = process.env.PORT || 8080;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const timetables = new FileSync('./timetable.json');
const classes = new FileSync('./Lab3-timetable-data.json');

const db1 = low(classes);
const db2 = low(timetables);

app.use(express.json());
app.use((req, res, next) => {
    console.log( req.method + ' request for ' + req.url);
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//routes work except input validation and filtering
//also i think im sending too much data back, could shorten that but whatever



///////////////////////////////////////////classes//////////////////////////////////////////////////////////////////

//hompage get useed to show all courses 
app.get('/api/class',(req, res) => {
    console.log('get all classes');
    const db = db1.get("classes").value();
    res.json(db);  
});

//get courses for a specific subject 
app.get(`/api/class/:subj`,(req, res) => {
    console.log('get all classes for subj');
    let subj = req.params.subj.toUpperCase();

    //verify input is safe
    const schema = Joi.object().keys({ 
        subj: Joi.string().alphanum().min(3).max(30).required(),
      }); 
      //subj = Joi.validate(subj, schema);

      schema.validate(subj, (err, value) => {

        if (err) {
    
            console.log(err.details);
    
        } else {
    
            console.log(value);
        }
    });

    const db = db1.get("classes")
        .filter({subject: subj})
        .value();

    res.send(db);  
});

//hompage get used to get courses for a specific subject 
app.get('/api/class/:subj/:cod/:comp',(req, res) => {
    console.log('get all classes for subj, code, comp');

    let subj = req.params.subj.toUpperCase();//subject 
    let cod = req.params.cod.toUpperCase(); //course code
    let comp = req.params.comp.toUpperCase(); // couse component

    //check name is not null

    //check name is unique

    //verify name is unique

    const db = db1.get( 'classes')
        .filter({subject: subj, className: cod})
        .get('course_info')
        .filter({ssr_component: comp})
        .value();

    res.send(db);  

});

//hompage get used to get courses for a specific subject no component 
app.get('/api/class/:subj/:cod',(req, res) => {
    console.log('get all classes for subj, code');

    let subj = req.params.subj.toUpperCase();
    let cod = req.params.cod.toUpperCase();

    //check name is not null

    //check name is unique

    //verify name is unique

    const db = db1.get( 'classes')
        .filter({subject: subj,className: cod,})
        .value();

    res.send(db);  
});










////////////////////////////////////////////timetables////////////////////////////////////////////////////////////

//create new table 
app.post('/api/table/newtable',(req, res) => {

    const ta = req.body[0];
    ta.id = db2.get('tables').size().value();

    //check name is not null

    //check name is unique

    //verify input is not harmful

    //save to db
    db2.get('tables')
        .push(ta)
        .write();

    res.send(200);

});

//get all tables created by user 
app.get('/api/table/tables',(req, res) => {
    console.log('get all tables');
    db2.read();
    const db = db2.get('tables')
        .sortBy('name')
        .values();

    res.json(db);    
});

//show specific table 
app.get('/api/table/tables/:name', (req, res) => {
    console.log('get one table');
    const n = req.params.name;

    //input sanitization
    //check if null
    if(!n){
        res.status(400,'input name');
    }

    //check if name is unique

    //check if input is safe

    db2.read();
    const db = db2.get('tables')
        .find({name: n})
        .value();

    res.json(db);   

});

//delete all tables made by user 
app.delete('/api/table/killTable', (req, res) => {
    let n = db2.get('tables').size().value();;
    while(n>0){
        db2.get('tables')
        .remove({id: n})
        .write();  
        n--;
    }
    res.sendStatus(status);
})

//delete specific table from user 
app.delete('/api/table/killTable/:name', (req, res) => {
    const n = req.params.name;

    //input sanitization
    //check if null
    if(!n){
        res.sendStatus(400,'input name');
    }

    //check if name exists

    //check that input is safe (html, js)
    
    db2.get('tables')
        .remove({name: n})
        .write();
        console.log(db2.value());
    

})

//add class to table 
app.post('/api/:table/:class', (req, res) => {

    //parameters
    let table = req.params.table;
    let cl = req.params.class.toUpperCase();


    db1.read();
    db2.read();

    //get class
    let db = db1.get( 'classes')
        .filter({className: cl})
        .value();

    //rewrite courses array in specific table
    db2.get('tables')
        .find({name: table})
        .get('courses')                                                 
        .push(db)           
        .write();     
        
    res.send(200);
});


//export
module.exports = router;

app.listen(port, () => {
    console.log('listening on port ' + port);
});