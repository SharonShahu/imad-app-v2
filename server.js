var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles = {
    'article-one' : {
        title: 'Article /one | Sharon',
        heading: 'Article One',
        date: 'March 3, 2017',
        content:`
                <p>
                    My First article i.e article-one.
                </p>
                <p>
                    My First article i.e article-one.
                </p>
                <p>
                    My First article i.e article-one.
                </p>`
    },
    'article-two' : {
        title: 'Article Two | Sharon',
        heading: 'Article Two',
        date: 'March 3, 2017',
        content:`
                <p>
                    My Second article i.e article-two.
                </p>`
    },
    'article-three' : {
        title: 'Article Three | Sharon',
        heading: 'Article Three',
        date: 'March 3, 2017',
        content:`
                <p>
                    My Third article i.e article-three.
                </p>`
        }
};

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
                        ${date}
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

var counter = 0;
app.get('/counter',function(req,res){
   counter +=1;
   res.send(counter.toString()); 
});

var names = [];
app.get('/submit-name',function(req,res){ //URL: /subit-name?name=xxxxx
  //Get the name from the request
   var name = req.params.name;
   names.push(name);
   res.send(JSON.stringify(names));
});


app.get('/:articleName',function(req,res){
    var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});
/*
app.get('/article-two',function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three',function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
*/

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
