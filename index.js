const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("./config");
const authenticate = require("./authenticate");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.post("/login", (req, res) => {
    const payload = {
        email: req.body.email,
        accountType: "builtin-admin",
    };

    const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);

    const body = {
        email: req.body.email,
        token: token,
    };
    res.status(200).json(body);
});

app.get("/test", authenticate, (req, res) => {
    res.status(200).json({
        message: "Hello!",
        authEmail: req.jwtPayload.email,
        accountType: req.jwtPayload.accountType,
    });
});

app.listen(3000, () => console.log("Listening on port 3000..."));
