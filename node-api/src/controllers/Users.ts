import {Request, Response} from 'express';
import User from '../model/User';

const usersdb: User[] = [];

export const index = async (req: Request, res: Response) => {
    res.json(usersdb)
}