import User from '../models/User.js'
import database from '../db.js'
import bcrypt from 'bcryptjs'

const userController = {
    register: async function (req, res,) {
        try {
            await database.sync();
            const createResult = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password)
            })
            res.send(createResult)
        } catch (err) {
            res.status(400).send(err);
        }
    },
    login: async function (req, res,) {
        const selectedUser = await User.findOne({where: {email: req.body.email}})
        console.log(selectedUser)
        if(!selectedUser) return res.status(400).send('Email or password incorrect')

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if(!passwordAndUserMatch) return res.status(400).send('Email or password incorrect')

        res.send("User logged")
    }
}

export default userController;
