const jwt = require('jsonwebtoken');
const JWTSECRET = 'Thisismysecretkeyucanotbreakit'


const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token){
        res.status(401).json({ errors: "Please authenticate with valid token" });
    }
    
    try {
        const data = jwt.verify(token,JWTSECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).send({error : 'Unauthorized!'});
    }
}

module.exports = fetchUser;