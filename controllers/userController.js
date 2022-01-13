import User from '../models/User.js'
import database from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { registerValidate, loginValidate } from './validate.js'

const userController = {
    register: async function (req, res,) {
        const {error} = registerValidate(req.body)
        if(error) return res.status(400).send(error.message)
        try {
            
            await database.sync();
            const createResult = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                admin: req.body.admin
            })
            res.send(createResult)
        } catch (err) {
            res.status(400).send(err);
        }
    },
    login: async function (req, res,) {
        const {error} = loginValidate(req.body)
        if(error) return res.status(400).send(error.message)

        const selectedUser = await User.findOne({where: {email: req.body.email}})
        console.log(selectedUser)
        if(!selectedUser) return res.status(400).send('Email or password incorrect')

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if(!passwordAndUserMatch) return res.status(400).send('Email or password incorrect')

        const token = jwt.sign({id: selectedUser.id, admin: selectedUser.admin}, process.env.TOKEN_SECRET)

        res.header('authorization-token', token)
        res.send("User logged")
    }
}

export default userController;
