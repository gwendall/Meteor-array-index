///////////////////////////////
// Meteor Array indexes ///////
///////////////////////////////

arrayIndex = {};

Meteor.Collection.prototype._ensureArrayIndex = function(fields, options) {
	
	var self = this;
	for (var field in fields) {
		
		var keys = _.keys(fields[field]);
		self.before.insert(function(userId, doc) {
			
			// if (_.contains(["$set", "$unset", "$inc", "$push", "$pull", "$pop", "$rename", "$pullAll", "$addToSet", "$bit"], op)) {
		    
			var array = doc[field];
			if (arrayHasDuplicateObjects(array, keys)) {
				console.log('Error: Can\'t insert document because the array field "' + field + '" has a unique index on its items.');
				return false;
			}
			
		});
		
		self.after.update(function(userId, doc, fieldNames, modifier, options) {

			var item = self.findOne({ _id: doc._id });
			var array = getObjectPropertyByString(item, field);
			// console.log('Looking for duplicates in the array.', array, keys);
			if (arrayHasDuplicateObjects(array, keys)) {
				console.log('Warning: Duplicate items were found in the array "' + field + '" which has a unique index.');
				// return false;
			}
			
		});
		
		/*
		self.before.update(function(userId, doc, fieldNames, modifier, options) {
			
			modifier.$addToSet = modifier.$addToSet || {};
			modifier.$push = modifier.$push || {};
			modifier.$set = modifier.$set || {};
			
			var array = doc[field],
				item = modifier.$addToSet[field] || modifier.$push[field],
				unique = _.pick(item, keys);
			
			if (unique && _.findWhere(array, unique)) {
				console.log('Error: Can\'t update document because the array "' + field + '" has a unique index.');
				return false;
			};			
			
		});
		*/
				
	}
	console.log('Ensuring array index.', fields, options);
	// TranslateItems.({ lang: 1, field: 1, value: 1 }, { unique: 1 });
	
};