var jwt = require("jsonwebtoken")

const fetchuser = (req, res, next) => {
    const token = req.body.authToken;

    if (!token) {
        res.status(401).send({ error: "No token provided!", body: req.body })
        console.log("No token provided!")
    }

    try {
        
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token!" })
        console.log(token)
        console.log("Please authenticate using a valid token!")

    }
}

module.exports = fetchuser;