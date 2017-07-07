var config = {
	user: 'ta', //env var: PGUSER 
	database: 'messages', //env var: PGDATABASE 
	password: 'password', //env var: PGPASSWORD 
	host: 'localhost', // Server hosting the postgres database 
	port: 5432
};

const { Pool } = require('pg');

const pool = new Pool(config);

function addMessage(request, response) {
	
	var section = request.body.section;
	var content = request.body.content;
	console.log("added a message to the section " + section);
	if(section){
		pool.query('INSERT INTO message("section", "content") VALUES ($1, $2)', [section, content] );
	}
}

function getMessages(request, response){
	var id = request.params.id;
	response.type("json");
	console.log("The id of section is " + id);
	if(id){
		pool.query('SELECT content, message_id FROM message WHERE section = $1', [id], (err, res) =>{
			if (err){
				throw err;
			}
			console.log(res.rows[0]);
			response.write(JSON.stringify(res.rows[0]));
			response.end();
		} )
	}
}


function deleteMessage(request, response){
	var id = request.params.id;

	console.log("The id of the message is " + id);

	if(id){
		pool.query('DELETE FROM message WHERE message_id = $1', [id], (err, res) =>{
			if (err){
				throw err;
			}
		} )
	}

}




module.exports = {
	addMessage: addMessage,
	getMessages: getMessages,
	deleteMessage: deleteMessage
}; 