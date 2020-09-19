import jwt from 'jsonwebtoken'
import { jwtSecret, recaptchaSecret } from '../config'
const request = require("request");

export default function verifyAuth(req, res, next){
    const authToken = req.headers['x-auth-token']
    if(authToken) {
        jwt.verify(authToken, jwtSecret, (err, data) => {
            if(err) res.status(403).send({ status: 403, message: "Unauthorized.", error: null })
            res.locals.data = data;
            next()
        })
    }else{
        res.status(403).send({ status: 403, message: "Please send the x-auth-token in the header", error: null })
    }
}


export function verifyReCaptcha(req, res, next){
    console.log('inside verifyReCaptcha')
    const { rcToken } = req.query;
    if(!rcToken){
        res.status(403).send({ status: 403, message: "Please send the recaptcha token", error: null })
    }
    
    const verifyCaptchaOptions = {
        uri: "https://www.google.com/recaptcha/api/siteverify",
        json: true,
        form: {
            secret: recaptchaSecret,
            response: rcToken
        }
    };

    request.post(verifyCaptchaOptions, async (err, response, body) => {
        if (err) {
            throw new Error(err)
        }
        if (!body.success) {
            throw new Error(body["error-codes"].join("."))
        }
        console.log('token verifed')
        next()
    });
}