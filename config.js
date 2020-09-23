module.exports = {
    jwt: {
        secret: "secret-key",
        options: {
            algorithm: "HS256",
            expiresIn: "10m",
        },
    },
};
