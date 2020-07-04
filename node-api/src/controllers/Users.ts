import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User';

const SECRET_KEY = process.env.SECRET_KEY || 'Mp8n7yQn7M'

const usersdb: User[] = [{
	id: "it-drixit-1",
	avatar: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
	email: "oteroeiras@gmail.com",
	password: "napal123",
	name: "IT",
	surname: "Drixit",
	age: 25,
	role: "admin"
}, {
	id: "info-drixit-2",
	avatar: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
	email: "info@drixit.com",
	password: "other-password",
	name: "Info",
	surname: "Drixit",
	age: 30,
	role: "user"
}];

export const authenticate = async (req: Request, res: Response) => {
    try {
        const user = usersdb.filter((u) => u.email === req.body.email)[0]
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
            const me: User = usersdb.filter((u) => u.id === user.id)[0];
            delete me.password
            res.send(me)
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error)
    }
}