const jwt = require("jsonwebtonken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if(authHeader){
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if(err) res.status(403).json("token is not valid!")
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            return res.status(403).json("You are not alowed to do that!")
        }
    })
}

module.exports = {
    verifyToken, verifyTokenAndAuthorization
}