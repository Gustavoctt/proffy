import bcypt from 'bcryptjs';
import {Request, Response} from 'express';

import {authConfig, generateToken} from '../models/auth';
import db from '../database/connection';

class AuthController{
    async register(request:Request, response:Response){
        try {
            const { name, email, password, whatsapp } = request.body;
            const hash = await bcypt.hash(password, authConfig.saltLength);
            const idUsers = await db('users')
                    .insert({name, email, password: hash, whatsapp})
                    .returning('id');

                    return response.status(201).json({ token: generateToken(idUsers.shift()) });
        } catch (error) {
            console.log(error);
            return response.status(400).json({ status: 'error' });
        }
    }
}

export default AuthController;