import {Request, Response} from 'express';
import * as Yup from 'yup';
import { hash, compare } from 'bcryptjs';
import db from '../database/connection';

export default class UserController{
    async index(request: Request, response: Response){
        const totalUsers = await db('users').count("* as total");

        const {total} = totalUsers[0];

        return response.json({ total });
    }

    async create(request:Request, response: Response){
        const {
            name, 
            avatar,
            bio,
            whatsapp,
            email,
            password,
            is_teacher
        } = request.body;

        console.log(name, avatar, bio, email, password, is_teacher)

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            whatsapp: Yup.string().required().max(11),
            avatar: Yup.string().required(),
            bio: Yup.string().required(),
            password: Yup.string().required(),
            password_confirmation: Yup.string().when(
                'password',
                (password_confirmation: string, field: any) => 
                    password_confirmation 
                        ? field.required().oneOf([Yup.ref('password')])
                        : field,
            ),
            is_teacher: Yup.boolean().required(),
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({ error: 'Validation fails' });
        }

        const checkUsers = await db('users')
                            .where('email', email)
                            .first();

        if(checkUsers){
            return response.status(400).json({ error: 'This email already exists' });
        }


        try {
            const hashPassword = await hash(password, 8);
            const idUsers = await db('users')
                    .insert({
                        name, 
                        avatar, 
                        bio,
                        whatsapp, 
                        email, 
                        password: hashPassword, 
                        is_teacher
                    })

                return response.status(201).json(idUsers);
        } catch (error) {
            console.log(error);
            return response.status(400).json({ status: 'error' });
        }
    }
}
