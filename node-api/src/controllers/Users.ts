import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { users, ClientUser } from '../model/User';

const SECRET_KEY = process.env.SECRET_KEY || 'Mp8n7yQn7M'

export const authenticate = async (req: Request, res: Response) => {
    try {
        const user = users.filter((u: ClientUser) => u.email === req.body.email)[0]
        if(!user) throw new Error("user_not_found")
        if(user.password !== req.body.password) throw new Error("password_incorrect")
        const token = jwt.sign({id: user.id}, SECRET_KEY, { expiresIn: 60 * 60 * 24})
        res.send({token})
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getMe = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : req.query.token as string
        if(!token) throw new Error("not_token")
        jwt.verify(token, SECRET_KEY, (err, user:{id:string}) => {
            if(err) throw new Error("invalid_token")
            const me: ClientUser = users.filter((u: ClientUser) => u.id === user.id)[0];
            res.send(me)
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error)
    }
}