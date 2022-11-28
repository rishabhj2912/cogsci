var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");


// Load models
const Study = require("../models/Study");
const Patient = require("../models/Patient");
const Admin = require("../models/Admin")
const Connector = require("../models/Connector")

var fetchuser = require("../middleware/Fetchuser");

// Route 1: Get all patients using: GET "/api/getpatients". Login not required
router.get("/getpatients", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 2: Get all studies using: GET "/api/getstudies". Login not required
router.get("/getstudies", async (req, res) => {
    try {
        const studies = await Study.find();
        res.json(studies);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 3: Get all connectors using: GET "/api/getconnectors". Login not required
router.get("/getconnectors", async (req, res) => {
    try {
        const connectors = await Connector.find();
        res.json(connectors);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 4: Register Admin using: POST "/api/auth/createadmin". No login required
router.post("/createadmin", async (req, res) => {
    try {
        let { username, password } = req.body;
        // if any field is empty
        if (!username || !password) {
            return res.status(400).send("Please enter all fields");
        }
        // check for existing user
        let admin = await Admin

.findOne({
            username
        });
        if (admin) {
            return res.status(400).send("Admin already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        admin = await Admin.create({
            username,
            password: secPass
        });
        const data = {
            user: {
                id: admin.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json(authToken);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 5: Register Patient using: POST "/api/createpatient". No login required
router.post("/createpatient", async (req, res) => {
    try {
        let { username, password } = req.body;
        // if any field is empty
        if (!username || !password) {
            return res.status(400).send("Please enter all fields");
        }
        // check for existing user
        let patient = await
Patient.findOne({
            username
        });
        if (patient) {
            return res.status(400).send("Patient already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        patient = await Patient.create({
            username,
            password: secPass
        });
        const data = {
            user: {
                id: patient.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json(authToken);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 6: Authenticate a user using: POST "/api/auth/login". No login required
router.post("/auth/login", async (req, res) => {
    try {
        let { username, password } = req.body;
        // if any field is empty
        if (!username || !password) {
            return res.status(400).send("Please enter all fields");
        }
        // check for existing user
        let user = await Patient

.findOne({
            username
        });
        if (!user) {
            user = await Admin.findOne
({
                username
            });
            if (!user) {
                return res.status(400).send("Invalid Credentials");
            }
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).send("Invalid Credentials");
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const x=user._id
        //need to fix this should get userId from authtoken
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        const dat = {
            authToken,
            x
            
        }
        res.json(dat);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 7: authenticate an admin using: POST "/api/auth/adminlogin". No login required
router.post("/auth/adminlogin", async (req, res) => {
    try {
        let { username, password } = req.body;
        // if any field is empty
        if (!username || !password) {
            return res.status(400).send("Please enter all fields");
        }
        // check for existing user
        let admin = await Admin

.findOne({
            username
        });
        if (!admin) {
            return res.status(400).send("Invalid Credentials");
        }
        const passwordCompare = await bcrypt.compare(password, admin.password);
        if (!passwordCompare) {
            return res.status(400).send("Invalid Credentials");
        }
        const data = {
            user: {
                id: admin.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json(authToken);
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 8: Get logged in patient details using: POST "/api/auth/getuser". Login required
router.post("/auth/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const patient = await Patient.findById
(userId).select("-password");
        res.send(patient);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 9: Admin can add a study using: POST "/api/auth/addstudy".
// Login required
router.post("/auth/addstudy", fetchuser, async (req, res) => {
    try {
        const { studyName, studyDescription, studyStartDate, studyEndDate, studyStatus } = req.body;
        console.log(studyName, studyDescription, studyStartDate, studyEndDate, studyStatus);
        // if any field is empty
        if (!studyName || !studyDescription || !studyStartDate || !studyEndDate || !studyStatus) {
            console.log("Please enter all fields");
            return res.status(400).send("Please enter all fields");
        }
        const study = await Study.create({
            studyName,
            studyDescription,
            studyStartDate,
            studyEndDate,
            studyStatus,
        });
        res.send(study);
        console.log(study);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 10: Admin can delete a study using: POST "/api/auth/deletestudy". Login required
router.post("/auth/deletestudy", fetchuser, async (req, res) => {
    try {
        const  studyId  = req.body.id;
        // if any field is empty
        if (!studyId) {
            return res.status(400).send("Please enter all fields");
        }
        // check for existing study
        let study = await Study.findById
(studyId);
        if (!study) {
            return res.status(400).send("Study does not exist");
        }
        study

.delete();
        res.send("Study deleted");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 11: Admin can add a patient to a study using: POST "/api/auth/addpatientstudy". Login required and save it in connector table
router.post("/auth/addpatientstudy", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const { studyId, patientId } = req.body;
        // if any field is empty
        if (!studyId || !patientId) {
            console.log("Please enter all fields");
            console.log(studyId, patientId);
            return res.status(400).send("Please enter all fields");
        }
        // check for existing study
        let study = await Study.findById
(studyId);
        if (!study) {
            console.log("Study does not exist");
            return res.status(400).send("Study does not exist");
        }
        // check for existing patient
        let patient = await Patient.findById
(patientId);
        if (!patient) {
            console.log("Patient does not exist");
            return res.status(400).send("Patient does not exist");
        }
        // check if patient is already in study
        let patientStudy = await Connector.findOne({
            studyId,
            patientId
        });
        if (patientStudy) {
            console.log("Patient already in study");
            return res.status(400).send("Patient already in study");
        }
        patientStudy = await Connector.create({
            studyId,
            patientId
        });
        res.send("Patient added to study");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 12: Admin can delete a patient from a study using: POST "/api/auth/deletepatientstudy". Login required and delete it from connector table
router.post("/auth/deletepatientstudy", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const admin = await Admin.findById
(userId).select("-password");
        if (!admin) {
            return res.status(401).send("Access Denied");
        }
        const { studyId, patientId } = req.body;
        // if any field is empty
        if (!studyId || !patientId) {
            return res.status(400).send("Please enter all fields");
        }
        // check for existing study
        let study = await Study.findById
(studyId);
        if (!study) {
            return res.status(400).send("Study does not exist");
        }
        // check for existing patient
        let patient = await Patient.findById
(patientId);
        if (!patient) {
            return res.status(400).send("Patient does not exist");
        }
        // check if patient is already in study
        let patientStudy = await Connector.findOne({
            studyId,
            patientId
        });
        if (!patientStudy) {
            return res.status(400).send("Patient not in study");
        }
        patientStudy

.delete();
        res.send("Patient deleted from study");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 13: Admin can add tests to a study using: POST "/api/auth/addteststudy". Login required
router.post("/auth/addteststudy", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        
        const { studyId, testName, testLink } = req.body;
        // if any field is empty
        if (!studyId || !testName || !testLink) {
            console.log("Please enter all fields");

            return res.status(400).send("Please enter all fields");
        }
        // check for existing study
        let study = await Study.findById
(studyId);
        if (!study) {
            console.log("Study does not exist");

            return res.status(400).send("Study does not exist");
        }
        // add test to the array of tests
        study.tests.push({
            testName,
            testLink
        });
        study.save();
        res.send("Test added to study");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 14: Admin can delete a test from a study using: POST "/api/auth/deleteteststudy". Login required
router.post("/auth/deleteteststudy", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        
        const { studyId, testName }
    = req.body;
        // if any field is empty
        if (!studyId || !testName) {
            return res.status(400).send("Please enter all fields");
        }
        // check for existing study
        let study = await Study.findById
(studyId);
        if (!study) {
            return res.status(400).send("Study does not exist");
        }
        // check if test exists
        let test = study.tests.find(t => t.testName === testName);
        if (!test) {
            return res.status(400).send("Test does not exist");
        }
        // delete test from the array of tests also delete its link
        study.tests = study.tests.filter(t => t.testName !== testName);
        study.save();
        res.send("Test deleted from study");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 15: Admin can add survey to a study using: POST "/api/auth/addsurveystudy". Login required
router.post("/auth/addsurveystudy", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const { studyId, surveyName
    , surveyLink } = req.body;
        // if any field is empty
        if (!studyId || !surveyName || !surveyLink) {
            console.log("Please enter all fields");
            return res.status(400).send("Please enter all fields");
        }
        // check for existing study
        let study = await Study.findById
(studyId);
        if (!study) {
            console.log("Study does not exist");
            return res.status(400).send("Study does not exist");
        }
        // add survey to the array of surveys
        study.surveys.push({
            surveyName,
            surveyLink
        });
        study.save();
        res.send("Survey added to study");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 16: Admin can delete a survey from a study using: POST "/api/auth/deletesurveystudy". Login required
router.post("/auth/deletesurveystudy", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const { studyId, surveyName
    } = req.body;
        // if any field is empty
        if (!studyId || !surveyName) {
            return res.status(400).send("Please enter all fields");
        }
        // check for existing study
        let study = await Study.findById
(studyId);
        if (!study) {
            return res.status(400).send("Study does not exist");
        }
        // check if survey exists
        let survey = study.surveys.find(s => s.surveyName === surveyName);
        if (!survey) {
            return res.status(400).send("Survey does not exist");
        }
        // delete survey from the array of surveys also delete its link
        study.surveys = study.surveys.filter(s => s.surveyName !== surveyName);
        study.save();
        res.send("Survey deleted from study");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 17: get all the studies of a patient from Connector using: POST "/api/auth/getpatientstudies". Patient Login required
router.post("/auth/getpatientstudies", async (req, res) => {
    try {
       
  
        const { patientId } = req.body;
        console.log(patientId);
        // if any field is empty
        if (!patientId) {
            console.log("Please enter all fields");

            return res.status(400).send("Please enter all fields");
        }
        // check for existing patient
        let patient = await Patient.findById
(patientId);
        if (!patient) {
            console.log("Patient does not exist");

            return res.status(400).send("Patient does not exist");
        }

        // get all the study ids associated to the patient id from connector
        const studies = await Connector
.find({ patientId : patientId });
        console.log(studies);
        // get all the study details from study collection
        let studyDetails = [];  
        for (let i = 0; i < studies.length; i++) {
            let study = await Study.findById
            (studies[i].studyId);
            studyDetails.push(study);
    }
        console.log(studyDetails);
        res.send(studyDetails);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

}
);

// Route 18: get all the patients of a study from Connector using: POST "/api/auth/getstudypatients". Admin Login required
router.post("/auth/getstudypatients", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const admin = await Admin.findById
(userId).select("-password");
        if (!admin) {
            return res.status(401).send("Access Denied");
        }
        const { studyId } = req.body;
        // if any field is empty
        if (!studyId) {
            return res.status(400).send("Please enter all fields");
        }
        // check for existing study
(studyId);
        if (!study) {
            return res.status(400).send("Study does not exist");
        }
        // get all the patient ids associated to the study id from connector
        const patients = await Connector
.find({ study
    : studyId });

        res.send(patients);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

// Route 19: get details of a study using: POST "/api/getstudydetails". No Login required
router.post("/getstudydetails", async (req, res) => {

    try {
        user_id = req.body.study_id;
     {
            const study = await Study.findById(user_id);
            res.send(study);
                }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 20: get patient from patient username using: POST "/api/getpatientfromusername". No Login required
router.post("/getpatientfromusername", async (req, res) => {

    try {
        user_id = req.body.username;
        {
            const patient = await Patient.findOne({ username:
user_id });
            res.send(patient);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module .exports = router;


