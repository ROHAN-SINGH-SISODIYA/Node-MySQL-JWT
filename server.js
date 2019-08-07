var express = require("express");
var http = require('http');
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var config = require('./config');
var config = require('./database');  

var verifyToken = require('./middleware/verifyToken');
var addNewUser = require('./middleware/addNewUser');
var userLoginCheck = require('./middleware/userLoginCheck');
var findAllUsers = require('./middleware/findAllUsers');
var welcome = require('./middleware/welcome');

var port = process.env.PORT || 4200;

var app  = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, function() {
    console.log('Express server listening on port ' +port);
});

app.post('/signup', addNewUser);
app.post('/userlogin', userLoginCheck);




var apiRoutes = express.Router();
apiRoutes.use(bodyParser.urlencoded({ extended: true }));
apiRoutes.use(bodyParser.json());
apiRoutes.use(verifyToken);
apiRoutes.get('/', welcome);
apiRoutes.get('/users', findAllUsers);

app.use('/api', apiRoutes);

