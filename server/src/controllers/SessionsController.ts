import { Request, Response, request } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import db from '../database/connection';
import { authConfig } from '../models/auth';

export default class SessionController{
    async create(request: Request, response: Response){
        const { password, email } = request.body;

        try {
            const user = await db('users').where('email', email).first();

            if(!user){
                throw new Error('Icorrect email/password combination');
            }

            const passwordMatched = await compare(password, user.password);

            if(!passwordMatched){
                throw new Error('Icorrect email/password combination');
            }

            delete user.password;

            const token = sign({ userId: user.id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            });

            return response.json({user, token});
        } catch (error) {
            return response.status(400).json({ message: 'Error on sessions' });
        }
    }
}