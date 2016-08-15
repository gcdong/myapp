// Write your package code here!
import { Mongo } from 'meteor/mongo';
Errors = { 
// Local (client-only) collection 
	collection: new Mongo.Collection(null), 
	throw: function(message) { 
		Errors.collection.insert({message: message, seen: false}) 
	} 
};


        // Variables exported by this module can be imported by other packages and
        // applications. See errors-tests.js for an example of importing.
        export const name = 'errors';
