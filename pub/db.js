var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/website';
var ObjectID = require('mongodb').ObjectID;
var db = {
	ObjectID: ObjectID,
	mongo: function() {

	},
	remove: function() {

	},
	insert: function(name, data, success, error) {
		MongoClient.connect(url, function(err, db) {
			var collection = db.collection(name);
			collection.insertMany(data, function(err, docs) {
				if (err) {
					if (error) {
						error(err);
					}
				} else {
					if (success) {
						success(docs);
					}
				}
				db.close();
			});

		});
	},
	find: function(name, condition, success, error) {
		MongoClient.connect(url, function(err, db) {
			var collection = db.collection(name);
			collection.find(condition).toArray(function(err, docs) {
				if (err) {
					if (error) {
						error(err);
					}
				} else {
					if (success) {
						success(docs);
					}
				}
				db.close();
			});

		});
	}
};
module.exports = db;