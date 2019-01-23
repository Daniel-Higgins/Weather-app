const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
var mysql = require('mysql');
var nodemailer = require('nodemailer');

const apiKey = 'ba4b85597a85cc85e30185ccfbda9ccd';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        if(weather.wind.speed <10){  
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            res.render('index', {weather: weatherText, error: null});
        } else {
            let weatherText = `It's ${weather.main.temp} degrees  and windy in ${weather.name}! (${weather.wind.speed} MPH Winds.)`;
            res.render('index', {weather: weatherText, error: null});
        }
      }
    }
  })
});

app.get('/signup', function(req,res) {
   res.render('signup', {weather: null, error: null}); 
});

app.post('/signup', function(req,res) {
       
    let fn = req.body.first_name;
    let ln = req.body.last_name;
    let em = req.body.email;
    let pw = req.body.password;
    let cpw = req.body.conpassword;
    let age = req.body.age;
    
    
  var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "db1"
});
  
    if(pw == cpw){
        con.connect(function(err) {
        if (err) throw err;
      
        console.log("Connected!");

        var randomid = Math.floor(Math.random() * 100000)+2; 
    
        var sql = "INSERT INTO accounts (id, first_name, last_name, email, password, age) VALUES ('"+randomid+"','"+fn+"', '"+ln+"', '"+em+"', '"+pw+"', '"+age+"')";

            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
          
          
                  var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'server00928@gmail.com',
                pass: 'tt1tt2tt3'
            }
          });

     var mailOptions = {
    from: 'server00928@gmail.com',
    to: em,//you can add multiple here
    subject: 'Sending Email using Node.js',
    //add HTML format here
    text: 'Thanks for signing up!'
    };

         transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
          });
        res.render('index', {weather: null, error: "Thank you for registering. Enjoy!!"});
         });
  } else {
      res.render('signup',{weather: null, error: "Passwords typed don't match bro!"});
  }
    
});

app.get('/login', function(req,res){
    res.render('login');
});

app.post('/login', function(req,res){
    let em = req.body.email;
    let pw = req.body.password;
});

app.listen(3000, function () {
  console.log('Listening on port 3000!')
});













