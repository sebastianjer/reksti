var express = require('express');
var router = express.Router();
var db = require('./db');

//GET page login
router.get('/', function(req,res,next){
  //front end login (ada di folder views)
  res.render('login');
});



//POST username dan password
//register handler
router.post('/register', function(req,res){
  // console.log("req",req.body);
  //var today = new Date();
  var users={
    "username":req.body.username,
    "password":req.body.password,
    "partner_name":req.body.partner_name,
    "operational_hours":req.body.operational_hours,
  }
  //jangan lupa nama tabel di querynya harus diganti (Mitra)
  db.query('INSERT INTO partner SET ?',users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error occurred"
      })
    }else{
      console.log('The solution is: ', results);
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
    }
  });
});

//login handler
router.post('/', function(req,res){
  var username= req.body.username;
  var password = req.body.password;
  uname = username;
  //console.log(uname);

  //jangan lupa nama tabel di querynya sama querynya sendiri harus diganti
  db.query('SELECT * FROM partner WHERE username = ?',[username], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      // console.log('The solution is: ', results);
      if(results.length >0){
        if(results[0].password == password){
          res.render('index', {username: uname});
          /*
          res.send({
            "code":200,
            "success":"login successful"
          });
          */
        }
        else{
          res.redirect('/login');
          /*
          res.send({
            "code":204,
            "success":"Email and password does not match"
          });
          */
          //res.redirect('/login');
        }
      }
      else{
        res.redirect('/login');
        /*
        res.send({
          "code":204,
          "success":"Email does not exits"
        });
        */
        //res.redirect('/login');
      }
    }
  });
});



module.exports = router;
