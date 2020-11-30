//////////////////////////////////////////////////imports////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();
const Joi = require('joi'); //for security
const app = express();
const http = require('http');
const port = process.env.PORT || 8080;
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const timetables = new FileSync('./timetable.json');
const classes = new FileSync('./Lab3-timetable-data.json');
const sanitizer = require('sanitize')();
const db1 = low(classes);
const db2 = low(timetables);
const clean = require('xss-clean/lib/xss').clean



/////////////////////////////////////////middleware/////////////////////////////////////////////////////////////////////

//translate everything to json
app.use(express.json());

//log requests comming to backend for debugging 
app.use((req, res, next) => {
    console.log( req.method + ' request for ' + req.url);
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(express.static(path.join(__dirname, '../dist/lab4-angular')));

//translates '%' to ' ' for tables names etc
function spaces(s){
    let str = s.replace(/%/g,' ');
    return str.trim();
}


///////////////////////////////////////////classes//////////////////////////////////////////////////////////////////

//hompage get useed to show all courses 
app.get(`/api/class`,(req, res) => {
    console.log('get all classes');
    const db = db1.get("classes").value();
    res.json(db);  
});

//get courses for a specific subject 
app.get(`/api/class/:subj`,(req, res) => {
    console.log('get all classes for subj');
    let subj = req.params.subj.toUpperCase();
    subj = spaces(subj);
    subj = clean(subj);


    const db = db1.get("classes")
        .filter({subject: subj})
        .value();

    res.send(db);  
});

//hompage get used to get courses for a specific subject 
app.get(`/api/class/:subj/:cod/:comp`,(req, res) => {
    console.log('get all classes for subj, code, comp');

    let subj = req.params.subj.toUpperCase();//subject 
    let cod = req.params.cod.toUpperCase(); //course code
    let comp = req.params.comp.toUpperCase(); // couse component
    subj = spaces(subj);
    cod = spaces(cod);
    subj = clean(subj);
    cod = clean(cod);
    comp = clean(comp);

    const db = db1.get( 'classes')
        .filter({subject: subj, catalog_nbr: cod})
        .get('course_info')
        .filter({ssr_component: comp})
        .value();

    res.send(db);  

});

//hompage get used to get courses for a specific subject no component 
app.get(`/api/class/:subj/:cod`,(req, res) => {
    console.log('get all classes for subj, code');

    let subj = req.params.subj.toUpperCase();
    let cod = req.params.cod.toUpperCase();
    subj = spaces(subj);
    cod = spaces(cod);
    subj = clean(subj);
    cod = clean(cod);

    const db = db1.get( 'classes')
        .filter({subject: subj,className: cod,})
        .value();

    res.send(db);  
});










////////////////////////////////////////////timetables////////////////////////////////////////////////////////////

//create new table 
app.post(`/api/table/:newtable`,(req, res) => {

    let ta = req.params.newtable;//name
    ta = clean(ta);


    //ensure name is unique
    let ting = db2.get('tables').find({name : ta}).value();
    console.log(ting);
    if(ting !=null){
        console.log('name is not unique');
        ting=null;
        return;
    }

    let Tid = db2.get('tables').size().value();//id

    const table = { 
        id : Tid, 
        name : ta,
        courses : []
    };


    //save to db
    db2.get('tables')
        .push(table)
        .write();

    res.json(null);


});

//get all tables created by user 
app.get(`/api/table/tables`,(req, res) => {
    console.log('get all tables');
    db2.read();
    const db = db2.get('tables')
        .sortBy('name')
        .values();

    res.send(db);    
});

//show specific table 
app.get(`/api/table/tables/:name`, (req, res) => {
    console.log('get one table');
    let n = req.params.name;
    n = clean(n);


    db2.read();
    const db = db2.get('tables')
        .find({name: n})
        .value();
    console.log(db);
    res.json(db);   

});

//delete all tables made by user 
app.delete(`/api/table/killallTables`, (req, res) => {
    let n = db2.get('tables').size().value();;
    while(n>0){
        db2.get('tables')
        .remove({id: n})
        .write();  
        n--;
    }
    res.json(null);

})

//delete specific table from user 
app.delete(`/api/table/killTable/:name`, (req, res) => {
    let n = req.params.name;
    n = clean(n);

    db2.get('tables')
        .remove({name: n})
        .write();
        console.log(db2.value());
    
        res.json(null);

})

//add class to table 
app.post(`/api/table/:table/:class`, (req, res) => {

    
    //parameters
    let table = req.params.table;
    let cl = req.params.class.toUpperCase();
    table = clean(table);
    cl = clean(cl);


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

        res.json(null);
    });


//export
module.exports = router;

const server = http.createServer(app);

server.listen(port, () => {
    console.log('listening on port ' + port);
});