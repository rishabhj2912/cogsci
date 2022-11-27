const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ConnectorSchema = new Schema({
  connectorId: {
	type: String,
	  },
studyId: {
	type: String,
	  },
	  patientId: {
	type: String,
	  },
	  date: {
	type: Date,
	default: Date.now
	  }
	  
});

module.exports = Connector = mongoose.model("Connector", ConnectorSchema);
