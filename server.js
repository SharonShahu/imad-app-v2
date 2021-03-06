var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = {
    user: 'sharonshahu',
    database: 'sharonshahu',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'sendRandomSecretValue',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
}));

function createTemplate(data){ //for passing values from javascript declaration to javascript function
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
        var htmlTemplate =`
            <html>
            <head>
                <title>
                    ${title}
                </title>
            
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
               <link href="/ui/style.css" rel=
        "stylesheet"/>    </head>
            <body>
                <div class="container">
                    <div>
                        <a href="/">Home</a>
                    </div>
                    <hr/>
                    <h3>
                        ${heading}
                    </h3>
                    <hr/>
                    <div>
                        ${date.toDateString()}
                    </div>
                    <div>
                     ${content}
                    </div>
                </div>
            </body>
        
        </html>
        `;
        return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool = new Pool(config);
app.get('/test-db',function(req,res){
   //make a select request
   pool.query('SELECT * FROM test',function(err,result){
       if (err){
           res.status(500).send(err.toString());
       } else{
           res.send(JSON.stringify(result.rows));
       }
   });
   //return a respond withthe result
});

function hash(input,salt){
    //how do we create a hash (password based key derivation function)
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
    
    //algorithm: ,d5
    //'password' <-> dhguygywe63873gjhdsbkjfht556gds
    //'password'+'salt' -> dhguygywe63873gjhdsbkjfht556gds
}

app.get('/hash/:input',function(req,res){
   var hashedString = hash(req.params.input,'this is a random string'); 
   res.send(hashedString);
});

var counter = 0;
app.get('/counter',function(req,res){
   counter +=1;
   res.send(counter.toString()); 
});

app.post('/create-user',function(req,res){
   //username password
   //extracting username & pass from body of type JSON
   //{"username": "sharon", "password": :"password"}
   
   var username = req.body.username;
   var password = req.body.password;
   
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt);
   pool.query('INSERT INTO "user"(username,password) VALUES($1,$2)',[username,dbString,],function(err,result){
        if (err){
           res.status(500).send(err.toString());
       } else{
           
           res.send('User successfully created: ', +username);
       }
       
   });
    
});

app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1',[username],function(err,result){
        if (err){
           res.status(500).send(err.toString());
       } else{
           //if no row selected
           if(result.rows.length === 0){
               res.send(403).send('username/password is invalid'); //403:forbidden request
           }
           else{
               //Match the password
               var dbstring = result.rows[0].password;
               var salt = dbString.split('$')[2];
               var hashedPassword = hash(password,salt); //creating a hash based on the passsword submitted and original salt
               if(hashedPassword === dbString){
                   //Set the session
                   req.session.auth = {userId: result.rows[0].id};
                   //sets a cookie with session id
                   //internally on the server side, it maps session id to an object
                   res.send('Correct Credentials');
               }
               else{
                   res.send(403).send('username/password is invalid');
               }
           }
       }
       
   });
   
});   
app.get('/check-login', function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send('U r logged in: ' + req.session.auth.userId.toString());
    }
    else{
       res.send('u r not logged in');
    }
        
});

app.get('/logout', function(req,res){
   delete req.session.auth;
   res.send('Logged out');
});

var names = [];
app.get('/submit-name',function(req,res){ //URL: /subit-name?name=xxxxx
  //Get the name from the request
   var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});


app.get('/articles/:articleName',function(req,res){
   // var articleName = req.params.articleName;
    pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName+"'",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.row.length === 0){
                res.status(404).send("Article not found");
            }
            else{
                var articleData = result.rows[0];
                res.send(createTemplate(articles[articleName]));
            }
        }
    });
   
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
