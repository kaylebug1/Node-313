var express = require('express');
var app = express();

//var calcPrice = require('./calculate.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getRate', findPrice);

function findPrice(request, response) {
	var weight = request.query.ounce;
	var type = request.query.type;
	
	var info = {
		weight: weight,
		type: type
	};

	var cost = calculate(info);
	if(cost!=0){
	response.render("pages/price.ejs", { cost : cost, weight: weight, type:type} );
	}
	else{
	response.render("pages/fail.ejs", { weight: weight, type:type} );		
	}

};

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function calculate(info){
	var cost = 0.00;
	var weight = info["weight"];
	var type = info["type"];
	weight--;
	if(type == "stamped letter"){
		if(weight < 3){
			cost = .49 +(.21* weight);
		}
	}
	if(type == "metered letter"){
		if(weight < 3){
			cost = .46 +(.21* weight);
		}
	}
	if(type == "large envelope"){
		if(weight < 13){
			cost = .98 +(.21* weight);
		}
	}
	if(type == "parcel"){
		var weightTemp = weight-3;
		if(weight < 4){
			cost = 2.67;
		}
		else if(weight < 13){
			cost = 2.67 +(.18 * weightTemp);
		}
	}

	return cost.toFixed(2);

}