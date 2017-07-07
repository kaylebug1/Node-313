var config = {
	user: 'ta', //env var: PGUSER 
	database: 'messages', //env var: PGDATABASE 
	password: 'password', //env var: PGPASSWORD 
	host: 'localhost', // Server hosting the postgres database 
	port: 5432
};

const { Pool } = require('pg');

const pool = new Pool(config);


var express = require('express');
var app = express();

var conversation = require('./handle/conversation.js');
var section = require('./handle/section.js');
var message = require('./handle/message.js');

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies from Brother Burton's code
  extended: true
}));

app.set('port', (process.env.PORT || 4000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function(){
	console.log("slashhhhh");
});


//conversation handleing
app.post('/addConversation', conversation.addConversation);
app.get('/conversation/:id', conversation.getConversation);
app.get('/conversationTitles/:user', conversation.conversationTitles);
app.delete('/deleteConversation/:id', conversation.deleteConversation);

//section handleing
app.post('/addSection', section.addSection);
app.get('/section/:id', section.getSection);
app.get('/sectionTitles/:conversation', section.sectionTitles);
app.delete('/deleteSection/:id', section.deleteSection);


//message handleing
app.post('/addMessage', message.addMessage);
app.get('/messages/:id', message.getMessages);
app.delete('/deleteMessage/:id', message.deleteMessage);




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

