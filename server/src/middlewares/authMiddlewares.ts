import express from 'express';

import { verifyToken } from '../models/auth';
import db from '../database/connection';

async function AuthMidleware(request: express.Request, response: express.Response, next: CallableFunction){
    const authHeaders = request.headers.authorization;

    if(!authHeaders){
        return response.status(401).send({ error: 'No token provided.' });
    }

    const [scheme, token] = authHeaders.split(' ');

    try {
        const tokenData = verifyToken(token);
        const idUser = tokenData.idUser;
        const user = await db('users')
                .where('id', idUser)
                .first();

        if(user){
            request.body.user = user;
        }else{
            throw 'User not found';
        }
    } catch (error) {
        return response.status(401).send({ error: 'Token invalid.' });
    }
}

export default AuthMidleware;