import jwt from 'jsonwebtoken';

export const authenticationToken = (req, res, next) => {
    const authHeader = req.header.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        const secretKey = process.env.SECRET_KEY;

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            return next();
        });
    } else {
        res.sendStatus(401);
    }
};