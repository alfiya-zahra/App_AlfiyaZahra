const express =require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const app= express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname));
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
app.post('/registration',function(req,res){
    mongoClient.connect(url,function(err, db){
        if(err) throw err;

        var dbo=db.db("mydb");
        var obj={
            First_Name:[req.body.FirstName],
            Last_Name:[req.body.LastName],
            Age:[req.body.age],
            Email_Id:[req.body.email],
            Address:[req.body.address],
            Contact:[req.body.contact]
        }
        dbo.collection('studentsInfo').insertOne(obj,function(){
            if(err) throw err;
            console.log("1 record inserted");
            db.close();
        });


    });
    res.send('<h1> 1 record inserted !</h1>');
});
const server=app.listen(3020,function(){
    console.log("Server is running on code 4000 ");
});