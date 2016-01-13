var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', function(err){
	if(err){
		console.log("connect db failed");
	}else{
		console.log("connect db success");
	}
});
var note = require('./models/notetwoDB.js');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/note', function(req, res){
	note.create(req.body, function(err, doc){
		if(err){
			console.log("create error");
		}else{
			res.json(doc);
		}
	});
});

app.get('/note', function(req, res){
	note.find().sort({'createDate':-1}).exec(function(err, docs){
		if(err){
			console.log("find error");
		}else{
			res.json(docs);
		}
	});
});

app.get('/note/:id', function(req, res){
	var id = req.params.id;
	note.findById(id, function(err, doc){
		if(err){
			console.log("find by id error");
		}else{
			res.json(doc);
		}
	})
})

app.put('/note/:id', function(req, res){
	var id = req.params.id;
	var date = Date.now();
	note.findByIdAndUpdate(id, {content: req.body.content, updateDate: date}, function(err, doc){
		if(err){
			console.log("update error");
		}else{
			res.json(doc);
		}
	})
})

app.delete('/note/:id', function(req, res){
	var id = req.params.id;
	note.remove({_id: id}, function(err){
		if(err){
			console.log("remove error");
		}else{
			res.json();
		}
	})
})

app.listen(8080, function(req, res){
	console.log("listening on port 8080");
});