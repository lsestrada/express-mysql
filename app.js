const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
const moment = require('moment');

const queryBasePerson = require('./models/base-person.js');

const basePerson = queryBasePerson.queryBasePerson;

const router = express.Router();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/base-person', async (req, res)=>{
    res.send(await basePerson.getAll(req.query));
});
router.post('/base-person', async (req, res)=>{
    await basePerson.insert(req.body);
    res.send({status: 1});
});
router.get('/base-person/:id', async (req, res)=>{
  
   // console.log(req.body, req.query);
     res.send({status: 1, 
               list: await basePerson.get(req.query.id) });
});
router.put('/base-person/:id', async (req, res) => {
    // console.log(req.body, req.query);
   await basePerson.update(req.body);
    res.send({status: 1});    
});

router.delete('/base-person/:id', async (req, res) => {
    // console.log(req.body, req.query);
    await basePerson.delete(req.body.id);
    res.send({status: 1});    
});

app.use('/', router);

var result = {
    status: 0,
    message: "",
    list: [],
};

app.listen(3000, () => {
    console.log('listening on port 3000');
})

