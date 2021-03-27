const jwt = require('jsonwebtoken'); // importación


const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('JWT NO generado');
                } else {
                    resolve(token);
                }
            }
        );
    });
}

module.exports = { generarJWT } // exportación