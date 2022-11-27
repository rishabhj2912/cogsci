const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PatientSchema = new Schema({
	patient_id: {
		type: String,
		// required: true
	},
    username:{
        type: String,
        required:true,
		unqiue:true
    },
	password: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
	type:{
		type:String,
		require:false
	}
});

module.exports = Patient = mongoose.model("Patients", PatientSchema);
