const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StudySchema = new Schema({
  studyId: {
	type: String,
	  },
	studyName: {
	type: String,
	required: true
	  },
	    studyDescription: {
	type: String,
	required: true
	  },
	    studyType: {
	type: String,
	required: false
	  },
	    studyStatus: {
	type: String,
	required: true
	  },
	    studyStartDate: {
	type: String,
	required: true
	  },
	    studyEndDate: {
	type: String,
	required: true
	  },
	  // array of all tests in the study and their links
	  tests: [
		{
			
			testName: {
				type: String,
			
				default: "testName"
			},
			testLink: {
				type: String,
				default: "testLink"
			}
		}
	],
	// array of all surveys in the study and their links
	surveys: [
		{
		
			surveyName: {
				type: String,
				default: "surveyName"
			},
			surveyLink: {
				type: String,
				default: "surveyLink"
			}
		}
	],
	  
	date: {
	type: Date,
	default: Date.now
	  }
});

module.exports = Study = mongoose.model("Studies", StudySchema);
