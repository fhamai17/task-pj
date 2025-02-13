const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];
    // const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized"});
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({ success: false, message: "Unauthorized"});
        req.user = user;
        next();
    })

};

module.exports = verifyToken;
