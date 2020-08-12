import {Request, Response} from 'express';
import { hash, compare } from 'bcryptjs';

import authConfig from '../config/auth';
import db from '../database/connection';
import { sign } from 'jsonwebtoken';

export default class AccountController{
    async getToken(request: Request, response:Response){
        const {email, password} = request.body;

        console.log(email, password)
        try {
            const user = await db('accounts')
                        .where('email', email)
                        .first();

            if(!user){
                throw new Error('Incorrect email/password combination');
            }

            const passwordMatched = await compare(password, user.password);

            if(!passwordMatched){
                throw new Error('Incorrect email/password combination');
            }

            delete user.password;

            const token = sign({ userId: user.id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            });

            return response.json({user, token})
        } catch (error) {
         console.log("erro");
         return response.json({message: "erro"})   
        }
    }

    async getCredentials(request:Request, response:Response){
        const {email} = request.query;

        const accountResponse = await db('accounts')
                                .select('password')
                                .where('email', '=', [email]);

        return response.json(accountResponse[0]);
    }

    async createAccount(request:Request, response:Response){
        const {
            email,
            password,
            username,
            avatar,
            whatsapp,
            bio
        } = request.body;

        const checkUser = await db('accounts').where('email', email).first();

        if(checkUser){
            return response.status(400).json({ error: 'This email already exists' });
        }

        try {
            const hashPassword = await hash(password, 8);
            const userId = await db('accounts').insert({
                username,
                email,
                password: hashPassword,
                avatar,
                whatsapp,
                bio
            });

            const user = await db('users').where('id', userId[0]).first();

            delete userId[0];
    
            return response.status(201).json(user);
        } catch (error) {
            console.log()

            return response.status(400).json({message: 'Não foi possivel cadastrar'});
        }
    }
}