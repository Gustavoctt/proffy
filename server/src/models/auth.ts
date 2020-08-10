import jwt from 'jsonwebtoken';

export interface Token{
    idUser: Number;
}

export const authConfig = {
    secret: process.env.SWT_SECRET || 'proffy',
    expiresIn: process.env.SWT_SECRET || 86400,
    saltLength: process.env.SWT_SECRET || 10,
};

export function generateToken(idUser: Number){
    return jwt.sign({ idUser }, authConfig.secret, { expiresIn: authConfig.expiresIn });
};

export function verifyToken(token: string): Token{
    return jwt.verify(token, authConfig.secret) as Token;
}